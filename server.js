var express = require('express');
var app = express();
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var sortJson = require('sort-json');
var bodyParser = require('body-parser');
require("babel-register");
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(__dirname  + '/views'));
app.use(express.static(__dirname  + '/dist'));
app.use(express.static(__dirname  + '/app'));
app.use(fileUpload());

/************ Shared Varaibles of the Server **************/
//read configure.json
var configJson = JSON.parse(fs.readFileSync('./configure.json', 'utf8'));
var reportPath = configJson.reportPath;
var testSuitePath = configJson.testSuitePath;
var codeCoveragePath = configJson.codeCoveragePath;
var mochaPath = configJson.mochaPath;
var localIP = "http://" + require('ip').address();
var fileUrl = localIP + ':8000';
var jenkinsUrl = localIP + ':8080';
var testRecord; //contains the instance of test json file
var browserTier = configJson.browserTier; //set by /api/config_save, feed to /api/shell
var browserList = configJson.browserList; //set by /api/config_save, feed to /api/shell
var tierList = configJson.tierList; //set by /api/config_save, feed to /api/shell
/**********************************************************/
console.log("Test Suite Path is -> " + testSuitePath);
console.log("Report Path is -> " + reportPath);
console.log("Local IP address is -> " + localIP);

// Create a node-static server instance to serve the './public' folder
var static = require('node-static');
var folder = new static.Server(reportPath + '/HTML');
app.use(express.static(reportPath  + '/HTML'));
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        folder.serve(request, response);
    }).resume();
}).listen(8000);

/**************************** Routes *****************************/
app.get('/', function(req, res){res.sendFile(__dirname + "/dist/index.html");})

app.get('/jenkins', function(req, res){res.redirect(jenkinsUrl);});

app.get('/report_:fileName', function(req, res){
    var fileName = req.params.fileName;
    testRecord = JSON.parse(fs.readFileSync(reportPath +
        '/HTML/' + fileName, 'utf8'));
    testRecord = sortJson(testRecord);
    res.sendFile(__dirname + "/dist/report.html");
});

app.get('/config_and_run', function(req, res){
    res.sendFile(__dirname + "/dist/config.html");
});
/*****************************************************************/

/***************************** API *******************************/
app.get('/reportHub', function (req, res) {
    var fileSearching = require('./modules/fileSearching');
    fileSearching.fileSearching(reportPath + '/HTML', '.json').then(function(dirData){
        res.json(dirData);
    });
})

app.use('/testRecord', require('cors')());
app.get('/testRecord', function(req, res){
    res.json(testRecord);
})

app.get('/api/mail', function(req, res){
    var mail = require('./modules/mail');
    mail.sendEmail('Subject', 'TextMessage');
    res.redirect('/');
});

app.post('/api/uploadSuiteXML', function(req, res){
    if(!req.files){
        res.send('No files were uploaded');
        return;
    }

    var sampleFile = req.files.sampleFile;

    if(sampleFile.extension != 'xml'){
        console.log(sampleFile.extension);
        //res.send('err');
    }
    console.log(sampleFile.extension);

    sampleFile.mv(reportPath + '/' + req.query.suite + '.xml', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
})

app.post('/api/config_save', bodyParser.json(), function(req, res){
    //write params to Local Java Test Project
    var propert_parser = require('properties-parser');
    var editor = propert_parser.createEditor(reportPath + '/src/utils/config.properties');
    editor.set("env", req.body.env);
    editor.set("build_version", req.body.build_version);
    editor.save(function(err){
        if(err) console.log(err);
        console.log("Successfully Write to properties file");
    });

    //Update the Server params
    browserTier = req.body.browserTier;
    browserList = req.body.browserList;
    tierList = req.body.tierList;
    //ToDo Write params into Config.Json

    res.send("Success");
});

app.get('/api/shell', function (req, res){
    var fileSearching = require('./modules/fileSearching.js');
    var mail = require('./modules/mail.js');
    var Email = require('./app/Email.jsx');
    //var command = "./selenium_tests " + browserTier + ' ' + (browserTier=='browser'? browserList: tierList);
    //console.log('command is ' + command);
    res.send('Success');
    require('shelljs/global');
    const fs = require('fs-extra');
    cd(testSuitePath);
    echo(pwd());
    //exec(command);
    fileSearching.fileSearching(testSuitePath + '/HTML', '.json').then(function(dirData){
        var fileName = dirData.lastFile;
        var resultFolder = fileName.split('.')[0].replace(':', '-').replace(':', '-');
        fs.copySync(testSuitePath + '/HTML', reportPath + '/HTML', {overwrite: true});
        console.log("File been retrieved -> " + fileName);
        console.log("CC Path: " + codeCoveragePath);
        console.log("CC Report: " + reportPath + '/HTML/' + resultFolder + "/CodeCoverage");
        console.log("UT Path: " + mochaPath);
        console.log("UT Report: " + reportPath + '/HTML/' + resultFolder + "/UnitTests");
        fs.copySync(codeCoveragePath, reportPath + '/HTML/' + resultFolder + "/CodeCoverage", {overwrite: true});
        fs.copySync(mochaPath, reportPath + '/HTML/' + resultFolder + "/UnitTests", {overwrite: true});
        var json_file = JSON.parse(fs.readFileSync(reportPath +
            '/HTML/' + fileName, 'utf8'));
        testRecord = sortJson(json_file);
        var element = React.createElement(Email, {
            count:testRecord.result_count,
            timeStamp:testRecord.timeStamp,
            HOST_URL: localIP + ":3030",
            env:testRecord.env,
            build_version: testRecord.build_version
        });
        var html = ReactDOMServer.renderToString(element);
        mail.sendEmail('Execution ' + testRecord.timeStamp, html);
        res.send('Success');
    }, function(err){
        console.log("Error happend -> " + err);
    });

})

function run(){

}
/*****************************************************************/
var server = app.listen(3030, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

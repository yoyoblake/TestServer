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
var reportPath = configJson.report_path;
var testSuite_path = configJson.testSuite_path;
var local_IP = "http://" + require('ip').address();
var file_url = local_IP + ':8000';
var jenkins_url = local_IP + ':8080';
var test_record; //contains the instance of test json file
var browser_tier = configJson.browser_tier; //set by /api/config_save, feed to /api/shell
var browser_list = configJson.browser_list; //set by /api/config_save, feed to /api/shell
var tier_list = configJson.tier_list; //set by /api/config_save, feed to /api/shell
/**********************************************************/
console.log("Test Suite Path is -> " + testSuite_path);
console.log("Report Path is -> " + reportPath);
console.log("Local IP address is -> " + local_IP);

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

app.get('/jenkins', function(req, res){res.redirect(jenkins_url);});

app.get('/report_:fileName', function(req, res){
    var fileName = req.params.fileName;
    test_record = JSON.parse(fs.readFileSync(reportPath +
        '/HTML/' + fileName, 'utf8'));
    test_record = sortJson(test_record);
    res.sendFile(__dirname + "/dist/report.html");
});

app.get('/config_and_run', function(req, res){
    res.sendFile(__dirname + "/dist/config.html");
});
/*****************************************************************/

/***************************** API *******************************/
app.get('/reportHub', function (req, res) {
    var fileSearching = require('./modules/fileSearching');
    fileSearching.fileSearching(reportPath + '/HTML', '.json').then(function(dir_data){
        res.json(dir_data);
    });
})

app.use('/test_record', require('cors')());
app.get('/test_record', function(req, res){
    res.json(test_record);
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
    browser_tier = req.body.browser_tier;
    browser_list = req.body.browser_list;
    tier_list = req.body.tier_list;
    //ToDo Write params into Config.Json

    res.send("Success");
});

app.get('/api/shell', function (req, res){
    var fileSearching = require('./modules/fileSearching.js');
    var mail = require('./modules/mail.js');
    var Email = require('./app/Email.jsx');
    //var command = "./selenium_tests " + browser_tier + ' ' + (browser_tier=='browser'? browser_list: tier_list);
    //console.log('command is ' + command);
    res.send('Success');
    require('shelljs/global');
    const fs = require('fs-extra');
    cd(testSuite_path);
    echo(pwd());
    //exec(command);
    fileSearching.fileSearching(testSuite_path + '/HTML', '.json').then(function(dir_data){
        var fileName = dir_data.lastFile;
        console.log("File been retrieved -> " + fileName);
        fs.copySync(testSuite_path + '/HTML', reportPath + '/HTML', {overwrite: true});
        var json_file = JSON.parse(fs.readFileSync(reportPath +
            '/HTML/' + fileName, 'utf8'));
        test_record = sortJson(json_file);
        var element = React.createElement(Email, {
            count:test_record.result_count,
            timeStamp:test_record.timeStamp,
            HOST_URL: local_IP + ":3030",
            env:test_record.env,
            build_version: test_record.build_version
        });
        var html = ReactDOMServer.renderToString(element);
        mail.sendEmail('Execution ' + test_record.timeStamp, html);
        res.sebd('Success');
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

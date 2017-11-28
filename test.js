var express = require('express');
var ReactDOMServer = require('react-dom/server');
var ReactDom = require('react-dom');
var React = require('react');
var app = express();
var sortJson = require('sort-json');
var fs = require('fs');
var static = require('node-static');
require("babel-register");
var Summary = require('./views/report/Summary.jsx');

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(__dirname  + '/views'));
app.use(express.static(__dirname  + '/dist'));

var configure = JSON.parse(fs.readFileSync('./configure.json', 'utf8'));
var testSuite_path = configure.testSuite_path;
console.log("testSuite_path -> " + testSuite_path);
var file = new static.Server(testSuite_path + '/HTML');
app.use(express.static(testSuite_path  + '/HTML'));

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8000);

var test_record = JSON.parse(fs.readFileSync(testSuite_path + '/test_record.json', 'utf8'));
test_record = sortJson(test_record);
/*
for(var suite in status){
    console.log("Suite -> " + suite);
    for(var pack in status[suite]){
        console.log("   Package -> " + pack);
        for(var className in status[suite][pack]){
            console.log("       ClassName -> " + className);
            for(var method in status[suite][pack][className]){
                console.log("           Methods ->" + method );
                console.log("           Result ->" +
                    status[suite][pack][className][method]);
            }
        }

    }
}*/

var element = React.createElement(Summary, {status:test_record.test});
var html = ReactDOMServer.renderToString(element);

var mail = require('./modules/mail.js', { exec: false});
//mail.sendEmail('Subject', html);


app.get('/summary', function(req, res){
    res.render('ExecutionReport',  {test_record:test_record});
    //res.send("Text");
})

app.get('/aa', function(req, res){
    res.sendFile(__dirname + "/dist/report.html");
})

app.use('/test_record', require('cors')());
app.get('/test_record', function(req, res){
    res.json(test_record);
    console.log("request received");
})

var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

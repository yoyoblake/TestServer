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
var testSuitePath = configure.testSuitePath;
console.log("testSuitePath -> " + testSuitePath);
var file = new static.Server(testSuitePath + '/HTML');
app.use(express.static(testSuitePath  + '/HTML'));

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8000);

var testRecord = JSON.parse(fs.readFileSync(testSuitePath + '/testRecord.json', 'utf8'));
testRecord = sortJson(testRecord);
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

var element = React.createElement(Summary, {status:testRecord.test});
var html = ReactDOMServer.renderToString(element);

var mail = require('./modules/mail.js', { exec: false});
//mail.sendEmail('Subject', html);


app.get('/summary', function(req, res){
    res.render('ExecutionReport',  {testRecord:testRecord});
    //res.send("Text");
})

app.get('/aa', function(req, res){
    res.sendFile(__dirname + "/dist/report.html");
})

app.use('/testRecord', require('cors')());
app.get('/testRecord', function(req, res){
    res.json(testRecord);
    console.log("request received");
})

var server = app.listen(3030, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})

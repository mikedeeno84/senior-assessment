var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res, next){
	res.status(200).sendFile(path.join(__dirname,'./index.html'))
})
app.use("/users", require('./users-router.js'));
app.use("/messages", require('./messages-router.js'));

app.use(express.static(path.join(__dirname, '../node_modules')))
app.use(express.static(path.join(__dirname, '../browser')))
app.use(function (err, req, res, next) {
    console.error(err, err.stack);
});

module.exports = app;
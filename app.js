/* jshint node:true*/
"use strict";

global.rootPath = __dirname;

var express = require('express');
var path = require('path');
var util = require('util');
var url = require('url');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser({limit : '1mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));
app.set('view engine','ejs');

var vedio = require(path.join(global.rootPath, 'routes/vedio'));
app.use('/vedio', vedio);

app.get('/',function(req,res){
    res.render('pages/index');
});

module.exports = app;

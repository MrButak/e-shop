require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const bodyParser = require('body-parser');

var app = express();

const serveStatic = require("serve-static")
const path = require('path');
app.use(serveStatic(path.join(__dirname, 'public')));
// this ensures I receive the raw header from stripe webhooks
app.use('/webhook', bodyParser.raw({type: "*/*"}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


module.exports = app;

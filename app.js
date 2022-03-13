require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const bodyParser = require('body-parser');

var app = express();


// this ensures I receive the raw header from stripe webhooks
app.use('/webhook', bodyParser.raw({type: "*/*"}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public/dist')));
app.use('/', indexRouter);
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, 'public/dist/index.html'))
})


app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'dist', 'js')));
// this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
//     res.sendFile(path.join(__dirname, '/dist/index.html'))
// })
module.exports = app;

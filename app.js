require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const menuRouter = require('./routes/menu');
const bodyParser = require('body-parser');

const app = express();

// this ensures I receive the raw header from stripe webhooks
app.use('/webhook', bodyParser.raw({type: "*/*"}));

// TODO: Set logger config from env var
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'public', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'dist', 'js')));
app.use('/menu', menuRouter);

module.exports = app;

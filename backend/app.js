var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const stripe = require('stripe')('sk_test_51KSQNbAaTEmIXM6wt6O7rs6rMT1LttdkEP6NQBUtdHSIrilfukpYC6ZDT1vJRzbP6vHoOwbliaEwMnSA7JwJKpsV00sDkfdvxx'); // Add your Secret Key Here

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

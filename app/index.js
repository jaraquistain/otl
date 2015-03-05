var express = require('express');
var logger = require('morgan');
var favicon = require('serve-favicon');
var errorHandler = require('app/errorHandler');
var dispatch = require('app/router/dispatch.js');
var router = require('app/router');


var app = express();

app.use(logger('dev'));
app.use(favicon('www/favicon.ico'));
app.use(express.static('www'));


app.use(dispatch(router));

// Set 404
app.use(errorHandler.notFound);
app.use(errorHandler.handleRuntimeError(app.get('env')));


module.exports = app;
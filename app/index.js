var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var errorHandler = require('app/errorHandler');

var app = express();

console.log('env:', app.get('env'));
app.use(logger('dev'));

app.use(favicon(__dirname + '/www/favicon.ico'));

app.use(express.static(path.join(__dirname, 'www')));


// Set 404
app.use(errorHandlor.notFound);
// Catch errors
app.use(errorHandler.handleRuntimeError(app.get('env')));

module.exports = app;

//TODO: might need these eventually
//var cookieParser = require('cookie-parser');
//app.use(cookieParser());
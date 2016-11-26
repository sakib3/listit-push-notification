var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var logger = require('morgan');
var io = require('socket.io');

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

var listen = app.listen(port);
var socket = io.listen(listen);

require('./routes/routes')(app,socket);

console.log('The App runs on port ' + port);

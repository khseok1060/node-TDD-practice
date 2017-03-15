var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user');

var app = express();
 
if(process.env.NODE_DEV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.use('/users', user);

module.exports = app;
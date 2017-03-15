var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user');

var app = express();
 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

app.use('/users', user);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
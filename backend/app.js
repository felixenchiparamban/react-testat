const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const config = require('./config');

const account = require('./routes/account');
const users = require('./routes/users');

const app = express();
const cors = require('cors');
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static (path.join(__dirname, 'public')));

require("./util/dataSeed");

app.use('/auth', users);
app.use(jwt( config.validateOptions)); //after this middleware a token is required!
app.use('/accounts', account);


app.use(function(req, res, next) {
  res.status(404);
  res.send();
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.statusCode || 500);
  res.send({data: err.data, message: err.message});
});

module.exports = app;


var express = require('express');
var session = require('cookie-session');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config = require('config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  var log = 'dev';

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // Static files middleware
  if (config.serveCompiled !== 'true') {
    app.use(express.static(config.root + '/www'));
  } else {
    app.use(express.static(config.root + '/dist'));
  }

  app.use('/bower_components', express.static(config.root + '/bower_components'));

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(session({
    keys: [config.sessionKey]
  }));
};

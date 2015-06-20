
var express = require('express');
var session = require('cookie-session');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config = require('config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';
var serveCompiled = process.env.SERVE_COMPILED || 'false';

module.exports = function (app) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Use winston on production
  var log = 'dev';

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // Static files middleware
  if (serveCompiled !== 'true') {
    app.use(express.static(config.root + '/www'));
  } else {
    app.use(express.static(config.root + '/dist'));
  }

  var bower_components_router = express.Router();
  bower_components_router.use(express.static(config.root + '/bower_components'));
  app.use('/bower_components', bower_components_router);

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

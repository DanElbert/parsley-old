
var config = require('config');
var db = require('mongoskin').db(config.dbUrl);

db.bind('recipes');

module.exports = function(app) {
  app.use(function(req, res, next) {
    req.db = db;
    next();
  });
};

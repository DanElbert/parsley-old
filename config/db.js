var fs = require('fs');
var config = require('config');
var mongoose = require('mongoose');

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.dbUrl, options);
};

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

module.exports = function(app) {
  connect();

  // Bootstrap models
  fs.readdirSync(__dirname + '/../app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require('app/models/' + file);
  });
}

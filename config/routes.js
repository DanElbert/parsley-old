
var express = require('express');
var config = require('config');

var recipesController = require("app/controllers/recipesController");
var errorsController = require("app/controllers/errorsController");

/**
 * Expose routes
 */

module.exports = function (app) {

  var apiRoutes = express.Router();

  apiRoutes.get('/recipes', recipesController.index);
  apiRoutes.post('/recipes', recipesController.create);

  apiRoutes.route('/recipes/:id')
    .all(recipesController.load)
    .get(recipesController.show)
    .put(recipesController.update)
    .delete(recipesController.destroy);

  apiRoutes.all('*', function(req, res) {
    res.sendStatus(404);
  })

  app.use('/api', apiRoutes);

  // Anything not under /api should just return the index page; the index
  // will do the rest of the routing.
  app.get('*', function(req, res) {
    if (config.serveCompiled !== 'true') {
      res.sendFile(config.root + '/www/index.html');
    } else {
      res.sendFile(config.root + '/dist/index.html');
    }
  });

  // Error Handling
  app.use(errorsController.validationError);
  app.use(errorsController.unknownError);
}

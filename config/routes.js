
var express = require('express');

var recipesController = require("recipesController");

/**
 * Expose routes
 */

module.exports = function (app) {

  var apiRoutes = express.Router();

  apiRoutes.get('/recipes', recipesController.index);
  apiRoutes.put('/recipes', recipesController.create);

  apiRoutes.route('/recipes/:id')
    .all(recipesController.load)
    .get(recipesController.show)
    .post(recipesController.update)
    .delete(recipesController.destroy);


  app.use('/api', apiRoutes);
}

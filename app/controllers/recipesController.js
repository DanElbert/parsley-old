var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe');

module.exports = {

  load: function(req, res, next) {
    Recipe.findById(req.params.id, function(err, recipe) {
      if (err) throw err;
      req.recipe = recipe;
      next();
    });
  },

  index: function(req, res) {
    Recipe.find({}, function(err, recipes) {
      if (err) throw err;
      res.json(recipes);
    });
  },

  create: function(req, res) {
    recipe = new Recipe(req.body);
    recipe.save(function(err) {
      if (err) throw err;
      res.json(recipe);
    });
  },

  show: function(req, res) {
    res.json(req.recipe);
  },

  update: function(req, res) {

  },

  destroy: function(req, res) {

  }

}

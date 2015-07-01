var mongoose = require('mongoose');

var Recipe = mongoose.model('Recipe');

module.exports = {

  load: function(req, res, next) {
    Recipe.findById(req.params.id, function(err, recipe) {
      if (err) return next(err);
      req.recipe = recipe;
      next();
    });
  },

  index: function(req, res, next) {
    Recipe.find({}, function(err, recipes) {
      if (err) return next(err);
      res.json(recipes);
    });
  },

  create: function(req, res, next) {
    recipe = new Recipe(req.body);
    recipe.save(function(err) {
      console.log(recipe);
      if (err) return next(err);
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

};

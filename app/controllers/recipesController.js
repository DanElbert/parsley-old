var mongo = require('mongoskin');

var gc = {
  id: 5,
  name: "Grilled Cheese",
  steps: [
    "Butter bread",
    "Heat pan",
    "Apply cheese",
    "Grill until perfect"
  ],
  ingredients: [
    {name: "Bread", quantity: 2, unit: "slices"},
    {name: "American Cheese", quantity: 2, unit: "slices"}
  ]
};

var c = {
  id: 25,
  name: "Cereal and Milk",
  steps: [
    "Pour cereal in bowl",
    "Pour milk over cereal",
    "Consume immediately"
  ],
  ingredients: [
    {name: "Cereal (Any standard boxed type)", quantity: 2, unit: "cups"},
    {name: "Whole Milk", quantity: 1, unit: "cups"}
  ]
};

module.exports = {

  load: function(req, res, next) {
    req.db.recipes.findOne({_id: mongo.ObjectID.createFromHexString(req.params.id)}, function(err, results) {
      if (err) throw err;
      req.recipe = results;
      next();
    });
  },

  index: function(req, res) {
    req.db.recipes.find().toArray(function(err, results) {
      if (err) throw err;
      res.json(results);
    });
  },

  create: function(req, res) {
    req.db.recipes.insert(req.body, function(err, results) {
      console.log("create callback time!!");
      console.log(err);
      console.log(results);
      if (err) throw err;
      res.json(results);
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

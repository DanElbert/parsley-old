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
    if (req.params.id == "5") { req.recipe = gc; }
    else { req.recipe = c; }
    next();
  },

  index: function(req, res) {
    res.json([gc, c]);
  },

  create: function(req, res) {

  },

  show: function(req, res) {
    res.json(req.recipe);
  },

  update: function(req, res) {

  },

  destroy: function(req, res) {

  }

}

module.exports = {

  load: function(req, res, next) {
    // req.recipe = Load
    next();
  },

  index: function(req, res) {

  },

  create: function(req, res) {

  },

  show: function(req, res) {
    res.json({
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
    })
  },

  update: function(req, res) {

  },

  destroy: function(req, res) {

  }

}

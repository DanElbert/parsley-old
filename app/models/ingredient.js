var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

var IngredientModel = mongoose.model('Ingredient', IngredientSchema);

module.exports.schema = IngredientSchema;
module.exports.model = IngredientModel;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  name: String,
  quantity: Number,
  unit: String
});

var IngredientModel = mongoose.model('Ingredient', IngredientSchema);

module.exports.schema = IngredientSchema;
module.exports.model = IngredientModel;

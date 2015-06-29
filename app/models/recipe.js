var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var IngredientSchema = require('app/models/ingredient').schema;

var StepSchema = new Schema({
  text: String
});

var RecipeSchema = new Schema({
  name: String,
  steps: [StepSchema],
  ingredients: [IngredientSchema]
});

RecipeSchema.plugin(timestamps);

var RecipeModel = mongoose.model('Recipe', RecipeSchema);


module.exports.schema = RecipeSchema;
module.exports.model = RecipeModel;

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var IngredientSchema = require('app/models/ingredient').schema;

var StepSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

var RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  steps: {
    type:  [StepSchema]
  },
  ingredients: {
    type: [IngredientSchema]
  }
});

RecipeSchema.plugin(timestamps);

var RecipeModel = mongoose.model('Recipe', RecipeSchema);


module.exports.schema = RecipeSchema;
module.exports.model = RecipeModel;

(function(window) {

  window.IngredientModel = window.BaseModel.create('Ingredient', {

  });

  window.RecipeModel = window.BaseModel.create('Recipe', {
    modelMappings: {
      ingredients: window.IngredientModel
    }
  });

})(window);

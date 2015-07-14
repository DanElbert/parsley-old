(function(window) {

  window.IngredientModel = window.BaseModel.create('Ingredient', {

  });

  window.StepModel = window.BaseModel.create('Step', {

  });

  window.RecipeModel = window.BaseModel.create('Recipe', {
    modelMappings: {
      ingredients: window.IngredientModel,
      steps: window.StepModel
    },
    methods: {
      initialize: function() {
        this.ingredients = this.ingredients || [];
        this.steps = this.steps || [];
      },

      createIngredient: function() {
        return new window.IngredientModel();
      },

      createStep: function() {
        return new window.StepModel();
      }
    }
  });

})(window);

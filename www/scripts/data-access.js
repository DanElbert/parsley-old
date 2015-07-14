(function(window) {
  'use strict';

  var baseUri = '/api';

  function get(url, callback, errback) {
    reqwest({
      url: baseUri + url,
      type: 'json'
    })
    .then(function(res) {
      callback(res);
    })
    .fail(function(err, msg) {
      errback(err, msg);
    });
  }

  function post(url, data, callback, errback) {
    reqwest({
      url: baseUri + url,
      method: 'POST',
      data: JSON.stringify(data),
      type: 'json',
      contentType: 'application/json'
    })
    .then(function(res) {
      callback(res);
    })
    .fail(function(err, msg) {
      errback(err, msg);
    });
  }

  function put(url, data, callback, errback) {
    reqwest({
      url: baseUri + url,
      method: 'PUT',
      data: data,
      type: 'json'
    })
    .then(function(res) {
      callback(res);
    })
    .fail(function(err, msg) {
      errback(err, msg);
    });
  }

  function del(url, callback, errback) {
    reqwest({
      url: baseUri + url,
      method: 'DELETE',
      type: 'json'
    })
    .then(function(res) {
      callback(res);
    })
    .fail(function(err, msg) {
      errback(err, msg);
    });
  }

  function toQueryString(params) {
    var str = [];
    for(var p in params) {
      if (params.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
    }
    return str.join("&");
  }

  var recipesData = {
    getAll: function(params, callback, errback) {
      get(
        '/recipes/?' + toQueryString(params),
        function(res) {
          var recipes = BaseModel.fromList(RecipeModel, res);
          callback(recipes);
        },
        errback
      );
    },

    get: function(id, callback, errback) {
      get(
        '/recipes/' + id,
        function(res) {
          var recipe = new RecipeModel(res);
          callback(recipe);
        },
        errback
      );
    },

    create: function(recipe, callback, errback) {
      post(
        '/recipes/',
        recipe.toJson(),
        function(res) {
          var recipe = new RecipeModel(res);
          callback(recipe);
        },
        errback
      );
    },

    update: function(recipe, callback, errback) {
      put(
        'recipes/' + recipe.id,
        recipe.toJson(),
        function(res) {
          var recipe = new RecipeModel(res);
          callback(recipe);
        },
        errback
      );
    },

    new: function() {
      return new RecipeModel();
    }
  };

  window.addEventListener('WebComponentsReady', function() {
    app.recipesData = recipesData;
  });

})(window);

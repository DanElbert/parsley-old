(function(window) {

  function BaseModel(json) {
    if (json) {
      this.fromJson(json);
    }
  }

  BaseModel.prototype.initialize = function() {
  };

  BaseModel.prototype.fromJson = function(json) {
    var ignored = this.ignoredFields();
    var self = this;

    Object.keys(json).forEach(function(field) {

      if (~ignored.indexOf(field)) return;

      var value = json[field];
      if (value instanceof Array) {
        self[field] = [];
        value.forEach(function(v) {
          self[field].push(self.valueFromJson(field, v));
        });
      } else {
        self[field] = self.valueFromJson(field, value);
      }
    });
  };

  BaseModel.prototype.valueFromJson = function(field, value) {
    var mappings = this.modelMappings();
    if (mappings[field]) {
      return new mappings[field](value);
    } else {
      return value;
    }
  };

  BaseModel.prototype.toJson = function() {
    var ignored = this.ignoredFields();
    var json = {};
    var self = this;

    Object.keys(this).forEach(function(field) {
      if (~ignored.indexOf(field) || (self[field] instanceof Function)) return;

      var value = self[field];

      if (value instanceof Array) {
        json[field] = [];
        value.forEach(function(v) {
          json[field].push(self.valueToJson(field, v));
        });
      } else {
        json[field] = self.valueToJson(field, value);
      }
    });

    return json;
  };

  BaseModel.prototype.valueToJson = function(field, value) {
    var mappings = this.modelMappings();
    if (mappings[field]) {
      return value.toJson();
    } else {
      return value;
    }
  };

  BaseModel.prototype.ignoredFields = function() {
    return ["errors", "metadata"].concat(this.metadata.ignoredFields);
  };

  BaseModel.prototype.modelMappings = function() {
    return this.metadata.modelMappings;
  };

  BaseModel.prototype.applyErrors = function(errors) {
    var errCopy = errors.slice(0);
    var modelMaps = this.modelMappings();

    Object.keys(modelMaps).forEach(function(prop) {
      var propValue = this[prop];

      if (propValue instanceof Array) {
        propValue.forEach(function(v, idx) {
          this.setErrorsOnModel(v, prop + '.' + idx.toString(), errCopy);
        }, this);
      } else {
        this.setErrorsOnModel(propValue, prop, errCopy);
      }
    }, this);

    this.errors = errCopy;
  };

  BaseModel.prototype.setErrorsOnModel = function(model, path, errors) {
    var modelErrors = [];
    var idxToRemove = [];
    errors.forEach(function(err, idx) {
      if (err.path.indexOf(path) === 0) {
        modelErrors.push({
          kind: err.kind,
          message: err.message,
          name: err.name,
          path: err.path.slice(path.length + 1)
        });
        idxToRemove.push(idx);
      }
    }, this);

    idxToRemove.sort().reverse().forEach(function(i) { errors.splice(i, 1); });
    model.applyErrors(modelErrors);
  };

  BaseModel.create = function(modelName, options) {
    var str = "var " + modelName + " = function(json) { BaseModel.call(this, json); this.initialize(); }; " + modelName + ";";
    /*jslint evil: true */
    var klass = eval(str);
    klass.prototype = Object.create(BaseModel.prototype);

    klass.prototype.metadata = {
      ignoredFields: options.ignoredFields || [],
      modelMappings: options.modelMappings || {}
    };

    if (options.methods) {
      Object.keys(options.methods).forEach(function(m) {
        klass.prototype[m] = options.methods[m];
      });
    }

    return klass;
  };

  BaseModel.fromList = function(klass, data) {
    var converted = [];
    data.forEach(function(i) {
      converted.push(new klass(i));
    });
    return converted;
  };

  window.BaseModel = BaseModel;

})(window);

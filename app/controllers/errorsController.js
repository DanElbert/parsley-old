

function createClientValidationError(err) {
  var errors = [];

  Object.keys(err.errors).forEach(function (field) {
    var mongooseError = err.errors[field];
    var clientError = {
      name: mongooseError.path,
      kind: mongooseError.kind,
      message: mongooseError.message,
      path: field,
      value: mongooseError.value
    };

    errors.push(clientError);
  });

  return errors;
};

module.exports = {

  validationError: function(err, req, res, next) {
    if (err.name && err.name === "ValidationError") {
      res.status(422);
      res.json({errors: createClientValidationError(err)});
    } else {
      next(err);
    }
  },

  unknownError: function(err, req, res, next) {
    console.error(err);
    res.status(500);
    res.json({error: err.message});
  }

};

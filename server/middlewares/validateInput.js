
// deletes empty fields in object

const deleteEmptyFields = (object) => {
  const fields = Object.keys(object);
  fields.forEach((field) => {
    if (object[field] === (null || undefined || '')) {
      delete object[field];
    }
  });
  return object;
};


// trims string values in object

const trimFields = (object) => {
  const fields = Object.keys(object);
  fields.forEach((field) => {
    if (typeof object[field] === 'string') {
      object[field] = object[field].trim();
    }
  });
  return object;
};


/**
 * input validation middleware
 */
export default {

// validates fields on request to signup user

  signup(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    if (!req.body.username) {
      return res.status(400).send({
        message: 'Username is required',
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        message: 'Password is required',
      });
    } else if (!req.body.email) {
      return res.status(400).send({
        message: 'Email is required',
      });
    } else if (!(req.body.password === req.body.confirmPassword)) {
      return res.status(400).send({
        message: 'Passwords do not match',
      });
    }
    next();
  },

  // validates fields on request to login user

  login(req, res, next) {
    req.body = deleteEmptyFields(trimFields(req.body));
    if (!req.body.email) {
      return res.status(400).send({
        message: 'Email is required',
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        message: 'Password is required',
      });
    }
    next();
  },

  // validates id params

  validateId(req, res, next) {
    return Number.isInteger(Number(req.params.id)) &&
      !Number.isNaN(req.params.id) ?
      next() :
      res.status(400).send({
        message: 'Id must be an integer',
      });
  },
};

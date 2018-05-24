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
export const trimInputs = (req, res, next) => {
  const body = req.body;
  const fields = Object.keys(body);
  fields.forEach((field) => {
    if (typeof body[field] === 'string') {
      body[field] = body[field].trim();
    }
  });
  req.body = deleteEmptyFields(body);
  next();
};

export const isAdmin = (req, res, next) => (
  req.user && req.user.isAdmin ?
    next() :
    res.status(403).send({
      message: 'You are not authorised',
    })
);

export const validateId = (req, res, next) => (
  Number.isInteger(Number(req.params.id)) && !Number.isNaN(req.params.id) ?
    next() :
    res.status(400).send({
      message: 'ID must be an integer',
    }));

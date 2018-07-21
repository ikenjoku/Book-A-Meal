/**
 * deletes empty input fields
 *
 * @param {Object} object of user inputs
 *
 * @returns {Object} user input object with empty fields deleted
 */
const deleteEmptyFields = (object) => {
  const fields = Object.keys(object);
  fields.forEach((field) => {
    if (object[field] === (null || undefined || '')) {
      delete object[field];
    }
  });
  return object;
};
/**
 * trims string values in object
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Object} calls the next middleware
 *
 * @returns {Object} object with string fields trimmed
 */
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

const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|z(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]),|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const validateSignup = (req, res, next) => {
    delete req.body.id;
    delete req.body.isAdmin;
    const { firstname, lastname, username, email, password, confirmPassword } = req.body;
    if (!firstname || typeof firstname !== 'string') {
      return res.status(400).send({
        message: 'Firstname is required'
      });
    } else if (!lastname || typeof lastname !== 'string') {
      return res.status(400).send({
        message: 'Lastname is required'
      });
    } else if (!username || typeof username !== 'string') {
      return res.status(400).send({
        message: 'Username is required'
      });
    } else if (!password || typeof password !== 'string') {
      return res.status(400).send({
        message: 'Password is required'
      });
    } else if (!email) {
      return res.status(400).send({
        message: 'Email is required'
      });
    } else if (!isEmail.test(email)) {
      return res.status(400).send({
        message: 'Invalid email'
      });
    } else if (
      !(password === confirmPassword)
    ) {
      return res.status(400).send({
        message: 'Passwords do not match'
      });
    }
    next();
  }


  export const validateSignin = (req, res, next) => {
    const { email, password } = req.body;
  if (!password || typeof password !== 'string') {
      return res.status(400).send({
        message: 'Please fill in your password'
      });
    } else if (!email) {
      return res.status(400).send({
        message: 'Please fill in your email'
      });
    } else if (!isEmail.test(email)) {
      return res.status(400).send({
        message: 'Ooops...invalid email'
      });
    }
    next();
  }
/**
 * checks if user is an Admin user
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Object} calls the next middleware
 *
 * @return {Function|Object} call the next middleware or express http response object

 */
export const isAdmin = (req, res, next) => (
  req.user && req.user.isAdmin ?
    next() :
    res.status(403).send({
      message: 'You are not authorised',
    })
);
/**
 * checks if /:id is an integer
 *
 * @param {Object} express http request object
 * @param {Object} express http response object
 * @param {Object} calls the next middleware

 * @return {Function|Object} call the next middleware or express http response object
 */
export const validateId = (req, res, next) => (
  Number.isInteger(Number(req.params.id)) && !Number.isNaN(req.params.id) ?
    next() :
    res.status(400).send({
      message: 'ID must be an integer',
    }));

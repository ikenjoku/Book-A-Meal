import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 *Gets json web token from the request
 *
 * @param {Object} req - express http request object
 *
 * @returns {String} json web token
 */
const getToken = (req) => {
  const token = req.body.token || req.headers['x-access-token'] ||
    (req.headers.Authorization && req.headers.Authorization.slice(7)) ||
    req.params.token;
  return token;
};
/**
 * authenticate a token from the http request object
 *
 * @param {Object} req - express http request object
 * @param {Object} res - express http response object
 * @param {Object} next - calls next middleware
 *
 * @returns {Object|Function} - call the next middleware or express http response object
 */
const authenticate = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'Your session has expired. Please reauthenticate',
          });
        }
        return res.status(401).json({
          message: 'unauthorized accesss. Login to continue',
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({
      message: 'Login to proceed',
    });
  }
};

export default authenticate;


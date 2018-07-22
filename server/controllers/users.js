import bcrypt from 'bcrypt';

import { User } from '../models';
import { getJWT } from '../helpers/helpers';

/**
 * It contains utility methods for users
 *
 * @class UserController
 */
class UserController {
  /**
   * Register a new user
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof UserController
   */
  static create(req, res, next) {
    const userData = { ...req.body, isAdmin: undefined };
    const username = userData.username;
    const email = userData.email;

    return User.find({
      where: { $or: [{ username }, { email }] },
    }).then((existingUser) => {
      if (existingUser && existingUser.username === username) {
        return res.status(409).json({
          message: 'username is taken',
        });
      }
      if (existingUser && existingUser.email === email) {
        return res.status(409).json({
          message: 'email is associated with an account',
        });
      }
      User.create(userData)
        .then((user) => {
          const {
            id,
            isAdmin,
          } = user;
          const jwtOptions = {
            id, email, isAdmin,

          };

          const token = getJWT(jwtOptions);
          const { firstname, lastname } = user;
          return res.status(201).json({
            token,
            id,
            firstname,
            lastname,
            isAdmin,
            message: `Welcome ${firstname}. Enjoy your meal`,
          });
        })
        .catch(error => next(error));
    })
      .catch(error => next(error));
  }
  /**
   * Logs in a new user
   *
   * @static
   *
   * @param {Object} - express http request object
   * @param {Object} - express http response object
   * @param {Function} - calls the next middleware
   *
   * @return {Object} - express http response object
   *
   * @memberof UserController
   */
  static login(req, res, next) {
    const userEmail = req.body.email;
    const password = req.body.password;
    return User.findOne({ where: { email: userEmail } }).then((user) => {
      if (!user) {
        return res.status(403).send({
          message: 'User does not exist',
        });
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          return res.status(403).send({
            message: 'Wrong username and password combination',
          });
        }
        const {
          id,
          email,
          isAdmin,
        } = user;
        const jwtOptions = {
          id, email, isAdmin,
        };
        const token = getJWT(jwtOptions);
        const { firstname, lastname } = user;
        return res.status(200).json({
          token,
          id,
          firstname,
          lastname,
          isAdmin,
          message: `Welcome back ${firstname}`,
        });
      }).catch(error => next(error));
    }).catch(error => next(error));
  }
}

export default UserController;

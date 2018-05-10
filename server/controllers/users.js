import bcrypt from 'bcrypt';

import { User } from '../models';
import { getJWT } from '../helpers/helpers';

class UserController {
  static create(req, res) {
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
        .catch(error => error);
    })
      .catch(error => error);
  }

  static login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    return User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return res.status(403).send({
          message: 'user does not exist',
        });
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          return res.status(403).send({
            message: 'wrong username and password combination',
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
      }).catch(error => error);
    }).catch(error => error);
  }
}

export default UserController;

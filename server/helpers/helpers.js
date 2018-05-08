import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Hashes the password of a given user before saving to db

export const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return user;
};

// makes a jsonwebtoken using credentials provided

export const getJWT = (options, expiresIn = '24h') =>
  jwt.sign({ ...options }, process.env.SECRET, { expiresIn });

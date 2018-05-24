import bcrypt from 'bcrypt';

const admin = {
  email: 'chubby@gmail.com',
  password: 'password',
};
const user = {
  email: 'kcee@gmail.com',
  password: 'password',

};
const userWithBadEmail = {
  email: 'jamez@gmail.com',
  password: 'password',

};
const userWithBadPassword = {
  email: 'james@gmail.com',
  password: 'password1',

};
const sampleUser1 = {
  firstname: 'Edward',
  lastname: 'Vamp',
  username: 'eddy',
  email: 'eddy@andela.com',
  password: bcrypt.hashSync('eddy', bcrypt.genSaltSync(8), null),
  confirmPassword: 'eddy',
};
const sampleUser2 = {
  firstname: 'full Name',
  lastname: 'userName',
  username: 'james',
  email: 'johne',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
  confirmPassword: 'eddy',
};
const sampleUser3 = {
  firstname: 'Jay',
  lastname: 'Doe',
  username: 'JDee',
  email: 'doe@andela.com',
  password: 'doey2',
  confirmPassword: 'doey2',
};
const sampleUser4 = {
  firstname: 'jane doe',
  lastname: 'jane',
  username: 'james',
  email: 'jane@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
  confirmPassword: 'eddy',

};
const sampleUser5 = {
  firstname: 'jake doe',
  lastname: 'doel',
  username: 'james',
  email: 'jake@andela.com',
  password: bcrypt.hashSync('emmanuel', bcrypt.genSaltSync(8), null),
  confirmPassword: 'eddy',
};
export default {
  admin,
  user,
  userWithBadEmail,
  userWithBadPassword,
  sampleUser1,
  sampleUser2,
  sampleUser3,
  sampleUser4,
  sampleUser5,
};
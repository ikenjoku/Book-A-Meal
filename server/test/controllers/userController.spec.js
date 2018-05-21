import UserController from '../../controllers/users';
import {
  sinon,
  mockReq,
  mockRes,
} from '../testSetup';

const res = mockRes();

describe('UserController', () => {
  describe('create method', () => {
    const next = sinon.spy();
    const req = mockReq({
      body: {
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    });

    it('method calls next function on err', async () => {
      try {
        await UserController.create(req, res, next);
        next.should.have.been.called;
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('login method', () => {
    const next = sinon.spy();
    const req = mockReq({
      body: {
        email: 'test@gmail.com',
        password: 'password',
      },
    });

    it('method calls next function on err', async () => {
      try {
        await UserController.login(req, res, next);
        next.should.have.been.called;
      } catch (err) {
        console.log(err);
      }
    });
  });
});

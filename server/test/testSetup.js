import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import assert from 'assert';
import App from '../app';

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1MjY0Njk0NzgsImV4cCI6MTUyNjU1NTg3OH0.-sYiWdJCdRPj7FXINEeifza3g-9k3_2VHdiopab-rQQ';
export {
  chai,
  assert,
  sinon,
  mockReq,
  mockRes,
  App,
  token,
};

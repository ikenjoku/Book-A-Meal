import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';

import MenuController from '../../../controllers/menu';


chai.use(sinonChai);
chai.should();

const request = {
  body: {
  },
};

const req = mockReq(request);
const res = mockRes();

describe('listMenu method', () => {
  beforeEach(() => {
    MenuController.listMenu(req, res);
  });

  it('should return 200 on success', () => {
		 res.status.should.have.been.calledWith(200);
  });
});

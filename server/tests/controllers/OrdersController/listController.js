import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';

import OrdersController from '../../../controllers/orders';


chai.use(sinonChai);
chai.should();

const request = {
  body: {
  },
};

const req = mockReq(request);
const res = mockRes();

describe('listOrders method', () => {
  beforeEach(() => {
    OrdersController.listOrders(req, res);
  });

  it('should return 200 on success', () => {
		 res.status.should.have.been.calledWith(200);
  });
});

import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import OrdersController from '../../../controllers/orders';
import Orders from '../../../model-mocks/orders';


chai.use(sinonChai);
chai.should();

const request = {
  body: {
    customerId: 3456,
    date: '05-09-2018',
    amount: 1200.00,
    meals: [{
      id: 19,
      name: 'Coconut Rice',
      description: 'Diced coconut rice flavour with fresh oil',
      price: 100.40,
      imageurl: 'https://adadasdasd.com/coed',
    },
    {
      id: 22,
      name: 'Extra Turkey',
      description: 'Honey turkey masked with cinnamon',
      price: 1100.00,
      imageurl: 'https://adadasdasd.com/coed',
    },
    ],
  },
};

const wrongRequest = {
  body: {
    date: '05-09-2018',
    amount: 1200.00,
    meals: [{
      id: 19,
      name: 'Coconut Rice',
      description: 'Diced coconut rice flavour with fresh oil',
      price: 100.40,
      imageurl: 'https://adadasdasd.com/coed',
    },
    ],
  },
};

const req = mockReq(request);
const res = mockRes();

describe('createOrder method', () => {
  beforeEach(() => {
    OrdersController.createOrder(req, res);
  });

  it('should return 201 on success', () => {
		 res.status.should.have.been.calledWith(201);
  });

  it('should create new order data', () => {
    const newOrder = Orders.filter(order => order.date === '05-09-2018');
    newOrder.length.should.be.above(0);
  });

  it('should return error 400 with missing order data fields', () => {
    const badReq = mockReq(wrongRequest);
    OrdersController.createOrder(badReq, res);
    res.status.should.have.been.calledWith(400);
  });

  it('sends an error message with missing data fields', () => {
    const badReq = mockReq(wrongRequest);
    OrdersController.createOrder(badReq, res);
    res.send.should.have.been.calledWith({
      message: 'Ooops! Something is not right.',
    });
  });
});
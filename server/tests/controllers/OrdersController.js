import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import OrdersController from '../../controllers/orders';
import Orders from '../../model-mocks/orders';


chai.use(sinonChai);
chai.should();


describe('createOrder method', () => {
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
  beforeEach(() => {
    OrdersController.createOrder(req, res);
  });

  it('should create new order data', () => {
    const newOrder = Orders.filter(order => order.date === '05-09-2018');
    newOrder.length.should.be.above(0);
  });
  
  it('should return 201 on success', () => {
		 res.status.should.have.been.calledWith(201);
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


describe('listOrders method', () => {
  const request = {
    body: {
    },
  };

  const req = mockReq(request);
  const res = mockRes();
  beforeEach(() => {
    OrdersController.listOrders(req, res);
  });

  it('should return 200 on success', () => {
		 res.status.should.have.been.calledWith(200);
  });
});

const request = {
  body: {
    customerId: 3456,
    date: 'test',
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
  params: {
    orderId: 2,
  },
};

describe('updateOrder method', () => {
  const badRequest = {
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
      ],
    },
    params: {
      orderId: 15,
    },
  };

  const req = mockReq(request);
  const res = mockRes();

  beforeEach(() => {
    OrdersController.updateOrder(req, res);
  });

  it('should return 200 on success', () => {
    res.status.should.have.been.calledWith(200);
  });

  it('should update order with specified orderId', () => {
    OrdersController.updateOrder(req, res);
    const updatedOrderIndex = Orders.findIndex(order => order.date === req.body.date);
    updatedOrderIndex.should.have.been.above(-1);
  });


  it('should return 404 if no order with specified orderId', () => {
    const wrongReq = mockReq(badRequest);
    OrdersController.updateOrder(wrongReq, res);
    res.status.should.have.been.calledWith(404);
  });

  it('should return error message if no order with specified orderId', () => {
    const wrongReq1 = mockReq(badRequest);
    OrdersController.updateOrder(wrongReq1, res);
    res.send.should.have.been.calledWith({
      message: 'Order Not Found',
    });
  });
});

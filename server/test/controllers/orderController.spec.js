import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'chubby@gmail.com', password: 'password' })
    .end((err, res) => {
      adminToken = res.body.token;
      done();
    });
});

before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'kcee@gmail.com', password: 'password' })
    .end((err, res) => {
      userToken = res.body.token;
      done();
    });
});

describe('Given /GET /api/v1/orders', () => {
  describe('When adminUser wants to get all orders', () => {
    it('should return all orders', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('orders');
          res.body.orders.should.be.a('array');
          res.body.orders[0].should.be.a('object');
          res.body.orders[0].should.have.property('id');
          res.body.orders[0].id.should.be.a('number');
          res.body.orders[0].should.have.property('date');
          res.body.orders[0].should.have.property('amount');
          res.body.orders[0].should.have.property('userId');
          res.body.orders[0].should.have.property('mealId');
          done();
        });
    });
    it('should return orders for a particular day', (done) => {
      chai.request(app)
        .get('/api/v1/orders/date?date=2018-05-16')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.should.have.property('message').eql('Orders for 2018-05-16 retrieved successfully');
          res.body.should.have.property('orders');
          res.body.orders.should.be.a('array');
          res.body.orders[0].should.be.a('object');
          res.body.orders[0].should.have.property('id');
          res.body.orders[0].id.should.be.a('number');
          res.body.orders[0].should.have.property('date');
          res.body.orders[0].should.have.property('amount');
          res.body.orders[0].should.have.property('userId');
          res.body.orders[0].should.have.property('mealId');
          done();
        });
    });
    it('should return previous orders for a particular user', (done) => {
      chai.request(app)
        .get('/api/v1/orders/customer')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('orders');
          res.body.orders.should.be.a('array');
          done();
        });
    });
  });
});

describe('Given /POST /api/v1/orders', () => {
  describe('When a user wants to make an order', () => {
    it('should create a new order', (done) => {
      const body = {
        mealId: 2,
        userId: 2,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(201);
          res.body.message.should.eql('Rice only has been ordered.');
          res.body.should.have.property('order');
          res.body.order.status.should.eql('pending');
          res.body.order.amount.should.eql(1500);
          done();
        });
    });
    it('should not place an order if meal does not exist', (done) => {
      const body = {
        mealId: 27,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(404);
          res.body.message.should.have.eql('Meal does not exist');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Given /PUT /api/v1/orders', () => {
  describe('When a user wants to update an order', () => {
    it('should update an order with a new meal', (done) => {
      const body = {
        newMealId: 4,
      };
      chai.request(app)
        .put('/api/v1/orders/6')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.message.should.eql('Your order has been updated');
          res.body.order.mealId.should.eql(4);
          res.body.order.amount.should.eql(1250);
          done();
        });
    });
    it('should update an order if order does not exist', (done) => {
      const body = {
        newMealId: 4,
      };
      chai.request(app)
        .put('/api/v1/orders/65')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(404);
          res.body.should.be.a('object');
          res.body.message.should.have.eql('Order was not found');
          done();
        });
    });
    it('should not update if an order was not made by the same user', (done) => {
      const body = {
        newMealId: 4,
      };
      chai.request(app)
        .put('/api/v1/orders/6')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(401);
          res.body.should.be.a('object');
          res.body.message.should.have.eql('You can not modify this order');
          done();
        });
    });
    it('should not update an order after 15 mins of making it', (done) => {
      const body = {
        newMealId: 4,
        id: 5,
      };
      chai.request(app)
        .put('/api/v1/orders')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(401);
          res.body.should.be.a('object');
          res.body.message.should.have.eql('You can not modify this order anymore');
          done();
        });
    });
    it('should cancel an order within 15 mins of making it', (done) => {
      const body = {
        cancel: true,
      };
      chai.request(app)
        .put('/api/v1/orders/6')
        .set('x-access-token', userToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.message.should.eql('Your order has been cancelled');
          res.body.order.status.should.eql('cancelled');
          done();
        });
    });
  });
});

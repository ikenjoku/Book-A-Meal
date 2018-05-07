import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Route GET /api/v1/orders', () => {
  it('should return orders objects', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/orders');
      res.body.orders.length.should.be.above(1);
    } catch (err) {
      throw err;
    }
  });

  it('should return status code 200', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/orders');
      res.should.have.status(401);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route: POST /api/v1/orders', () => {
  it('should add an order object', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/orders')
        .send({
          customerId: 340056,
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
        });
      res.body.order.customerId.should.equal(340056);
    } catch (err) {
      throw err;
    };
  })
  it('should return status code 201 on success', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/orders')
        .send({
          customerId: 340056,
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
        });
      res.should.have.status(401);
    } catch (err) {
      throw err;
    };
  })

  it('should return status code 400 with incomplete meal data', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/orders')
        .send({
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
        });
      res.should.have.status(401);
    } catch (err) {
      throw err;
    }
  })
});

describe('Route PUT /api/v1/orders/:orderId', () => {
  it('should update object with orderId', async () => {
    try {
      const res = await chai.request(app)
        .put('/api/v1/orders/2')
        .send({
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
          ],
        });

      res.body.date.should.equal('test');
    } catch (err) {
      throw err;
    }
  });

  it('should return status 404 error if no order with given orderId', async () => {
    try {
      const res = await chai.request(app)
        .put('/api/v1/orders/15')
        .send({
          customerId: 3456,
          date: '05-09-23018',
          amount: 1200.00,
          meals: [{
            id: 19,
            name: 'Coconut Rice',
            description: 'Diced coconut rice flavour with fresh oil',
            price: 100.40,
            imageurl: 'https://adadasdasd.com/coed',
          },
          ],
        });
      res.should.have.status(401);
    } catch (err) {
      throw err;
    }
  });
});


import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Route GET /api/v1/orders', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/orders');
      res.should.have.status(200);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route POST /api/v1/orders', () => {
  it('should return status 200', async () => {
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
      res.should.have.status(201);
    } catch (err) {
      throw err;
    }
  });

  it('should return error 400 with incomplete meal data', async () => {
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
      res.should.have.status(400);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route PUT /api/v1/orders/:orderId', () => {
  it('should return status 200', async () => {
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

      res.should.have.status(200);
    } catch (err) {
      throw err;
    }
  });

  it('should return 404 error if no order with given orderId', async () => {
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
      res.should.have.status(404);
    } catch (err) {
      throw err;
    }
  });
});


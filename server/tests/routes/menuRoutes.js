import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Route GET /api/v1/menu', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/menu');
      res.should.have.status(200);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route POST /api/v1/menu', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/menu')
        .send({
          name: 'test',
          date: '15-09-2018',
          meals: [{
            id: 1,
            name: 'Coconut Rice',
            description: 'Diced coconut rice flavour with fresh oil',
            price: 1100.40,
            imageurl: 'https://adadasdasd.com/coed',
          },
          ],
        });
      res.should.have.status(201);
    } catch (err) {
      throw err;
    }
  });

  it('should return error 400 with incomplete menu data', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/menu')
        .send({
          name: 'Jazz Day',
          meals: [{
            id: 1,
            name: 'Coconut Rice',
            description: 'Diced coconut rice flavour with fresh oil',
            price: 1100.40,
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


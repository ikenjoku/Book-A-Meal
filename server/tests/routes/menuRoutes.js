import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Route: GET /api/v1/menu', () => {
  it('should return menu objects', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/menu');
      res.body.menus.length.should.be.above(1);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route: POST /api/v1/menu', () => {
  it('should add a menu object', async () => {
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
      res.body.menu.name.should.equal('test');
    } catch (err) {
      throw err;
    }
  });

  it('should return status code 400 with incomplete menu data', async () => {
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
      res.should.have.status(401);
    } catch (err) {
      throw err;
    }
  });
});


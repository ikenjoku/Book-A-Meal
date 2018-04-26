import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('Route GET /api/v1/meals', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app).get('/api/v1/meals');
      res.should.have.status(200);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route POST /api/v1/meals', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/meals')
        .send({
          name: 'Indain',
          description: 'Creamy  hot',
          price: 1500.00,
          imageurl: 'hhtp://assa.sdsddd',
        });
      res.should.have.status(201);
    } catch (err) {
      throw err;
    }
  });

  it('should return error 400 with incomplete meal data', async () => {
    try {
      const res = await chai.request(app)
        .post('/api/v1/meals')
        .send({
          description: 'Creamy  hot',
          price: 1500.00,
          imageurl: 'hhtp://assa.sdsddd',
        });
      res.should.have.status(400);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route PUT /api/v1/meals/:mealId', () => {
  it('should return status 200', async () => {
    try {
      const res = await chai.request(app)
        .put('/api/v1/meals/2')
        .send({
          name: 'Indain',
          description: 'Creamy  hot',
          price: 1500.00,
          imageurl: 'hhtp://assa.sdsddd',
        });

      res.should.have.status(200);
    } catch (err) {
      throw err;
    }
  });

  it('should return 404 error if no meal with given mealId', async () => {
    try {
      const res = await chai.request(app)
        .put('/api/v1/meals/15')
        .send({
          name: 'Indain',
          description: 'Creamy  hot',
          price: 1500.00,
          imageurl: 'hhtp://assa.sdsddd',
        });
      res.should.have.status(404);
    } catch (err) {
      throw err;
    }
  });
});

describe('Route DELETE /api/v1/meals/:mealId', () => {
  it('should return status 204', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/meals/4');
      res.should.have.status(204);
    } catch (err) {
      throw err;
    }
  });

  it('should return an error message if no meal with given mealId', async () => {
    try {
      const res = await chai.request(app)
        .delete('/api/v1/meals/15');
      res.should.have.status(404);
      res.body.message.should.be.equal('Meal Not Found');
    } catch (err) {
      throw err;
    }
  });
});

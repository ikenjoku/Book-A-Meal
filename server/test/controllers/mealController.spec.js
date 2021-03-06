import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

const should = chai.should();
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

describe('Given /GET /api/v1/meals', () => {
  describe('When adminUser wants to get meals', () => {
    it('should return paginated meals', (done) => {
      chai.request(app)
        .get('/api/v1/meals?limit=5&page=1')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.meals.rows.should.be.a('array');
          res.body.meals.rows.length.should.eql(5);
          res.body.count.should.eql(5);
          res.body.pages.should.eql(1);
          done();
        });
    });
    it('should return a particular meal', (done) => {
      chai.request(app)
        .get('/api/v1/meals/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.meal.name.should.eql('Rice and Beans');
          res.body.meal.description.should.eql('Rice, Beans, Plantain, Panla Sauce, Max Coke');
          res.body.meal.price.should.eql(1500);
          res.body.meal.imageurl.should.eql('https://res.cloudinary.com/ikeenjoku/image/upload/v1532320842/bookameal/2018-07-23T04:40:42.344Zsemo-egusi.jpg.jpg');
          res.body.meal.id.should.eql(2);
          done();
        });
    });
    it('should not return a meal if it cannot be found', (done) => {
      chai.request(app)
        .get('/api/v1/meals/25')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.message.should.eql('Meal cannot be found');
          done();
        });
    });
  });
});

describe('Given /POST /api/v1/meals', () => {
  describe('When adminUser wants to add a meal', () => {
    it('should add a new meal and return the meal added', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Indain Japatti')
        .field('description', 'Spicy hot meat flakes with stew')
        .field('price', 1500)
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(201);
          res.body.meal.id.should.eql(6);
          res.body.meal.name.should.eql('Indain Japatti');
          res.body.meal.description.should.eql('Spicy hot meat flakes with stew');
          res.body.meal.price.should.eql(1500);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal without a name', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('description', 'Spicy hot meat flakes with stew')
        .field('price', 2500)
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.eql('Please fill in the meal name');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal without a price', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Ingera Ethi')
        .field('description', 'Spicy hot meat flakes with stew')
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.eql('Please fill in the meal price');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal without a description', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Spicy Suya')
        .field('price', 2500)
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.eql('Please describe the meal');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal without an image', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Spicy Banga')
        .field('description', 'Spicy hot meat flakes with stew')
        .field('price', 2500)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.eql('Please upload the meal image');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal if it already exist', (done) => {
      chai.request(app)
        .post('/api/v1/meals')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Nigerian Jollof')
        .field('description', 'Max Jollof rice, plantain, grilled turkey, bellefull Coke')
        .field('price', 1100)
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(409);
          res.body.message.should.have.eql('Meal already exist');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Given /PUT /api/v1/meals', () => {
  describe('When adminUser wants to update a meal', () => {
    it('should update a meal with valid data fields', (done) => {
      chai.request(app)
        .put('/api/v1/meals/2')
        .set('x-access-token', adminToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Rice only')
        .field('description', 'Rice, Beans, Plantain, Panla Sauce, Max Coke')
        .field('price', 1500)
        .attach('imageurl', `${__dirname}/testmeal.png`)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.updatedMeal.name.should.eql('Rice only');
          res.body.updatedMeal.description.should.eql('Rice, Beans, Plantain, Panla Sauce, Max Coke');
          res.body.updatedMeal.id.should.eql(2);
          done();
        });
    });
    it(
      'should not update a meal with invalid price field',
      (done) => {
        chai.request(app)
          .put('/api/v1/meals/2')
          .set('x-access-token', adminToken)
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'Rice only')
          .field('description', 'this is a new description')
          .field('price', 'a')
          .attach('imageurl', `${__dirname}/testmeal.png`)
          .end((err, res) => {
            res.status.should.eql(400);
            res.body.message.should.eql('Please fill in a valid meal price');
            res.body.should.be.a('object');
            done();
          });
      },
    );
    it(
      'should not update a meal without a meal name',
      (done) => {
        chai.request(app)
          .put('/api/v1/meals/2')
          .set('x-access-token', adminToken)
          .set('Content-Type', 'multipart/form-data')
          .field('name', '')
          .field('description', 'this is a new description')
          .field('price', 1200)
          .attach('imageurl', `${__dirname}/testmeal.png`)
          .end((err, res) => {
            res.status.should.eql(400);
            res.body.message.should.eql('Please fill in the meal name');
            res.body.should.be.a('object');
            done();
          });
      },
    );
    it(
      'should not update a meal to a meal name that already exist',
      (done) => {
        chai.request(app)
          .put('/api/v1/meals/2')
          .set('x-access-token', adminToken)
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'Onion Jappatti')
          .field('description', 'this is a new description')
          .field('price', 1200)
          .attach('imageurl', `${__dirname}/testmeal.png`)
          .end((err, res) => {
            res.status.should.eql(409);
            res.body.message.should.eql('Meal name already exist. Use a different name.');
            res.body.should.be.a('object');
            done();
          });
      },
    );
    it(
      'should not update a meal without a description',
      (done) => {
        chai.request(app)
          .put('/api/v1/meals/2')
          .set('x-access-token', adminToken)
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'Rice only')
          .field('description', '')
          .field('price', 1500)
          .attach('imageurl', `${__dirname}/testmeal.png`)
          .end((err, res) => {
            res.status.should.eql(400);
            res.body.message.should.eql('Please describe the meal');
            res.body.should.be.a('object');
            done();
          });
      },
    );
  });
});

describe('Given DELETE /api/v1/meals/:id', () => {
  describe('When adminUser wants to delete a meal', () => {
    it('should delete meal with mealId succesfully', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/3')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successfully deleted meal');
          done();
        });
    });
    it('Then it should not succeed when meal does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/120')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Meal cannot be found');
          done();
        });
    });
    it('should not be delete a meal if User is not an admin', (done) => {
      chai.request(app)
        .delete('/api/v1/meals/3')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You are not authorised');
          done();
        });
    });
    it('should not get a meal afer it has been deleted', (done) => {
      chai.request(app)
        .get('/api/v1/meals/3')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Meal cannot be found');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Customers', () => {
  it('should not be able to add a new meal and return the meal added', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .set('x-access-token', userToken)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'Ingera Meat')
      .field('description', 'Spicy hot meat flakes with stew')
      .field('price', 1500)
      .attach('imageurl', `${__dirname}/testmeal.png`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You are not authorised');
        done();
      });
  });
  it('should not be able to update a meal', (done) => {
    chai.request(app)
      .put('/api/v1/meals/2')
      .set('x-access-token', userToken)
      .set('Content-Type', 'multipart/form-data')
      .field('name', 'Rice Sauce')
      .field('description', 'Rice, Beans, Plantain, Panla Sauce, Max Coke')
      .field('price', 1550)
      .attach('imageurl', `${__dirname}/testmeal.png`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You are not authorised');
        done();
      });
  });
});

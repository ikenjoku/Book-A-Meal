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

describe('Given /GET /api/v1/menu', () => {
  describe('When user wants to get menu', () => {
    it('should return menu set for today', (done) => {
      chai.request(app)
        .get('/api/v1/menu')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('date');
          res.body.Meals.should.be.a('array');
          res.body.Meals[0].should.be.a('object');
          res.body.Meals[0].should.have.property('id');
          res.body.Meals[0].id.should.be.a('number');
          res.body.Meals[0].should.have.property('name');
          res.body.Meals[0].should.have.property('price');
          res.body.Meals[0].should.have.property('description');
          res.body.Meals[0].should.have.property('imageurl');
          done();
        });
    });
    it('should return menu for a particular day', (done) => {
      chai.request(app)
        .get('/api/v1/menu?date=2018-05-18')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('date').eql('2018-05-18');
          res.body.Meals.should.be.a('array');
          res.body.Meals[0].should.be.a('object');
          res.body.Meals[0].should.have.property('id');
          res.body.Meals[0].id.should.be.a('number');
          res.body.Meals[0].should.have.property('name');
          res.body.Meals[0].should.have.property('price');
          res.body.Meals[0].should.have.property('description');
          res.body.Meals[0].should.have.property('imageurl');
          done();
        });
    });
    it('should not return a menu if menu is not set for that particular day', (done) => {
      chai.request(app)
        .get('/api/v1/menu?date=2069-02-22')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          res.body.message.should.eql('Menu has not been set for 2069-02-22');
          done();
        });
    });
  });
});

describe('Given /POST /api/v1/menu', () => {
  describe('When adminUser wants to create a menu', () => {
    it('should create a new menu', (done) => {
      const body = {
        date: '2018-08-22',
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(201);
          res.body.message.should.eql('Menu for 2018-08-22 was successfully created');
          res.body.newMenu.id.should.eql(4);
          res.body.newMenu.date.should.eql('2018-08-22');
          done();
        });
    });
    it('should not create a menu if it already exist', (done) => {
      const body = {
        date: '2018-05-15',
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('Menu for 2018-05-15 already exist');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should add a meal to a particular menu', (done) => {
      const body = {
        date: '2018-05-18',
        mealId: 3,
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.message.should.eql('Meal added to menu of 2018-05-18 successfully');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not add a meal if menu if menu does not exist', (done) => {
      const body = {
        date: '2022-05-15',
        mealId: 3,
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('No menu is set for 2022-05-15');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});


import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;
let newMenu;
let updatedMenu;

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
          res.body.menu.should.have.property('id');
          res.body.menu.should.have.property('date');
          res.body.menu.Meals.should.be.a('array');
          res.body.menu.Meals[0].should.be.a('object');
          res.body.menu.Meals[0].should.have.property('id');
          res.body.menu.Meals[0].id.should.be.a('number');
          res.body.menu.Meals[0].should.have.property('name');
          res.body.menu.Meals[0].should.have.property('price');
          res.body.menu.Meals[0].should.have.property('description');
          res.body.menu.Meals[0].should.have.property('imageurl');
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
          res.body.menu.should.have.property('id');
          res.body.menu.should.have.property('date').eql('2018-05-18');
          res.body.menu.Meals.should.be.a('array');
          res.body.menu.Meals[0].should.be.a('object');
          res.body.menu.Meals[0].should.have.property('id');
          res.body.menu.Meals[0].id.should.be.a('number');
          res.body.menu.Meals[0].should.have.property('name');
          res.body.menu.Meals[0].should.have.property('price');
          res.body.menu.Meals[0].should.have.property('description');
          res.body.menu.Meals[0].should.have.property('imageurl');
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
          res.body.message.should.eql('Menu has not been set for Friday, February 22nd 2069');
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
        mealIds: [1, 2, 4],
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(201);
          res.body.message.should.eql('Successfully created a menu for Wednesday, August 22nd 2018');
          res.body.menu.id.should.eql(4);
          res.body.menu.date.should.eql('2018-08-22');
          done();
        });
    });
    it('should not create a menu if it already exist', (done) => {
      const body = {
        date: '2018-05-15',
        mealIds: [1, 2],
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('Menu for Tuesday, May 15th 2018 already exists');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not create a menu with invalid meal IDs', (done) => {
      const body = {
        date: '2018-05-15',
        mealIds: [0, -2],
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('Invalid meal IDs');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should not create a menu if mealId does not match a meal', (done) => {
      const body = {
        date: '2018-05-25',
        mealIds: [1, 340],
      };
      chai.request(app)
        .post('/api/v1/menu')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('Meal does not exist. Check meal_id sent');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Given /PUT /api/v1/menu/:id', () => {
  describe('When adminUser wants to update a menu', () => {
    it('should update menu with given ID', (done) => {
      const body = {
        mealIds: [1, 2],
      };
      chai.request(app)
        .put('/api/v1/menu/2')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.message.should.eql('Successfully updated menu for Tuesday, May 15th 2018');
          res.body.menu.id.should.eql(2);
          res.body.menu.date.should.eql('2018-05-15');
          done();
        });
    });
    it('should not update menu with incorrect ID', (done) => {
      const body = {
        mealIds: [1, 2],
      };
      chai.request(app)
        .put('/api/v1/menu/233')
        .set('x-access-token', adminToken)
        .send(body)
        .end((err, res) => {
          res.status.should.eql(400);
          res.body.message.should.have.eql('No menu found');
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

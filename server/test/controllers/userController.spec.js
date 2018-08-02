import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';

import app from '../../app';
import mockData from '../testUsers';

require('dotenv').config();

chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;
let sampleUserToken;
describe('Users', () => {

  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(mockData.admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(mockData.user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('Given /api/v1/auth/signup', () => {
    describe('When I want to add a user', () => {
      it('Then it should not add a user without a firstname', (done) => {
        const user = {
          firstname: '',
          lastname: 'Elba',
          username: 'Idrismo',
          email: 'Idris@gmail.com',
          password: 'idris1',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(400);
            res.body.message.should.eql('Firstname is required');
            done();
          });
      });
      it('Then it should not add a user without a lastname', (done) => {
        const user = {
          firstname: 'Adino',
          lastname: '',
          username: 'Idrismo',
          email: 'Idris@gmail.com',
          password: 'idris1',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Lastname is required');
            done();
          });
      });

      it('Then it should not add a user without a username', (done) => {
        const user = {
          firstname: 'Idrismo',
          lastname: 'Elba',
          username: '',
          email: 'Idris@gmail.com',
          password: 'idris1',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Username is required');
            done();
          });
      });
      it('Then it should not add a user without an email address', (done) => {
        const user = {
          firstname: 'Idris',
          lastname: 'Alba',
          username: 'Eedress',
          email: '',
          password: 'idris1',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Email is required');
            done();
          });
      });
      it('Then it should not add a user with a wrong email format', (done) => {
        const user = {
          firstname: 'Idrismo',
          lastname: 'Elba',
          username: 'Bellema',
          email: 'Idrisgmail.com',
          password: 'idris1',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Invalid email');
            done();
          });
      });
      it('Then it should not add a user when password field is empty', (done) => {
        const user = {
          firstname: 'Idrismo',
          lastname: 'Elba',
          username: 'Bellema',
          email: 'Idris@gmail.com',
          password: '',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Password is required');
            done();
          });
      });
      it('Then it should not add a user when password and password retype do not match', (done) => {
        const user = {
          firstname: 'Idrismo',
          lastname: 'Elba',
          username: 'Bellema',
          email: 'Idris@gmail.com',
          password: 'sdfds',
          confirmPassword: 'idris1',
        };
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.eql('Passwords do not match');
            done();
          });
      });
      it(
        'Then it should not add a user if the email already exist',
        (done) => {
          const user = {
            firstname: 'Izzy',
            lastname: 'Chima',
            username: 'Vero',
            email: 'chubby@gmail.com',
            password: 'idris1',
            confirmPassword: 'idris1',
          };
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
              res.should.have.status(409);
              res.body.message.should.eql('email is associated with an account');
              done();
            });
        },
      );
      it('Then it should generate a token when the user is added', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(mockData.sampleUser3)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('token');
            done();
          });
      });
      it(
        'Then it should return the user payload',
        (done) => {
          const user = {
            firstname: 'Eze',
            lastname: 'Elvis',
            username: 'eazyE',
            email: 'eazy@gmail.com',
            password: 'blessed',
            confirmPassword: 'blessed',
          };
          chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.message.should.eql('Welcome Eze. Enjoy your meal');
              res.body.firstname.should.eql('Eze');
              res.body.isAdmin.should.eql(false);
              res.body.should.have.property('token');
              done();
            });
        },
      );
    });
  });

  describe('Given /api/v1/auth/login', () => {
    describe('When a user wants to sign in', () => {
      it(
        'Then it should fail if the user does not enter an email address',
        (done) => {
          const mockUser = {
            email: '',
            password: 'secretpassword',
          };
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.message.should.eql('Please fill in your email');
              done();
            });
        },
      );
      it(
        'Then it should fail if the user does not enter a valid email address',
        (done) => {
          const mockUser = {
            email: 'gboy.com',
            password: 'secretpassword',
          };
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.message.should.eql('Ooops...invalid email');
              done();
            });
        },
      );
      it(
        'Then it should fail if the user does not enter a password',
        (done) => {
          const mockUser = {
            email: 'kcee@gmail.com',
            password: '',
          };
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.message.should.eql('Please fill in your password');
              done();
            });
        },
      );
      it('Then it should fail if the user is not registered', (done) => {
        const mockUser = {
          email: 'eligee@gmail.com',
          password: 'forgetpwd',
        };
        chai.request(app)
          .post('/api/v1/auth/login')
          .send(mockUser)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.message.should.eql('User does not exist');
            done();
          });
      });
      it(
        'Then it should fail if the user enters an incorrect password',
        (done) => {
          const mockUser = {
            email: 'kcee@gmail.com',
            password: 'kbee',
          };
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.message.should.eql('Wrong username and password combination');
              done();
            });
        },
      );
      it(
        'Then it should return users payload',
        (done) => {
          const mockUser = {
            email: 'kcee@gmail.com',
            password: 'password',
          };
          chai.request(app)
            .post('/api/v1/auth/login')
            .send(mockUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.message.should.eql('Welcome back Kelechi');
              res.body.firstname.should.eql('Kelechi');
              res.body.should.have.property('token');
              done();
            });
        },
      );
    });
  });
});

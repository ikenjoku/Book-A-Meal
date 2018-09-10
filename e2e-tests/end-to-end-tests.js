const path = require('path');
const moment = require('moment');

const today = new Date().toISOString().substr(0, 10);

module.exports = {
  'user can visit landing page': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .assert.containsText('h3', 'Welcome to Book-A-Meal')
      .end();
  },

  'user receives an error if form is not completely filled': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .click('.form-text a')
      .waitForElementVisible('#signup-form', 3000)
      .setValue('input[name="username"]', 'chiwearroca')
      .pause(1000)
      .setValue('input[name="email"]', 'chibuzo@gmail.com')
      .pause(1000)
      .setValue('input[name="password"]', 'password')
      .pause(1000)
      .setValue('input[name="confirmPassword"]', 'password')
      .pause(1000)
      .click('input[type="submit"]')
      .waitForElementVisible('.alert-danger', 3000)
      .assert.containsText('.alert', 'Please fill in all the fields')
      .end();
  },

  'user can signup': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .click('.form-text a')
      .waitForElementVisible('#signup-form', 3000)
      .setValue('input[name="firstname"]', 'Chibuzo')
      .pause(1000)
      .setValue('input[name="lastname"]', 'John')
      .pause(1000)
      .setValue('input[name="username"]', 'chiwearroca')
      .pause(1000)
      .setValue('input[name="email"]', 'chibuzo@gmail.com')
      .pause(1000)
      .setValue('input[name="password"]', 'password')
      .pause(1000)
      .setValue('input[name="confirmPassword"]', 'password')
      .pause(1000)
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .assert.urlEquals('http://localhost:9500/menu')
      .end();
  },

  'user receives an error if username or password field is empty':
  function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .click('input[type="submit"]')
      .waitForElementVisible('.alert-danger', 3000)
      .assert.containsText('.alert', 'email and password are required')
      .end();
  },

  'caterer can login': (client) => {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .assert.urlEquals('http://localhost:9500/menu')
      .end();
  },

  'Caterer can add meals': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/meals/create')
      .waitForElementVisible('#meal-form', 3000)
      .setValue('input[name="name"]', 'Tomatoe Sauce')
      .setValue('input[name="description"]', 'Fried Fresh tomatoes with hot pepper')
      .setValue('input[name="price"]', 1200)
      .pause(1000)
      .setValue('input[name=imageurl]', path.join(__dirname, '../server/test/controllers/testmeal.png'))
      .click('input[type="submit"]')
      .pause(1000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Successfully added a new meal')
      .end();
  },

  'Caterer can edit meals': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/meals')
      .waitForElementVisible('.meal-table', 10000)
      .click('#edit-meal-1')
      .waitForElementVisible('#meal-form', 3000)
      .clearValue('input[name="name"]')
      .pause(1000)
      .setValue('input[name="name"]', 'Tomatoe Purry')
      .clearValue('input[name="description"]')
      .pause(1000)
      .setValue('input[name="description"]', 'Fried Fresh tomatoes with hot pepper')
      .clearValue('input[name="price"]')
      .pause(1000)
      .setValue('input[name="price"]', 1700)
      .pause(1000)
      .setValue('input[name=imageurl]', path.join(__dirname, '../server/test/controllers/testmeal.png'))
      .click('input[type="submit"]')
      .pause(1000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Successfully updated meal')
      .end();
  },

  'Caterer can delete meals': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/meals')
      .waitForElementVisible('.meal-table', 10000)
      .click('#delete-meal-3')
      .pause(1000)
      .click('#confirm-delete-btn')
      .pause(1000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Successfully deleted meal')
      .end();
  },

  'Caterer can create a menu': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/set-menu')
      .waitForElementVisible('.menu-card', 10000)
      .setValue('input[name="menu-date"]', '30-11-2018')
      .pause(1000)
      .click('input[type="submit"]')
      .waitForElementVisible('.no-menu-card', 10000)
      .pause(1000)
      .click('#open-create-btn')
      .waitForElementVisible('.meal-check-list', 10000)
      .pause(3000)
      .click('input[type="checkbox"]')
      .pause(1000)
      .click('#setup-menu-btn')
      .pause(1000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Successfully created a menu for Friday, November 30th 2018')
      .end();
  },

  'Caterer can update a menu': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/set-menu')
      .waitForElementVisible('.menu-card', 10000)
      .click('#open-update-btn')
      .waitForElementVisible('.meal-check-list', 10000)
      .pause(3000)
      .click('input[type="checkbox"]')
      .pause(1000)
      .click('#setup-menu-btn')
      .pause(1000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', `Successfully updated menu for ${moment(today).format('dddd, MMMM Do YYYY')}`)
      .end();
  },

  'Customer can order a meal': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'kcee@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .assert.urlEquals('http://localhost:9500/menu')
      .waitForElementVisible('.food-item', 10000)
      .click('#order-meal-6')
      .pause(2000)
      .click('#confirm-place-order')
      .pause(3000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Tomatoe Sauce has been ordered')
      .end();
  },

  'Customer can update an order': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'kcee@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .assert.urlEquals('http://localhost:9500/menu')
      .waitForElementVisible('.order-item', 10000)
      .pause(2000)
      .click('#update-order-7')
      .pause(2000)
      .setValue('input[name="quantity"]', 2)
      .pause(3000)
      .click('#confirm-update-order')
      .pause(3000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Your order has been updated')
      .end();
  },

  'Caterer can see and deliver orders': function (client) {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 10000)
      .url('http://localhost:9500/order-history')
      .waitForElementVisible('.order-table-body', 10000)
      .pause(2000)
      .click('#deliver-order-7')
      .pause(3000)
      .waitForElementVisible('.success-container', 15000)
      .assert.containsText('.toast-success', 'Your order has been updated')
      .end();
  },
};


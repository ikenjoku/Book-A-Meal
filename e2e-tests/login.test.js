module.exports = {
  'user can login': (client) => {
    client
      .url('http://localhost:9500')
      .waitForElementVisible('body', 3000)
      .click('#enter-btn')
      .waitForElementVisible('#login-form', 3000)
      .setValue('input[name="email"]', 'chubby@gmail.com')
      .setValue('input[name="password"]', 'password')
      .click('input[type="submit"]')
      .waitForElementVisible('main#menu-page', 5000)
      .assert.urlEquals('http://localhost:9500/menu')
      .end();
  },

  // 'user receives an error if username or password field is empty':
  // (client) => {
  //   client
  //     .url('http://localhost:8080/login')
  //     .waitForElementVisible('body')
  //     .waitForElementVisible('#login-form')
  //     .click('input[name="submit"]')
  //     .assert.containsText('#error-username', 'Username is required')
  //     .assert.containsText('#error-password', 'Password is required')
  //     .end();
  // },

  // 'user cannot log in with unknown username': (client) => {
  //   client
  //     .url('http://localhost:8080/login')
  //     .waitForElementVisible('#login-form')
  //     .setValue('input[name="username"]', 'wrongusername')
  //     .setValue('input[name="password"]', 'wrongpassword')
  //     .click('input[name="submit"]')
  //     .waitForElementVisible('#toast-container')
  //     .assert.urlEquals('http://localhost:8080/login')
  //     .assert.containsText('.toast', 'user does not exist')
  //     .end();
  // },

  // 'user cannot log in with wrong password': (client) => {
  //   client
  //     .url('http://localhost:8080/login')
  //     .waitForElementVisible('#login-form')
  //     .setValue('input[name="username"]', 'Segun')
  //     .setValue('input[name="password"]', 'wrongpassword')
  //     .click('input[name="submit"]')
  //     .waitForElementVisible('#toast-container')
  //     .assert.urlEquals('http://localhost:8080/login')
  //     .assert.containsText('.toast', 'wrong username and password combination')
  //     .end();
  // },
};

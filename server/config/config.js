const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  test: {
    use_env_variable: 'postgres://zveddkuy:2L2j7IktvjDteqZEO0_kr_YfK2h89C8W@elmer.db.elephantsql.com:5432/zveddkuy',
  },
  production: {
    use_env_variable: 'postgres://nqoyugta:vhfjgx6Yi-cK62F6m3n4vNR7wREhkNgw@elmer.db.elephantsql.com:5432/nqoyugta',
  },
};

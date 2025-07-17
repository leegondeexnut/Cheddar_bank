const dotenv = require('dotenv');

dotenv.config;
module.exports = {

  development: {
   client: 'pg',
  connection: {
    host: '',
    port: 5432,
    user: process.env.PG_USER,
    password:process.env.PG_PASS,
    database: 'bank_app',
}
  }
}

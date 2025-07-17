const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config;
module.exports = {

  development: {
   client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: process.env.PG_USER,
    password:process.env.PG_PASS,
    database: 'best_banking_app',
}
  }
  
}

const mysql = require("mysql");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD_DB,
  database: "shopao",
});

module.exports = connection; 

const mysql = require('mysql');
const dotenv = require('dotenv').config();
// create mysql database configuration
require("dotenv").config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dateStrings: true
});
module.exports = connection;
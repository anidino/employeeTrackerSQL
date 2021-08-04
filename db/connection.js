const mysql = require('mysql2');

// connect to db 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"
    // Promise: bluebird
});



module.exports = connection;
const mysql = require('mysql2');

const db = mysql.createConnection(
 {
   host: 'localhost',
   // Your MySQL username,
   user: 'root',
   // Your MySQL password
   password: 'gitHub',
   database: 'employees'
 },
 console.log('Connected to the employee database.')
);


module.exports = db;
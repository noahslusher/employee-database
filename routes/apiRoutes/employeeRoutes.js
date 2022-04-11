const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// Get all employees
router.get('/employees', (req, res) => {
 const sql = `SELECT employee.*, role.title AS role_title, role.salary AS role_salary, role.department_id
 AS department_id
 FROM employee
 LEFT JOIN role
 ON employee.role_id = role.id;`;

 db.query(sql, (err, rows) => {
  if (err) {
   res.status(500).json({ error: err.message })
   return;
  } 
  res.json({
   message: "success",
   data: rows
  })
 })
})

module.exports = router;

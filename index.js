const fs = require('fs')
const inquirer = require('inquirer')
const db = require('./db/connection')
require("console.table")

let openingPrompt = () => { 
 inquirer.prompt([
 {
  type: 'list',
  name: 'initialPrompt',
  message: 'Please select an option.',
  choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
},
]).then((ans1) => {
 console.log(ans1)
if (ans1.initialPrompt === 'View All Departments') {
  viewDepartment()
}
else if (ans1.initialPrompt === 'View All Roles') {
  viewRoles()
}
else if (ans1.initialPrompt === 'View All Employees') {
  viewEmployees()
}

else if (ans1.initialPrompt === 'Add a Department') {
 addDepartmentPrompt();
}
else if (ans1.initialPrompt === "Add a Role") {
 addRolePrompt()
}
else if (ans1.initialPrompt === "Add an Employee") {
 addEmployeePrompt()
}
else if (ans1.initialPrompt === "Update an Employee Role") {
updateEmployeePrompt()
}
else 
console.log(error)
})

}

let viewDepartment = () => {
  const sql = `SELECT * FROM department`;

 db.query(sql, (err, rows) => {
  if (err) {
   console.log({ error: err.message })
   return openingPrompt();
  } 
  console.table(
   rows
  )
  openingPrompt()
 })
}

let viewRoles = () => {
  const sql = `SELECT role.*, department.name
  AS department_name
  FROM role
  LEFT JOIN department
  ON role.department_id = department.id`;
 
  db.query(sql, (err, rows) => {
   if (err) {
    console.loge({ error: err.message })
    return openingPrompt();
   } 
   console.table(
    rows
   )
   openingPrompt()
  })
}

let viewEmployees = () => {
  const sql = `SELECT employee.*, role.title AS role_title, role.salary AS role_salary, role.department_id
  AS department_id
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id;`;
 
  db.query(sql, (err, rows) => {
   if (err) {
    console.log({ error: err.message })
    return openingPrompt();
   } 
   console.table(
    rows
   )
   openingPrompt()
  })
}



let addDepartmentPrompt = () => {
 inquirer.prompt([
 {
 type: 'input',
 name: 'addDepartment',
 message: 'Please enter the name of the department',
},
]).then((ans2) => {
  const sql = `INSERT INTO department (name) VALUES (?)`
  const params = [ans2.addDepartment]
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log({ error: err.message })
      return openingPrompt();
     } 
     viewDepartment()
  })
})
}

let addRolePrompt = () => {
inquirer.prompt([
{
 type: 'list',
 name: 'addRole',
 message: "Please choose the employee's role",
 choices: [{name: "Software Developer", value: 1}, {name:"Human Resources Representative", value: 2}, {name: "Accountant", value: 3}]
},
{
 type: 'input',
 name: 'addRoleSalary',
 message: 'Please enter the salary of the role',
},
{
 type: 'list',
 name: 'addRoleDepartment',
 message: "Please enter the role's department id",
 choices: [{name:"Information Technology", value: 1}, {name:"Human Resources", value: 2}, {name:"Accounting", value: 3}]
},
]).then((ans3) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
  const params = [ans3.addRole, ans3.addRoleSalary, ans3.addRoleDepartment]
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log({ error: err.message })
      return openingPrompt();
     } 
    viewRoles()
  })
})
}


let addEmployeePrompt = () => {
 inquirer.prompt([
  {
   type: 'input',
   name: 'addEmployee_fn',
   message: 'Please enter the first name of the employee',
  },
  {
   type: 'input',
   name: 'addEmployee_ln',
   message: 'Please enter the last name of the employee',
  },
  {
   type: 'input',
   name: 'addEmployeeRole',
   message: "Please enter employee's role",
  },
  {
   type: 'input',
   name: 'addEmployeeManager',
   message: "Please enter id of the employee's manager",
  },
 ]).then((ans4) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
  const params = [ans4.addEmployee_fn, ans4.addEmployee_ln, ans4.addEmployeeRole, ans4.addEmployeeManager]
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log({ error: err.message })
      return openingPrompt;
    } 
    viewEmployees()
  })
})
}




let updateEmployeePrompt = () => {
 inquirer.prompt([
  {
   type: 'list',
   name: 'updateEmployee',
   message: 'Choose the employee you would like to update',
   choices: [{name: "Bob Johnson", value: 1}, {name: "Steve Stevens", value: 2}],
  },
 ]).then((ans5) => {
   console.log(ans5)
  inquirer.prompt([
    {
     type: 'list',
     name: 'employeeChoice',
     message: 'Please choose what you would like to update',
     choices: ['First name', 'Last name', 'Employee role ID', 'Manager ID']
    },
    {
     type: 'input',
     name: 'employeeInput',
     message: 'Please enter the updated information',
    },
    
    
    
   ]).then((ans6) => {
     if (ans6.employeeChoice === 'First name'){
    const sql = `UPDATE employee SET first_name = ?
    WHERE employee.id = ${ans5.updateEmployee}`
    const params = [ans6.employeeInput]
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log({ error: err.message })
        return openingPrompt;
      } 
    
    })
    viewEmployees()
  }
  else if (ans6.employeeChoice === 'Last name'){
    const sql = `UPDATE employee SET last_name = ?
    WHERE employee.id = ${ans5.updateEmployee}`
    const params = [ans6.employeeInput]
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log({ error: err.message })
        return openingPrompt;
      } 
    })
    viewEmployees()
  }
  else if (ans6.employeeChoice === 'Employee role ID'){
    const sql = `UPDATE employee SET role_id = ?
    WHERE employee.id = ${ans5.updateEmployee}`
    const params = [ans6.employeeInput]
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log({ error: err.message })
        return openingPrompt;
      } 
    })
    viewEmployees()
  }
  else if (ans6.employeeChoice === 'Manager ID'){
    const sql = `UPDATE employee SET manager_id = ?
    WHERE employee.id = ${ans5.updateEmployee}`
    const params = [ans6.employeeInput]
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log({ error: err.message })
        return openingPrompt;
      } 
    })
    viewEmployees()
  }
})
})
}


openingPrompt();
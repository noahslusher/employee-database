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
      console.log({ error: err.message })
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
      choices: [{ name: "Software Developer", value: 1 }, { name: "Human Resources Representative", value: 2 }, { name: "Accountant", value: 3 }]
    },
    {
      type: 'input',
      name: 'addRoleSalary',
      message: 'Please enter the salary of the role',
    },
    {
      type: 'input',
      name: 'addRoleDepartment',
      message: "Please enter the role's department id",
      
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
      type: 'list',
      name: 'addEmployeeRole',
      message: "Please choose the employee's role",
      choices: [{ name: "Software Developer", value: 1 }, { name: "Human Resources Representative", value: 2 }, { name: "Accountant", value: 3 }]
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
  
      {
        type: 'list',
        name: 'employeeChoice',
        message: 'Please choose what you would like to update',
        choices: ['First name', 'Last name', 'Employee role ID', 'Manager ID']
      },
    ]).then((ans5) => {
      console.log(ans5)
      inquirer.prompt([
      {
        when: () => ans5.employeeChoice === 'First name',
        type: 'input',
        name: 'firstName',
        message: "Please enter the employee's first name",
      },
      {
        when: () => ans5.employeeChoice === 'Last name',
        type: 'input',
        name: 'lastName',
        message: "Please enter the employee's last name",
      },
      {
        when: () => ans5.employeeChoice === 'Employee role ID',
        type: 'input',
        name: 'employeeId',
        message: "Please enter the employee's ID number for their corresponding role: 1 = Software Developer, 2 = Human Resources Representative, 3 = Accountant",
      },
      {
        when: () => ans5.employeeChoice === 'Manager ID',
        type: 'input',
        name: 'managerId',
        message: "Please enter the ID number of the employee's manager",
      },



    ]).then((ans6) => {
      if (ans6.firstName) {
        const sql = `UPDATE employee SET first_name = ?
    WHERE employee.id = ${ans5.updateEmployee}`
        const params = [ans6.firstName]
        db.query(sql, params, (err, rows) => {
          if (err) {
            console.log({ error: err.message })
            return openingPrompt;
          }

        })
        viewEmployees()
      }
      else if (ans6.lastName) {
        const sql = `UPDATE employee SET last_name = ?
    WHERE employee.id = ${ans5.updateEmployee}`
        const params = [ans6.lastName]
        db.query(sql, params, (err, rows) => {
          if (err) {
            console.log({ error: err.message })
            return openingPrompt;
          }
        })
        viewEmployees()
      }
      else if (ans6.employeeId) {
        const sql = `UPDATE employee SET role_id = ?
    WHERE employee.id = ${ans5.updateEmployee}`
        const params = [ans6.employeeId]
        db.query(sql, params, (err, rows) => {
          if (err) {
            console.log({ error: err.message })
            return openingPrompt;
          }
        })
        viewEmployees()
      }
      else if (ans6.managerId) {
        const sql = `UPDATE employee SET manager_id = ?
    WHERE employee.id = ${ans5.updateEmployee}`
        const params = [ans6.managerId]
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
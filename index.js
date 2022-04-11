const fs = require('fs')
const inquirer = require('inquirer')

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

if (ans1.initialPrompt === 'Add a Department') {
 addDepartmentPrompt();
}
else if (ans1.initialPrompt === "Add a Role") {
 addRolePrompt()
}
else if (ans1.initialPrompt === "Add an Employee") {
 addEmployeePrompt()
}
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
 console.log(ans2)
})
}

let addRolePrompt = () => {
inquirer.prompt([
{
 type: 'input',
 name: 'addRole',
 message: 'Please enter the name of the role',
},
{
 type: 'input',
 name: 'addRoleSalary',
 message: 'Please enter the salary of the role',
},
{
 type: 'input',
 name: 'addRoleDepartment',
 message: "Please enter the role's department",
},
]).then((ans3) => {
 console.log(ans3)
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
   message: "Please enter name of the employee's manager",
  },
 ]).then((ans4) => {
  console.log(ans4)
 })
}


let updateEmployeePrompt = () => {
 inquirer.prompt([
  {
   type: 'input',
   name: 'updateEmployee',
   choices: [],
  },
 ]).then((ans5) => {
  console.log(ans5)
 })
}

openingPrompt();
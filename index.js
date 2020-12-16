var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "pho12345",
  database: "employee_trackerDB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add departments",
        "Add roles",
        "Add employees",
        "Update employee roles",
        "End"
      ],
    })
    .then(function (answer) {
      // based on their answer
      switch (answer.action) {
          case "View departments":
          viewDept();
          break;

          case "View roles":
          viewRole();
          break;

          case "View employees":
          viewEmp();
          break;

          case "Add departments":
          addDept();
          break;

          case "Add roles":
          addRole();
          break;

          case "Add employees":
          addEmp();
          break;

          case "Update employee roles":
          updateEmp();
          break;

          case "End":
          end();
          break;
      }
    });
}
function viewDept() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
function viewEmp() {
  connection.query("SELECT first_name,last_name,manager,title,salary,department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// function to add department
function addDept() {
  // prompt for info about the department
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department that you want to add?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new department into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.department,
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // display the new list of departments and re-prompt the user.
          viewDept()
        }
      );
    });
}
// function to add role
function addRole() {
  // prompt for info about the role
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role that you want to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the role that you want to add?"
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department_id for the role that you want to add?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function(err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
          // display the new list of roles and re-prompt the user.
          viewRole()
        }
      );
    });
}
// function to add employee
function addEmp() {
  connection.query("SELECT first_name,last_name FROM role JOIN employee ON employee.role_id = role.id WHERE title = 'Sales Manager' OR title = 'Marketing Manager' or title = 'Engineering Manager';", function(err, res) {
    if (err) throw err;

// prompt for info about the employee
    inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee that you want to add?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee that you want to add?"
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role_id for the employee that you want to add?"
      },
      {
        name: "manager",
        type: "list",
        choices: res.map((manager) => manager.first_name + " " + manager.last_name),
      },
    ])
    .then(function(answer) {

      // when finished prompting, insert a new employee into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager: answer.manager,
        },
        function(err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
          // display the new list of roles and re-prompt the user.
          viewEmp()
        }
      );
    });
 }); 

  
}
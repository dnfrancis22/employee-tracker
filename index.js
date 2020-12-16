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
  connection.query("SELECT first_name,last_name,manager,title,salary,name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
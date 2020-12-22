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

// function which prompts the user for what action they want to take
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
        "End",
      ],
    })
    .then(function (answer) {
      // the switch case calls the function based on the users answer
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
// function that allows the user to view all of the departments
function viewDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// function that allows the user to view all of the roles
function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// function that allows the user to view all of the employees
function viewEmp() {
  connection.query(
    "SELECT employee.id,first_name,last_name,manager,title,salary,department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
// function to add a department
function addDept() {
  // prompt the user for info about the department
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department that you want to add?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new department into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          // display the new list of departments and re-prompt the user.
          viewDept();
        }
      );
    });
}
// function to add a role
function addRole() {
  // prompt the user for info about the role
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role that you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the role that you want to add?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department_id for the role that you want to add?",
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new role into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your role was created successfully!");
          // display the new list of roles and re-prompt the user.
          viewRole();
        }
      );
    });
}
// function to add an employee
function addEmp() {
  // a query that will provide a list of managers for the user to choose from
  connection.query(
    "SELECT first_name,last_name,role_id,title FROM role JOIN employee ON employee.role_id = role.id WHERE title = 'Sales Manager' OR title = 'Marketing Manager' or title = 'Engineering Manager';",
    function (err, res) {
      if (err) throw err;

      // prompt the user for info about the employee
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message:
              "What is the first name of the employee that you want to add?",
          },
          {
            name: "last_name",
            type: "input",
            message:
              "What is the last name of the employee that you want to add?",
          },
          {
            name: "role_id",
            type: "input",
            message:
              "What is the role id of the employee that you want to add?",
          },
          {
            name: "manager",
            type: "list",
            message: "Choose the manager of the employee that you want to add?",
            // res.map takes the object that was returned from the query and converts it to a string of choices.
            choices: res.map(
              (manager) => manager.first_name + " " + manager.last_name
            ),
          },
        ])
        .then(function (answer) {
          // when finished prompting, insert a new employee into the db with that info
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager: answer.manager,
            },
            function (err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              // display the new list of employees and re-prompt the user.
              viewEmp();
            }
          );
        });
    }
  );
}
// function to update an employees role
function updateEmp() {
  connection.query(
    "SELECT first_name,last_name FROM employee;",
    function (err, res) {
      if (err) throw err;

      // prompt for info about the employee
      inquirer
        .prompt([
          {
            name: "employeeId",
            type: "input",
            message: "What is the id of the employee that you want to update?",
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the new role id?",
          },
        ])
        .then(function (answer) {
          // when finished prompting, update the employee's role in the db with that info
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.role_id,
              },
              {
                id: answer.employeeId,
              },
            ],
            function (err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              // display the new list of employees and re-prompt the user.
              viewEmp();
            }
          );
        });
    }
  );
}
// this functions ends the connection.
function end() {
  console.log("Your session has ended.");
  connection.end();
}
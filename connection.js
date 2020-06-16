const mysql = require("mysql");
const { prompt } = require("inquirer");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`connected as id ${connection.threadId}`);
  selectMenu();
});

// Need Select menu prompt to trigger what task a user is trying to do

const selectMenu = () => {
  prompt({
    type: "list",
    name: "selection",
    message: "Select an option",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Departments",
      "View Roles",
      "View Employees",
      "Quit",
    ],
  }).then(({ selection }) => {
    if (selection === "Add Department") {
      addDepartment();
    } else if (selection === "Add Role") {
      addRole();
    } else if (selection === "Add Employee") {
      addEmployee();
    } else if (selection === "View Departments") {
      viewDepartments();
    } else if (selection === "View Roles") {
      viewRoles();
    } else if (selection === "View Employees") {
      viewEmployees();
    } else {
      quit();
    }
  });
};

const addDepartment = () => {
  prompt({
    type: "input",
    name: "dName",
    message: "Enter a new department name",
  }).then(({ dName }) => {
    connection.query(
      "INSERT INTO department SET ?",
      {
        name: dName,
      },
      (err) => {
        if (err) {
          throw err;
        }
        console.log("Department Added");
        selectMenu();
      }
    );
  });
};

const addRole = () => {
  prompt([
    {
      type: "input",
      name: "rTitle",
      message: "Enter new role title",
    },
    {
      type: "input",
      name: "rSalary",
      message: "Enter salary for role",
    },
    {
      type: "input",
      name: "rDepartmentID",
      message: "Enter Department ID for role",
    },
  ]).then(({ rTitle, rSalary, rDepartmentID }) => {
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: rTitle,
        salary: rSalary,
        department_id: rDepartmentID,
      },
      (err) => {
        if (err) {
          throw err;
        }
        console.log("Role Added");
        selectMenu();
      }
    );
  });
};

const addEmployee = () => {
  prompt([
    {
      type: "input",
      name: "eFirstName",
      message: "Enter employee first name",
    },
    {
      type: "input",
      name: "eLastName",
      message: "Enter employee last name",
    },
    {
      type: "input",
      name: "eRoleID",
      message: "Enter role ID for employee",
    },
    {
      type: "input",
      name: "eManagerID",
      message: "Enter Manager ID for employee",
    },
  ]).then(({ eFirstName, eLastName, eRoleID, eManagerID }) => {
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: eFirstName,
        last_name: eLastName,
        role_id: eRoleID,
        manager_id: eManagerID,
      },
      (err) => {
        if (err) {
          throw err;
        }
        console.log("Employee Added");
        selectMenu();
      }
    );
  });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM employee_tracker.department", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const viewRoles = () => {
  connection.query("SELECT * FROM employee_tracker.role", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee_tracker.employee", (err, res) => {
    console.table(res);
    selectMenu();
  });
};

const quit = () => {
  connection.end();
};

// MINIMUM REQUIREMENTS
//  * Add departments, roles, employees
//  * View departments, roles, employees
//  * Update employee roles

// BONUS FEATURES
// * Update employee managers
// * View employees by manager
// * Delete departments, roles, and employees
// * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

// NPM PACKAGES
// * inquirer (installed)
// * mysql (installed)
// * dotenv (installed)
// * console.table (installed)

// SCHEMA
// * DEPARTMENT TABLE (DONE)
// * ROLE (DONE)
// * EMPLOYEE (DONE)

//  SEEDS
//  PRE-POPULATE DB (Done)

//  OTHER THINGS TO CONSIDER
// CLASS FOR SQL QUERIES
// USE SQL JOIN
// CLASS FOR INQUIRER QUESTIONS(?)

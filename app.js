const Queries = require("./lib/Queries");

const { prompt } = require("inquirer");
const { mOptions } = require('./lib/prompts');

const selectMenu = () => {
    prompt(mOptions).then(({ selection }) => {
        if (selection === "Add Department") {
            Queries.addDepartment();
        } else if (selection === "Add Role") {
            Queries.addRole();
        } else if (selection === "Add Employee") {
            Queries.addEmployee();
        } else if (selection === "View Departments") {
            Queries.viewDepartments();
        } else if (selection === "View Roles") {
            Queries.viewRoles();
        } else if (selection === "View Employees") {
            Queries.viewEmployees();
        } else if (selection === "Update Employee") {
            Queries.updateEmployee();
        }
        else {
            Queries.quit();
        }
    });
};

selectMenu();

// Need Select menu prompt to trigger what task a user is trying to do

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

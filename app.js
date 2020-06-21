const Queries = require("./lib/Queries");

const { prompt } = require("inquirer");
const { mOptions, aDeptInput, aRoleInput, aEmpInput, uEmpInput } = require('./lib/prompts');


const selectMenu = () => {
    prompt(mOptions).then(({ selection }) => {
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
        } else if (selection === "Update Employee") {
            updateEmployee();
        }
        else {
            quit();
        }
    });
};

selectMenu();

const addDepartment = () => {
    prompt(aDeptInput).then(({ dName }) => {
        Queries.addDeptQuery(dName);
    });
};

const addRole = () => {
    prompt(aRoleInput).then(({ rTitle, rSalary, rDepartmentID }) => {
        Queries.addRoleQuery(rTitle, rSalary, rDepartmentID);
    });
};

const addEmployee = () => {
    prompt(aEmpInput).then(({ eFirstName, eLastName, eRoleID, eManagerID }) => {
        Queries.addEmpQuery(eFirstName, eLastName, eRoleID, eManagerID);
    });
}

const viewDepartments = () => {
    Queries.viewDeptQuery();
}

const viewRoles = () => {
    Queries.viewRoleQuery();
}

const viewEmployees = () => {
    Queries.viewEmpQuery();
}

const updateEmployee = () => {
    prompt(uEmpInput).then(({ updateRoleID, empUpdate }) => {
        Queries.updateEmployeeQuery(updateRoleID, empUpdate);
    });
}

const quit = () => {
    Queries.quitConnection();
}







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

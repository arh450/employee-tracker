const connection = require("./lib/connection");
const { mOptions, aDeptInput, aRoleInput, aEmpInput } = require("./lib/prompts")
const { prompt } = require("inquirer");



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
        } else {
            quit();
        }
    });
};

const addDepartment = () => {
    prompt(aDeptInput).then(({ dName }) => {
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
    prompt(aRoleInput).then(({ rTitle, rSalary, rDepartmentID }) => {
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
    prompt(aEmpInput).then(({ eFirstName, eLastName, eRoleID, eManagerID }) => {
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

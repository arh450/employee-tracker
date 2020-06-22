const Queries = require("./lib/Queries");
const cTable = require('console.table');
const { prompt } = require("inquirer");
const { mOptions, aDeptInput, aRoleInput, aEmpInput, dOptions, qOptions } = require('./lib/prompts');

// main select menu that allows user to make selection of what they want to do.
const selectMenu = () => {
    // see prompts.js for parameter info
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
            updateEmployeeRole();
        } else if (selection === "Delete Menu") {
            deleteMenu();
        } else {
            quit();
        }
    });
};

selectMenu();

// function that adds new department and then returns back to the select menu
const addDepartment = () => {
    // see prompts.js for parameter info
    prompt(aDeptInput).then(({ dName }) => {
        Queries.addDeptQuery(dName).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
};

// function that adds new role and then returns back to the select menu
const addRole = () => {
    // see prompts.js for parameter info
    prompt(aRoleInput).then(({ rTitle, rSalary, rDepartmentID }) => {
        Queries.addRoleQuery(rTitle, rSalary, rDepartmentID).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
};

// function that adds new employee and then returns back to the select menu
const addEmployee = () => {
    // see prompts.js for parameter info
    prompt(aEmpInput).then(({ eFirstName, eLastName, eRoleID, eManagerID }) => {
        Queries.addEmpQuery(eFirstName, eLastName, eRoleID, eManagerID).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
}

// function that returns a console.table of data from department table in employee_tracker DB and then returns back to select menu
const viewDepartments = () => {
    Queries.viewDeptQuery().then((res) => {
        console.log(`----------------------\n`);
        console.table(res)
        console.log(`----------------------\n`);
        setTimeout(() => {
            selectMenu();
        }, 1000);
    });
}

// function that returns a console.table of data from role table in employee_tracker DB and then returns back to select menu
const viewRoles = () => {
    Queries.viewRoleQuery().then((res) => {
        console.log(`----------------------\n`);
        console.table(res)
        console.log(`----------------------\n`);
        setTimeout(() => {
            selectMenu();
        }, 1000);
    });
}

// function that returns a console.table of data from employee table in employee_tracker DB and then returns back to select menu
const viewEmployees = () => {
    Queries.viewEmpQuery().then((res) => {
        console.log(`----------------------\n`);
        console.table(res);
        console.log(`----------------------\n`);
        setTimeout(() => {
            selectMenu();
        }, 1000);
    });
}

// function that calls updateEmpRoleQuery and then returns back to select menu
const updateEmployeeRole = () => {
    Queries.updateEmpRoleQuery().then((res) => {
        setTimeout(() => {
            selectMenu();
        }, 1000);
    });
}
//  function that allows user to make selection on table they want to remove data from
const deleteMenu = () => {
    // see prompts.js for parameter info
    prompt(dOptions).then(({ deleteSelection }) => {
        if (deleteSelection === "Departments") {
            deleteDepartment();
        } else if (deleteSelection === "Roles") {
            deleteRole();
        } else if (deleteSelection === "Employees") {
            deleteEmployee();
        } else {
            selectMenu();
        }
    });
}

// function that calls deleteDeptQuery and then viewDepartments function to return updated table to user
const deleteDepartment = () => {
    Queries.deleteDeptQuery().then((res) => {
        viewDepartments();
    });
}

// function that calls deleteRoleQuery and then viewRole function to return updated table to user
const deleteRole = () => {
    Queries.deleteRoleQuery().then((res) => {
        viewRoles();
    });
}

// function that calls deleteEmpQuery and then viewEmployees function to return updated table to user
const deleteEmployee = () => {
    Queries.deleteEmpQuery().then((res) => {
        viewEmployees();
    });
}

// function that ensures user wants to exit application and if not returns them back to select menu
const quit = () => {
    prompt(qOptions).then(({ yesNo }) => {
        if (yesNo === "Yes, I'm sure") {
            Queries.quitConnection();
        } else {
            selectMenu();
        }
    });

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

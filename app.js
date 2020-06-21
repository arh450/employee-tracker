const Queries = require("./lib/Queries");
const cTable = require('console.table');
const { prompt } = require("inquirer");
const { mOptions, aDeptInput, aRoleInput, aEmpInput, dOptions, qOptions } = require('./lib/prompts');


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
            updateEmployeeRole();
        } else if (selection === "Delete Menu") {
            deleteMenu();
        } else {
            quit();
        }
    });
};

selectMenu();

const addDepartment = () => {
    prompt(aDeptInput).then(({ dName }) => {
        Queries.addDeptQuery(dName).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
};

const addRole = () => {
    prompt(aRoleInput).then(({ rTitle, rSalary, rDepartmentID }) => {
        Queries.addRoleQuery(rTitle, rSalary, rDepartmentID).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
};

const addEmployee = () => {
    prompt(aEmpInput).then(({ eFirstName, eLastName, eRoleID, eManagerID }) => {
        Queries.addEmpQuery(eFirstName, eLastName, eRoleID, eManagerID).then((res) => {
            setTimeout(() => {
                selectMenu();
            }, 1000);
        });
    });
}

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

const updateEmployeeRole = () => {
    Queries.updateEmpRoleQuery().then((res) => {
        setTimeout(() => {
            selectMenu();
        }, 1000);
    });
}

const deleteMenu = () => {
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

const deleteDepartment = () => {
    Queries.deleteDeptQuery().then((res) => {
        viewDepartments();
    });
}

const deleteRole = () => {
    Queries.deleteRoleQuery().then((res) => {
        viewRoles();
    });
}

const deleteEmployee = () => {
    Queries.deleteEmpQuery().then((res) => {
        viewEmployees();
    });
}

const quit = () => {
    prompt(qOptions).then(({ yesNo }) => {
        if (yesNo === "Yes, I'm sure") {
            Queries.quitConnection();
        } else {
            selectMenu();
        }
    });

}



// .then((res) => {
//     console.log(`Deleted department successfully`);
//     console.table(viewDepartments());
//     setTimeout(() => {
//         selectMenu();
//     }, 1000);
// });
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

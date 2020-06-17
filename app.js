const connection = require("./connection");
const prompts = require("./prompts");

const { prompt } = require("inquirer");


const selectMenu = () => {
    prompt(prompts.mOptions).then(({ selection }) => {
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

selectMenu();
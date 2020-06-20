const connection = require("./connection");


const { prompt } = require("inquirer");
const { aDeptInput, aRoleInput, aEmpInput, uEmpInput } = require("./prompts");


class Queries {
    constructor(connection) {
        this.connection = connection;
    }

    addDepartment() {
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
                }
            );
        });
    };

    addRole() {
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
                }
            );
        });
    };


    addEmployee() {
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
                }
            );
        });
    };

    viewDepartments() {
        connection.query("SELECT * FROM employee_tracker.department", (err, res) => {
            if (err) throw (err);
            console.table(res);
        });
    }

    viewRoles() {
        connection.query("SELECT * FROM employee_tracker.role", (err, res) => {
            if (err) throw (err);
            console.table(res);

        });
    }

    viewEmployees() {
        connection.query("SELECT * FROM employee_tracker.employee", (err, res) => {
            if (err) throw (err);
            console.table(res);
        });
    }

    updateEmployee() {
        prompt(uEmpInput).then(({ updateRoleID, empUpdate }) => {
            connection.query(
                "UPDATE employee_tracker.employee SET role_id=? WHERE last_name=?",
                [updateRoleID, empUpdate], (err, res) => {
                    if (err) throw (err);
                    console.table(this.viewEmployees());
                    console.log(`Updated role ID for employee ${empUpdate}`);
                });
        });
    };


    quit() {
        connection.end();
    }


};

module.exports = new Queries;
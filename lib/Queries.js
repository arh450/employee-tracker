const connection = require("./connection");

const { prompt } = require("inquirer");
const { aDeptInput, aRoleInput, aEmpInput } = require("./prompts");


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









};

module.exports = new Queries;
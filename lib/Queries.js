const connection = require("./connection");


const { prompt } = require("inquirer");
const { aDeptInput, aRoleInput, aEmpInput, uEmpInput } = require("./prompts");


class Queries {
    constructor(connection) {
        this.connection = connection;
    }

    addDeptQuery(dName) {
        return connection.query(
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
    }

    addRoleQuery(rTitle, rSalary, rDepartmentID) {
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
    };


    addEmpQuery(eFirstName, eLastName, eRoleID, eManagerID) {
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
    };

    viewDeptQuery() {
        connection.query("SELECT * FROM employee_tracker.department", (err, res) => {
            if (err) throw (err);
            console.table(res);
        });
    }

    viewRoleQuery() {
        connection.query("SELECT * FROM employee_tracker.role", (err, res) => {
            if (err) throw (err);
            console.table(res);

        });
    }

    viewEmpQuery() {
        connection.query("SELECT * FROM employee_tracker.employee", (err, res) => {
            if (err) throw (err);
            console.table(res);
        });
    }

    updateEmployeeQuery(updateRoleID, empUpdate) {
        connection.query(
            "UPDATE employee_tracker.employee SET role_id=? WHERE last_name=?",
            [updateRoleID, empUpdate], (err, res) => {
                if (err) throw (err);
                console.table(this.viewEmpQuery());
                console.log(`Updated role ID for employee ${empUpdate}`);
            });
    };


    quitConnection() {
        connection.end();
    }


};

module.exports = new Queries;
const connection = require("./connection");

class Queries {
    constructor(connection) {
        this.connection = connection;
    }

    addDeptQuery(dName) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: dName,
                },
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(console.log(`Department ${dName} Added`));
                }
            );
        });
    }

    addRoleQuery(rTitle, rSalary, rDepartmentID) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: rTitle,
                    salary: rSalary,
                    department_id: rDepartmentID,
                },
                (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(console.log(`Role ${rTitle} Added`));
                }
            );
        });
    };


    addEmpQuery(eFirstName, eLastName, eRoleID, eManagerID) {
        return new Promise((resolve, reject) => {
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
                        reject(err);
                    }
                    resolve(console.log(`Employee ${eFirstName} ${eLastName} Added`));
                }
            );
        });
    };

    viewDeptQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee_tracker.department", (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    viewRoleQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee_tracker.role", (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    viewEmpQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee_tracker.employee", (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    updateEmployeeQuery(updateRoleID, empUpdate) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE employee_tracker.employee SET role_id=? WHERE last_name=?",
                [updateRoleID, empUpdate], (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(this.viewEmpQuery(res));
                });
        });
    };


    quitConnection() {
        connection.end();
    }


};

module.exports = new Queries;
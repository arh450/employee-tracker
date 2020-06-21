const connection = require("./connection");
const { prompt } = require("inquirer");


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
                    resolve(console.log(`${dName} Department Added`));
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
                    resolve(console.log(`${rTitle} Role Added`));
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

    deleteDeptQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM department", (err, res) => {
                prompt([
                    {
                        type: "list",
                        name: "chooseDept",
                        message: "Select department to be deleted",
                        choices: () => {
                            const deptArr = [];
                            res.forEach((department) => {
                                deptArr.push(department.name);
                            });
                            return deptArr;
                        }
                    }
                ]).then(({ chooseDept }) => {
                    connection.query("DELETE FROM department WHERE ?", {
                        name: chooseDept
                    }, ((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(console.log(`${chooseDept} Department Deleted`));
                    })
                    );
                });
            });
        });
    }

    deleteRoleQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role", (err, res) => {
                prompt([
                    {
                        type: "list",
                        name: "chooseRole",
                        message: "Select role to be deleted",
                        choices: () => {
                            const roleArr = [];
                            res.forEach((role) => {
                                roleArr.push(role.title);
                            });
                            return roleArr;
                        }
                    }
                ]).then(({ chooseRole }) => {
                    connection.query("DELETE FROM role WHERE ?", {
                        title: chooseRole
                    }, ((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(console.log(`${chooseRole} Role Deleted`));
                    })
                    );
                });
            });
        });
    }

    deleteEmpQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employee", (err, res) => {
                prompt([
                    {
                        type: "list",
                        name: "chooseEmployee",
                        message: "Select employee to be deleted",
                        choices: () => {
                            const employeeArr = [];
                            res.forEach((employee) => {
                                employeeArr.push(employee.last_name);
                            });
                            return employeeArr;
                        }
                    }
                ]).then(({ chooseEmployee }) => {
                    connection.query("DELETE FROM employee WHERE ?", {
                        last_name: chooseEmployee
                    }, ((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(console.log(`${chooseEmployee} Employee Deleted`));
                    })
                    );
                });
            });
        });
    }












    quitConnection() {
        connection.end();
    }


};

module.exports = new Queries;
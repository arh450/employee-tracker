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
        const allEmployeeArray = [];
        return new Promise((resolve, reject) => {
            connection.query("SELECT employee.id, first_name, last_name, role_id, manager_id, title, salary, name FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", (err, res) => {

                const employeeArray = [];

                res.forEach((employee) => {
                    employeeArray.push(employee.id);
                    employeeArray.push(employee.first_name);
                    employeeArray.push(employee.last_name);
                    employeeArray.push(employee.title);
                    employeeArray.push(employee.salary);
                    employeeArray.push(employee.name);

                    allEmployeeArray.push(employeeArray);
                });
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    updateEmpRoleQuery(updateRoleID, empUpdate) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT employee.id, first_name, last_name, role_id, manager_id, title, salary, name FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (department.id = role.department_id)", (err, res) => {
                if (err) throw (err);
                prompt([
                    {
                        type: "list",
                        name: "chooseName",
                        message: "Select employee to have role updated",
                        choices: () => {
                            const lNameArray = [];
                            res.forEach((employee) => {
                                lNameArray.push(employee.last_name);
                            });
                            return lNameArray;
                        },
                    },
                    {
                        type: "list",
                        name: "chooseRole",
                        choices: () => {
                            const rolesArray = [];
                            res.forEach((role) => {
                                rolesArray.push(role.title);
                            });
                            return rolesArray;
                        }
                    }
                ]).then(({ chooseName, chooseRole }) => {
                    let selection;
                    res.forEach((roleChoice) => {
                        if (roleChoice.title === chooseRole) {
                            selection = roleChoice;
                        }
                    });

                    connection.query("UPDATE employee SET ? WHERE ?", [
                        {
                            role_id: selection.id,
                        },
                        {
                            last_name: chooseName
                        }
                    ], (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(console.table(res));
                    });
                });
            })

        });
    };

    deleteDeptQuery() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw (err);
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
                if (err) throw (err);
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
                if (err) throw (err);
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
const connection = require("./connection");
const { prompt } = require("inquirer");


class Queries {
    constructor(connection) {
        this.connection = connection;
    }

    // Query that takes in user input (dName from prompts.js to be used on app.js) and adds new department to the database
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
                    console.log(`----------------------\n`);
                    resolve(console.log(`${dName} Department Added\n`));
                    console.log(`----------------------\n`);
                }
            );
        });
    }

    // Query that takes in user input (rTitle, rSalary, rDepartmentID from prompts.js to be used on app.js) and adds new role to the database
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
                    console.log(`----------------------\n`);
                    resolve(console.log(`${rTitle} Role Added\n`));
                    console.log(`----------------------\n`);
                }
            );
        });
    };

    // Query that takes in user input (eFirstName, eLastName, eRoleID, eManagerID from prompts.js to be used on app.js) and adds new employee to the database
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
                    console.log(`----------------------\n`);
                    resolve(console.log(`Employee ${eFirstName} ${eLastName} Added\n`));
                    console.log(`----------------------\n`);
                }
            );
        });
    };

    // Query to select all data from department table in employee_tracker database (will be called on in app.js to return console.table of data)
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

    // Query to select all data from role table in employee_tracker database (will be called on in app.js to return console.table of data)
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

    // Query that using LEFT JOIN joins title and salary from role table and name from department table. Used in app.js to return console.table with employee data.
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

    // Using same LEFT join query detailed in viewEmpQuery a user is returned a list of employees last names using inquirer.  When a last name is select another list is returned using inquirer with the role names the employee can be updated with.  The employee's role in the database is then updated based on the role selected by the user.
    updateEmpRoleQuery() {
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
                        console.log(`----------------------\n`);
                        resolve(console.log(`Updated employee ${chooseName} to ${chooseRole} role \n`));
                        console.log(`----------------------\n`);

                    });
                });
            })

        });
    };

    // Query that returns all department names from department table as a list using inquirer. When a user selects a department, it is removed from the database based on the name of the department.
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
                        console.log(`----------------------\n`);
                        resolve(console.log(`${chooseDept} Department Deleted\n`));
                        console.log(`----------------------\n`);
                    })
                    );
                });
            });
        });
    }

    // Query that returns all role titles from role table as a list using inquirer. When a user selects a role, it is removed from the database based on the title of the role.
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
                        console.log(`----------------------\n`);
                        resolve(console.log(`${chooseRole} Role Deleted\n`));
                        console.log(`----------------------\n`);
                    })
                    );
                });
            });
        });
    }

    // Query that returns all employee last names from employee table as a list using inquirer. When a user selects an employee, it is removed from the database based on the last_name of the employee.
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
                        console.log(`----------------------\n`);
                        resolve(console.log(`${chooseEmployee} Employee Deleted\n`));
                        console.log(`----------------------\n`);
                    })
                    );
                });
            });
        });
    }

    // Method to end connection with MySQL database
    quitConnection() {
        connection.end();
    }


};

module.exports = new Queries;
const cTable = require('console.table');
const inquirer = require('inquirer');
const Database = require("./lib/Database");
const { createDepartment } = require('./lib/Database');


function selectMenu() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Departments",
            "View Roles",
            "View Employees",
            "Update Employee Role",
            "Quit",

        ]
    }).then((input) => {
        console.log(`You selected ${input.selection}`);

        if (input.selection === "Add Department") {
            addDepartment();
        }


    })

}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Enter a new department",
        name: "departmentName"
    }).then((input) => {
        createDepartment(input);
        selectMenu();
    });
}



module.exports = {
    selectMenu: selectMenu,
    addDepartment: addDepartment
}
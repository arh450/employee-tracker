const mysql = require('mysql');
require("dotenv").config();

const cTable = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        throw (err);
    }
    console.log(`connected as id ${connection.threadId}`);

});


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
    //  PRE-POPULATE DB

//  OTHER THINGS TO CONSIDER
    // CLASS FOR SQL QUERIES
    // USE SQL JOIN
    // CLASS FOR INQUIRER QUESTIONS(?)


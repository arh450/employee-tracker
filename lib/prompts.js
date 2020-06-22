// Prompt parameters for selectMenu()
const mOptions = {
    type: "list",
    name: "selection",
    message: "Select an option",
    choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee",
        "Delete Menu",
        "Quit"
    ]
}
// Prompt parameters for addDepartment()
const aDeptInput =
{
    type: "input",
    name: "dName",
    message: "Enter a new department name",
    validate: (dName) => {
        if (dName !== "") {
            return true;
        } else {
            return ("Please enter a valid name for department");
        }
    }
}
// Prompt parameters for addRole()
const aRoleInput = [

    {
        type: "input",
        name: "rTitle",
        message: "Enter new role title",
        validate: (rTitle) => {
            if (rTitle !== "") {
                return true;
            } else {
                return ("Please enter a valid title for role");
            }
        }
    },
    {
        type: "input",
        name: "rSalary",
        message: "Enter salary for role",
        validate: (rSalary) => {
            const validNumber = rSalary.match(/^[1-9]\d*$/);
            if (validNumber) {
                return true;
            } else {
                return ("Please enter a valid number for role salary");
            }
        }
    },
    {
        type: "input",
        name: "rDepartmentID",
        message: "Enter Department ID for role",
        validate: (rDepartmentID) => {
            const validNumber = rDepartmentID.match(/^[1-9]\d*$/);
            if (validNumber) {
                return true;
            } else {
                return ("Please enter a valid number for department ID");
            }
        }
    },

]
// Prompt parameters for addEmployee()
const aEmpInput = [

    {
        type: "input",
        name: "eFirstName",
        message: "Enter employee first name",
        validate: (eFirstName) => {
            if (eFirstName !== "") {
                return true;
            } else {
                return ("Please enter a valid first name for employee");
            }
        }
    },
    {
        type: "input",
        name: "eLastName",
        message: "Enter employee last name",
        validate: (eLastName) => {
            if (eLastName !== "") {
                return true;
            } else {
                return ("Please enter a valid last name for employee");
            }
        }
    },
    {
        type: "input",
        name: "eRoleID",
        message: "Enter role ID for employee",
        validate: (eRoleID) => {
            const validNumber = eRoleID.match(/^[1-9]\d*$/);
            if (validNumber) {
                return true;
            } else {
                return ("Please enter a valid number for role ID");
            }
        }
    },
    {
        type: "input",
        name: "eManagerID",
        message: "Enter Manager ID for employee",
        validate: (rManagerID) => {
            const validNumber = rManagerID.match(/^[1-9]\d*$/);
            if (validNumber) {
                return true;
            } else {
                return ("Please enter a valid number for manager ID");
            }
        }
    },

]
// Prompt parameters for deleteMenu()
const dOptions = {
    type: "list",
    name: "deleteSelection",
    message: "Select division to delete from",
    choices: [
        "Departments",
        "Roles",
        "Employees",
        "Return to Select Menu",
    ]
}
// Prompt parameters for quit()
const qOptions = {
    type: "list",
    name: "yesNo",
    message: "Are you sure you want to quit?",
    choices: [
        "Yes, I'm sure",
        "No, take me back"
    ]
}

module.exports = {
    mOptions: mOptions,
    aDeptInput: aDeptInput,
    aRoleInput: aRoleInput,
    aEmpInput: aEmpInput,
    dOptions: dOptions,
    qOptions: qOptions
}


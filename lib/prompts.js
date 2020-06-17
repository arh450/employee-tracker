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
        "Quit",
    ]
}

const aDeptInput =
{
    type: "input",
    name: "dName",
    message: "Enter a new department name",
}

const aRoleInput = [

    {
        type: "input",
        name: "rTitle",
        message: "Enter new role title",
    },
    {
        type: "input",
        name: "rSalary",
        message: "Enter salary for role",
    },
    {
        type: "input",
        name: "rDepartmentID",
        message: "Enter Department ID for role",
    },

]

const aEmpInput = [

    {
        type: "input",
        name: "eFirstName",
        message: "Enter employee first name",
    },
    {
        type: "input",
        name: "eLastName",
        message: "Enter employee last name",
    },
    {
        type: "input",
        name: "eRoleID",
        message: "Enter role ID for employee",
    },
    {
        type: "input",
        name: "eManagerID",
        message: "Enter Manager ID for employee",
    },

]

module.exports = {
    mOptions: mOptions,
    aDeptInput: aDeptInput,
    aRoleInput: aRoleInput,
    aEmpInput: aEmpInput
}
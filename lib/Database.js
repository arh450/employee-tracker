const connection = require("./connection");

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    createDepartment() {
        return this.connection.query(
            "INSERT INTO (name) VALUES (?)", [input.departmentName], (err, res) => {
                if (err) {
                    throw (err);
                }
                console.table(res);
            }
        );
    }

    createRole() {
        return this.connection.query(

        );

    }

    createEmployee() {
        return this.connection.query(

        );

    }



}

module.exports = new Database;


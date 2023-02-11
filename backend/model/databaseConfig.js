const mysql = require("mysql2");

var db = {};

// Advanced feature during create connection: allow for multiple SQL statements with "multipleStatements:true"
db.getConnection = () => {
    var conn = mysql.createConnection({
        host: "localhost",
        // host: "localhost",
        user: "jiayi123",
        password: "jiayi123^",
        database: "bdd_ca1",
        multipleStatements: true
    })
    return conn;
}

module.exports = db;

// local
// host: "localhost",
// database: "bdd_ca1",

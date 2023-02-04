const mysql = require("mysql2");

var db = {};

// Advanced feature during create connection: allow for multiple SQL statements with "multipleStatements:true"
db.getConnection = () => {
    var conn = mysql.createConnection({
        host: "bdd-ca2.cpmtggycmqa3.us-east-1.rds.amazonaws.com",
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
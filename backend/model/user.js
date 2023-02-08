const db = require("./databaseConfig");

const bcrypt = require("bcrypt"); // To encrypt user password

var userDB = {};

// Get movie by Index
userDB.getUser = (email, password, callback) => {
    // 1. Get the connection
    var conn = db.getConnection();

    // 2. Specify SQL string/statement
    var sqlStmt = "SELECT * FROM bdd_ca1.user";

    // 3. Execute query-connection
    conn.query(sqlStmt, [], (err, result) => {
        //4. End connection
        conn.end();
        // 5. React to error or result state/object
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}


// Create new user
userDB.createUser = (userDetails, hash, callback) => {

    //1 - Get the connection
    var conn = db.getConnection();

    //2 - Specify SQL string/statement
    var sqlStmt = "INSERT INTO bdd_ca1.user (Email, Name, Role, Password) VALUES (?,?,?,?);";

    //3 - Execute query-connection
    conn.query(sqlStmt, [userDetails.email, userDetails.name, userDetails.role, hash], (err, result) => {
        //4 - End connection
        conn.end();

        //5 - React to error or result state/object
        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            return callback(null, result);

        }
    })
}

// Authenticate if the token provided by user matches the database
userDB.authenticate = (email, callback) => {
    var conn = db.getConnection();
    // Email is unique, so no need check against password
    var sqlStmt = "SELECT * FROM bdd_ca1.user WHERE LOWER(Email) = ?";

    conn.query(sqlStmt, [email.toLowerCase()], (err, result) => {
        conn.end();

        if (err) {
            console.log(err);
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}

module.exports = userDB;

// Tutorial for Hashing strings in NodeJs: https://sebhastian.com/bcrypt-node/
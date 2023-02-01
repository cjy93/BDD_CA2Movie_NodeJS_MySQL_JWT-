const db = require("./databaseConfig");

var genreDB = {};


// Get all movies
genreDB.getAllGenre = (limit, offset, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    var sqlStmt = "SELECT * from bdd_ca1.genre LIMIT ? OFFSET ?";

    // 3. Execute query-connection
    conn.query(sqlStmt, [limit, offset], (err, result) => {
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



// Get Genre by Index
genreDB.getGenreById = (id, callback) => {
    // 1. Get the connection
    var conn = db.getConnection();

    // 2. Specify SQL string/statement
    var sqlStmt = "SELECT * FROM bdd_ca1.genre WHERE genreId = ?";

    // 3. Execute query-connection
    conn.query(sqlStmt, [id], (err, result) => {
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

// Create new movies
genreDB.createGenre = (genreDetails, callback) => {
    //1 - Get the connection
    var conn = db.getConnection();

    //2 - Specify SQL string/statement
    var sqlStmt = "INSERT INTO bdd_ca1.genre (`name`, `description`) VALUES (?,?);";

    //3 - Execute query-connection
    conn.query(sqlStmt, [genreDetails.name, genreDetails.description], (err, result) => {
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

// Delete Genre
// As movies have a foreign key to "genreId" in genre table. if you delete a genreId, the effect will cascade to the movie table.
genreDB.deleteGenre = (genre_id, callback) => {
    //1 - Get the connection
    var conn = db.getConnection();

    //2 - Specify SQL string/statement (Multiple statements)
    var sqlStmt = "insert into bdd_ca1.log_deletegenres SELECT * from bdd_ca1.genre g WHERE g.genreId=?; DELETE FROM bdd_ca1.genre WHERE genreId = ?;";

    //3 - Execute query-connection
    conn.query(sqlStmt, [genre_id, genre_id], (err, result) => {
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



module.exports = genreDB;
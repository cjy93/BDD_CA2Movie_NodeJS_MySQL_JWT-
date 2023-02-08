const db = require("./databaseConfig");

var movieDB = {};


// Get all movies
movieDB.getAllMovies = (limit, offset, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    // var sqlStmt = "SELECT * from bdd_ca1.movie LIMIT ? OFFSET ?";
    var sqlStmt = "SELECT m.movieID,m.name AS movie_name,m.description as movie_description,m.Release_Date,m.Image_URL,m.GenreId,g.name AS genre_name, g.description AS genre_description,m.Active,m.DateInserted FROM bdd_ca1.movie m, bdd_ca1.genre g WHERE m.GenreId=g.genreId ORDER BY m.movieID ASC LIMIT ? OFFSET ?";

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

// Get all movies for the frontend app, output without amalgamation with genre details
movieDB.getAllMoviesForApp = (limit, offset, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    // var sqlStmt = "SELECT * from bdd_ca1.movie LIMIT ? OFFSET ?";
    var sqlStmt = "SELECT * FROM bdd_ca1.movie ORDER BY movieID ASC LIMIT ? OFFSET ?";

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

// Get all ACTIVE movies
movieDB.getActiveMovies = (limit, offset, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    var sqlStmt = "SELECT m.movieID,m.name AS movie_name,m.description as movie_description,m.Release_Date,m.Image_URL,m.GenreId,g.name AS genre_name, g.description AS genre_description,m.Active,m.DateInserted FROM bdd_ca1.movie m, bdd_ca1.genre g WHERE Active='Y' AND m.GenreId=g.genreId ";

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

// Get movies by substring of the movie name
movieDB.getMovieBySubstring = (substring, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    var sqlStmt = "SELECT m.movieID,m.name AS movie_name,m.description as movie_description,m.Release_Date,m.Image_URL,m.GenreId,g.name AS genre_name, g.description AS genre_description,m.Active,m.DateInserted, m.* FROM bdd_ca1.movie m, bdd_ca1.genre g WHERE m.name LIKE '%" + substring + "%' AND m.GenreId=g.genreId  ORDER BY Release_Date ASC";

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

// Get movies by genreId
movieDB.getMovieByGenreId = (genreid, callback) => {
    // 1. Get SQL connection
    var conn = db.getConnection();

    // 2. Specify the SQL string/statement
    var sqlStmt = "SELECT m.movieID,m.name AS movie_name,m.description as movie_description,m.Release_Date,m.Image_URL,m.GenreId,g.name AS genre_name, g.description AS genre_description,m.Active,m.DateInserted FROM bdd_ca1.movie m, bdd_ca1.genre g WHERE m.GenreId=? AND m.GenreId=g.genreId  ORDER BY Release_Date ASC";

    // 3. Execute query-connection
    conn.query(sqlStmt, [genreid], (err, result) => {
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

// Get movie by Index
movieDB.getMovieById = (id, callback) => {
    // 1. Get the connection
    var conn = db.getConnection();

    // // 2. Specify SQL string/statement
    // var sqlStmt = "SELECT * FROM bdd_ca1.movie WHERE movieID = ?  ORDER BY Release_Date ASC";
    var sqlStmt = "SELECT m.movieID,m.name AS movie_name,m.description as movie_description,m.Release_Date,m.Image_URL,m.GenreId,g.name AS genre_name, g.description AS genre_description,m.Active,m.DateInserted, m.* FROM bdd_ca1.movie m, bdd_ca1.genre g WHERE m.movieID = ? AND m.GenreId=g.genreId  ORDER BY m.Release_Date ASC";

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
movieDB.createMovie = (movieDetails, callback) => {
    //1 - Get the connection
    var conn = db.getConnection();

    console.log(movieDetails);
    //2 - Specify SQL string/statement
    var sqlStmt = "INSERT INTO bdd_ca1.movie (`name`, `description`,`Release_Date`, `Image_URL`, `GenreId`, `Active`, `imdb`,`links`) VALUES (?,?,?,?,?,?,?,?);";

    //3 - Execute query-connection
    conn.query(sqlStmt, [movieDetails.name, movieDetails.description, movieDetails.Release_Date, movieDetails.Image_URL, movieDetails.GenreId, movieDetails.Active, movieDetails.imdb, movieDetails.links], (err, result) => {
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

// Update existing movies on "movie" table and add this previous record to "log_updatemovies" table in MySQL
movieDB.updateMovie = (movieDetails, movie_id, callback) => {
    //1 - Get the connection
    var conn = db.getConnection();

    //2 - Specify SQL string/statement (Multiple statements)
    var sqlStmt = "insert into bdd_ca1.log_updatemovies SELECT * from bdd_ca1.movie m WHERE m.movieID=?; UPDATE bdd_ca1.movie SET name = ?, description = ?, Release_Date=?, Image_URL=?, GenreId=?, Active=?, year=?, runtime=?, actor1=?, actor2=?, actor3=?, actor4=?, actor1_pic=?, actor2_pic=?, actor3_pic=?, actor4_pic=? WHERE (movieID = ?);    ";

    //3 - Execute query-connection
    conn.query(sqlStmt, [movie_id, movieDetails.name, movieDetails.description, movieDetails.Release_Date, movieDetails.Image_URL, movieDetails.GenreId, movieDetails.Active, movieDetails.year,
        movieDetails.runtime,
        movieDetails.actor1, movieDetails.actor2, movieDetails.actor3, movieDetails.actor4, movieDetails.actor1_pic, movieDetails.actor2_pic, movieDetails.actor3_pic, movieDetails.actor4_pic,
        movie_id], (err, result) => {
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

// Delete movies
movieDB.deleteMovie = (movie_id, callback) => {
    //1 - Get the connection
    var conn = db.getConnection();

    //2 - Specify SQL string/statement (Multiple statements)
    var sqlStmt = "insert into bdd_ca1.log_deletemovies SELECT * from bdd_ca1.movie m WHERE m.movieID=?; DELETE FROM bdd_ca1.movie WHERE movieID = ?;";

    //3 - Execute query-connection
    conn.query(sqlStmt, [movie_id, movie_id], (err, result) => {
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




module.exports = movieDB;
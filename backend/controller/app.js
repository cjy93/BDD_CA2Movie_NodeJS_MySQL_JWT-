const express = require("express");
const cors = require("cors");

const userDB = require("../model/user")
const movieDB = require("../model/movie")
const genreDB = require("../model/genre")
// for encrypt and decrypt password, we bring the model part of it to app
const bcrypt = require("bcrypt"); // To encrypt user password
const jwt = require("jsonwebtoken");
const validator = require("validator");
const sign_key = "abc123";

var app = express();


/* MIDDLEWARE */
app.use(express.json()); //[0e 3f ...] -> {"username":....}
// enable ALL CORS origins to use ALL APIs
app.use(cors());

// Custom middleware to verify the JWT Authentication
function verifyToken(req, res, next) {
    var token = req.headers.authorization;

    if (!token || !token.includes("Bearer ")) {
        res.status(403).send({ "message": "Authorization token not found" });
    } else {
        token = token.split("Bearer ")[1];
        jwt.verify(token, sign_key, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(500).send({ "message": "Invalid token" });
            } else {
                req.auth = decoded;
                next();
            }
        })
    }
}

// Validate if email address given is a real email address format
function validate(req, res, next) {
    var email = req.body.email;

    if (validator.isEmail(email) && email.length >= 5) {
        next();
    } else {
        res.send({ message: "Wrong username format, not email - validator" })
    }
}

/* ROUTERS */
//////////////////// MOVIE
// get all movies
app.get("/movie", (req, res) => {
    // GET /movie?limit=###&offset=###
    var limit = 60;
    var offset = 0;
    if (req.query.limit != undefined) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.offset != undefined) {
        offset = parseInt(req.query.offset);
    }

    movieDB.getAllMovies(limit, offset, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// Get all Active movies
app.get("/movie/active", (req, res) => {
    // GET /movie/Active?limit=###&offset=###
    var limit = 60;
    var offset = 0;
    if (req.query.limit != undefined) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.offset != undefined) {
        offset = parseInt(req.query.offset);
    }

    movieDB.getActiveMovies(limit, offset, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })

})

// Get movies by the substring of movie name
app.get("/movie/substring/:subString", (req, res) => {
    movieDB.getMovieBySubstring(req.params.subString, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// Get movies by the GenreId
app.get("/movie/genreid/:id", (req, res) => {
    movieDB.getMovieByGenreId(req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// Get movies by ID
app.get("/movie/:id", (req, res) => {
    movieDB.getMovieById(req.params.id, (err, result) => {
        if (err) {
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            if (result.length == 0) {
                res.status(404);
                res.send({ message: "no record found" })
            } else {
                res.status(200);
                res.send(result);
            }

        }
    })
})


// Create movie
app.post("/movie", verifyToken, (req, res) => {
    if (req.body.name == undefined || req.body.description == undefined || req.body.Release_Date == undefined || req.body.Image_URL == undefined || req.body.GenreId == undefined || req.body.Active == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        // No missing fields, now check if user is "admin"
        if (req.auth.role == "admin") {
            movieDB.createMovie(req.body, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(200);
                    res.send({
                        success: true,
                        message: "Movie ID - " + result.insertId + " created"
                    });
                }
            })
        } else {
            // If user is not "admin"
            res.status(401).send({ message: "Insufficient privileges" })
        }
    }
})


// Update movie by ID
app.put("/movie/:id", verifyToken, (req, res) => {
    // If there are missing fields
    if (req.body.name == undefined || req.body.description == undefined || req.body.Release_Date == undefined || req.body.Image_URL == undefined || req.body.GenreId == undefined || req.body.Active == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        if (req.auth.role == "admin") {
            movieDB.updateMovie(req.body, req.params.id, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(200);
                    res.send({ message: "Movie ID - " + req.params.id + " updated" });
                }
            })
        } else {
            res.status(401).send({ message: "Insufficient privileges" })
        }
    }

})

// Delete movie by ID
app.delete("/movie/:id", verifyToken, (req, res) => {
    if (req.auth.role == "admin") {
        movieDB.deleteMovie(req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send({ message: "Internal Server Error" });
            } else {
                res.status(200);
                res.send({ message: "Movie ID - " + req.params.id + " deleted" });
            }
        })
    } else {
        res.status(401).send({ message: "Insufficient privileges" })
    }
})

//////////////////// GENRE
// get all genre details
app.get("/genre", (req, res) => {
    // GET /movie?limit=###&offset=###
    var limit = 60;
    var offset = 0;
    if (req.query.limit != undefined) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.offset != undefined) {
        offset = parseInt(req.query.offset);
    }

    genreDB.getAllGenre(limit, offset, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// Get genre by genreId
app.get("/genre/:id", (req, res) => {
    genreDB.getGenreById(req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({ message: "Internal Server Error" });
        } else {
            res.status(200);
            res.send(result);
        }
    })
})

// Create genre
app.post("/genre", verifyToken, (req, res) => {
    console.log(req.auth)
    console.log(req.body)
    // If there are some missing fields
    if (req.body.name == undefined || req.body.description == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        // If there are no missing fields
        if (req.auth.role == "admin") {
            genreDB.createGenre(req.body, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(201);
                    res.send({ message: "Genre ID - " + result.insertId + " created" });
                }
            })
        } else {
            res.status(401).send({ message: "Insufficient privileges" })
        }
    }
})

// Delete Genre by ID
app.delete("/genre/:id", verifyToken, (req, res) => {
    console.log(req)
    if (req.auth.role == "admin") {
        genreDB.deleteGenre(req.params.id, (err, result) => {
            if (err) {
                res.status(500);
                res.send({ message: "Internal Server Error" });
            } else {
                res.status(200);
                res.send({ message: "Genre ID - " + req.params.id + " deleted" });
            }
        })
    } else {
        res.status(401).send({ message: "Insufficient privileges" })
    }
})

// Update genre by ID
app.put("/genre/:id", verifyToken, (req, res) => {
    // If there are missing fields
    if (req.body.name == undefined || req.body.description == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        if (req.auth.role == "admin") {
            genreDB.updateGenre(req.body, req.params.id, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(200);
                    res.send({ message: "Genre ID - " + req.params.id + " updated" });
                }
            })
        } else {
            res.status(401).send({ message: "Insufficient privileges" })
        }
    }

})

//////////////////// USER check
// Create user to add to `user` table in my SQL
app.post("/userAdd", validate, (req, res) => {
    // If fields are missing
    if (req.body.email == undefined || req.body.name == undefined || req.body.role == undefined || req.body.password == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        // If no missing fields, proceed
        // Hashing the Passwords
        // Hashed 2^10 times
        bcrypt.hash(req.body.password, 10).then(
            response => {
                userDB.createUser(req.body, response, (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send({ message: "Internal Server Error" });
                    } else {
                        res.status(201);
                        res.send({ message: "User ID - " + result.insertId + " created" });
                    }
                })
            })
    }
})
// Validating token upon log in
app.post("/login", (req, res) => {
    // No missing fields allowed
    if (req.body.email == undefined || req.body.password == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        // If there are no missing fields, proceed
        var { email, password } = req.body;
        console.log(password)
        userDB.authenticate(email, (err, result) => {
            if (err) {
                res.status(500).send({ "message": "Interval server error." });
            } else {
                if (result.length < 1) {
                    res.status(400).send({ "message": "No such user" })
                } else {
                    console.log(result);
                    bcrypt.compare(password, result[0].Password, (err, hashResult) => {
                        if (err) {
                            res.status(500).send({ message: "Wrong password provided" });
                        } else {
                            console.log("Comparison success");
                            console.log(result)
                            // Email is unique, so there will be only one item in "result"
                            var userDetails = {
                                email: result[0].Email.toLowerCase(),
                                role: result[0].Role
                            }
                            var token = jwt.sign(userDetails, sign_key, { expiresIn: "1h" });
                            res.status(200).send({ "token": token })
                        }
                    })

                }
            }
        })
    }
})


module.exports = app;

// Reference on how to hash passwords: https://www.youtube.com/watch?v=AzA_LTDoFqY
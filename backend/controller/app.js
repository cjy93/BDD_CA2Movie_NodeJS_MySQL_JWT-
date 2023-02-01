const express = require("express");
const cors = require("cors");

const userDB = require("../model/user")
const movieDB = require("../model/movie")
const genreDB = require("../model/genre")
// for encrypt and decrypt password, we bring the model part of it to app
const bcrypt = require("bcrypt"); // To encrypt user password
const jwt = require("jsonwebtoken");
const cors = require("cors");
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

/* ROUTERS */
//////////////////// MOVIE
app.get("/movie", (req, res) => {
    // GET /movie?limit=###&offset=###
    console.log(req.headers);
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
    console.log(req.headers);
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
app.post("/movie", (req, res) => {
    //if (req.headers.validated) { //
    if (req.header.validated) {
        if (req.body.name == undefined || req.body.description == undefined || req.body.Release_Date == undefined || req.body.Image_URL == undefined || req.body.GenreId == undefined || req.body.Active == undefined) {
            res.status(500);
            res.send({ message: "Missing fields from body" });
        } else {
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
        }
    } else {
        res.status(401);
        res.send({ message: "user not authorized." });
    }
})


// Update movie by ID
app.put("/movie/:id", (req, res) => {
    if (req.header.validated) {
        if (req.body.name == undefined || req.body.description == undefined || req.body.Release_Date == undefined || req.body.Image_URL == undefined || req.body.GenreId == undefined || req.body.Active == undefined) {
            res.status(500);
            res.send({ message: "Missing fields from body" });
        } else {
            movieDB.updateMovie(req.body, req.params.id, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(200);
                    res.send({ message: "Movie ID - " + req.params.id + " updated" });
                }
            })
        }
    } else {
        res.status(401);
        res.send({ message: "user not authorized." });
    }

})

// Delete movie by ID
app.delete("/movie/:id", (req, res) => {
    console.log("req.hedaer.valid")
    console.log(req.header.validated)
    if (req.header.validated) {
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
        res.status(401);
        res.send({ message: "user not authorized." });
    }
})

//////////////////// GENRE
// get all genre details
app.get("/genre", (req, res) => {
    // GET /movie?limit=###&offset=###
    console.log(req.headers);
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
app.post("/genre", (req, res) => {
    console.log("current validated at genre")
    console.log(req.validated) // if you used "res.validated" in middleware, use "req.validated" at router
    if (req.header.validated) {
        if (req.body.name == undefined || req.body.description == undefined) {
            res.status(500);
            res.send({ message: "Missing fields from body" });
        } else {
            genreDB.createGenre(req.body, (err, result) => {
                if (err) {
                    res.status(500);
                    res.send({ message: "Internal Server Error" });
                } else {
                    res.status(201);
                    res.send({ message: "Genre ID - " + result.insertId + " created" });
                }
            })
        }
    } else {
        res.status(401);
        res.send({ message: "user not authorized." });
    }
})

//////////////////// USER check
// Check USER if admin or not
app.post("/login", (req, res) => {
    var validated = false;
    let userEmail = "";
    let userRole = "user";
    if (req.body.email == undefined || req.body.password == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
        userDB.getUser(req.body.email, req.body.password, (err, result) => {
            if (err) {
                res.status(500);
                res.send({ message: "Internal Server Error" });
            } else {
                res.status(200);
                var users = result;
                const promiseArr = [];
                for (let i = 0; i < users.length; i++) {
                    // This way is you pull out all the user records and check one by one. Alternatively, you can pass your login details to the sql to check, save time for page load.
                    const decrypt = bcrypt.compare(req.body.password, users[i].Password).then(
                        response => {
                            // True or False (decrypt returns)
                            if (users[i].Email.toLowerCase() == req.body.email.toLowerCase() && response && users[i].Role == "admin") {
                                validated = true;
                                userEmail = req.body.email.toLowerCase();
                                req.headers.validated = validated;
                                userRole = users[i].Role
                            } else {
                                if (validated == false) {
                                    userEmail = req.body.email.toLowerCase();
                                    userRole = "profile is not admin"
                                }
                            }
                        });
                    promiseArr.push(decrypt);
                }

                Promise.all(promiseArr).then(() => {
                    let resultData = {
                        message: "User " + userEmail + " is " + userRole,
                        validated: validated
                    }
                    // Use localStorage to store the validation as "True" as soon as the user logs in at ROUTER "userCheck"
                    globalValidate = validated // true or false (true unless hit admin user)
                    res.send(resultData);
                });
            }
        })
    }
})

// Validating token upon log in
app.post("/login", cors(corsOption), (req, res) => {
    var { username, password } = req.body;

    userDB.authenticate(username, password, (err, result) => {
        if (err) {
            res.status(500).send({ "message": "Interval server error." });
        } else {
            if (result.length < 1) {
                res.status(400).send({ "message": "wrong username / password" })
            } else {
                console.log(result);
                bcrypt.compare(password, result[0].password, (err, hashResult) => {
                    if (err) {
                        res.status(500).send({ message: "Internal server error" });
                    } else {
                        console.log("Comparison success");

                        var userDetails = {
                            username: result[0].username,
                            role: result[0].role
                        }
                        var token = jwt.sign(userDetails, sign_key, { expiresIn: "1h" });
                        res.status(200).send({ "token": token })
                    }
                })

            }
        }
    })
    // }
})

// Create user to add to `user` table in my SQL
app.post("/userAdd", (req, res) => {
    if (req.body.email == undefined || req.body.name == undefined || req.body.role == undefined || req.body.password == undefined) {
        res.status(500);
        res.send({ message: "Missing fields from body" });
    } else {
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
                        res.send({ message: "Genre ID - " + result.insertId + " created" });
                    }
                })
            })


    }
})



module.exports = app;

// Reference on how to hash passwords: https://www.youtube.com/watch?v=AzA_LTDoFqY
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';

export default function MovieHide(props) {
    // initialise the starting list of movies
    const [movies, setMovies] = React.useState(props.movies);
    // to ensure that the props.movies is propagated to movies on initial step
    React.useEffect(() => {
        setMovies(props.movies);
    }, [props.movies])
    // State variables
    const [date, setDate] = React.useState("All");
    const [genre, setGenre] = React.useState("None");
    const [rating, setRating] = React.useState(0);

    //  Method 1: Filter states by older, newer and All movies.
    // Hypothetically set date before May 2022 as old
    const mappingDate = {
        "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4,
        "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9,
        "Nov": 10, "Dec": 11, "None": null
    } // since my data came in the form `MMM DD, YYYY`

    // Create new list to store Old or New movies object
    let filteredOld = []
    let filteredNew = []
    //  Sort the movies into respective lists based on whether it was before May or after May (the month). ALl movies are from 2022, so no need to sort by year.
    movies.forEach(function (movie, index) {
        if (movie.release_date.length > 0) {
            if (mappingDate[movie.release_date.substr(0, 3)] > 4) {// pull out first 3 characters of a string
                filteredNew.push(movie)
            } else if (mappingDate[movie.release_date.substr(0, 3)] <= 4) {
                filteredOld.push(movie)
            }
        } else {
            // if the release date is not given(for example, those created under ADD function), we assume they are old movies
            filteredOld.push("movie")
        }
    })
    // Based on "Old"/ "New"/"All" preference, give the first level filtered list
    var filteredLevel1 =
        date == "Old" ? filteredOld : (date == "New" ? filteredNew : props.movies)

    // Method 2: Filter states by Genre    
    // function input date will determine what list to extract the remaining genres available
    const getGenreList = (date) => {
        // Based on the remaining filteredLevel1 list out of all the movies, retrieve the available genre options
        // Gather all the genres
        let allRemainGenres = []
        let filteredList = []
        if (date == "Old") {
            filteredList = filteredOld
        } else if (date == "New") {
            filteredList = filteredNew
        } else {
            filteredList = props.movies
        }
        if (filteredList.length > 0) {
            filteredList.forEach(function (movie, index) {
                // split by commas and strip empty spaces. There are genre data that appears like "Action, Thriller, Comedy" instead of just single genre like "Action"
                const myArray = movie.genres.split(",").map(item => item.trim());
                // push the list of genres into an overall list
                allRemainGenres.push(myArray)
            })
            // Flatten the list (since each movie gives a list of genres)
            let flatGenres = [].concat.apply([], allRemainGenres)
            // Keep Unique list and sort in alphabetical order
            var uniqueGenre = [...new Set(flatGenres)].sort()
            // Add a "None" option in case users does not want to filter by any Genre
            uniqueGenre = [...uniqueGenre, "None"]
        } else {
            var uniqueGenre = ["None"]
        }
        return uniqueGenre
    } // end of function getGenreList
    // Call the function once, so you can pass this list to the next function which requires to know the available Genres based on "Date" filter.
    let uniqueGenre = getGenreList(date)

    let filteredList2 = []
    if (filteredLevel1.length > 0) {
        filteredLevel1.forEach(function (movie, index) {
            // take each movie.genre as a string.
            // As some of them have more than one genre, it is troublesome to do exact string match. So, do a substring match
            if (movie.genres.includes(genre) && genre != "None") {
                filteredList2.push(movie)
            }
        })

        // Based on whether genre is "None" or not, will choose diff filtered list. If Genre chosen is "None", return the output from first level filter, else return the output after first and second level filtering
        var filteredLevel2 = genre == "None" ? filteredLevel1 : filteredList2
    } else {
        var filteredLevel2 = [];
    }

    //  Method 3: Filter states by Rating
    let filteredList3 = []
    if (filteredLevel2.length > 0) {
        filteredLevel2.forEach(function (movie, index) {
            // take each movie.genre as a string.
            // As some of them have more than one genre, it is troublesome to do exact string match. So, do a substring match
            if (movie.imdb > rating) {
                filteredList3.push(movie) // can change to filter function
            }
        })
        var filteredLevel3 =
            filteredList3
    } else {
        var filteredLevel3 = []
    } // Pass the filteredLevel3 as the final output to frontend

    // Return section UI form
    return (
        <div>
            {/* Input filters */}
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formFilter">
                        <h2>Retrieve Movies: </h2>
                        {/* React-bootstrap form group */}
                        <h3>With every retrieval, please reset list for next search</h3>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Old/New:</Form.Label>
                        <Form.Select value={date} onChange={(e) => setDate(e.target.value)}>
                            <option value="Old">Old movies</option>
                            <option value="New">New movies</option>
                            <option value="All">All movies</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Genre:</Form.Label>
                        <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                            {uniqueGenre.map((n) => (
                                <option value={n}>{n}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Min Rating:</Form.Label>
                        <Form.Control
                            type="number" // this alone can also prevent key in non numeric
                            defaultValue={rating}
                            onChange={e => setRating(e.target.value)}
                            placeholder="required"
                            onKeyDown={(e) => restrictAlphabets(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={() => { props.onRetrieve(filteredLevel3) }}
                        >Retrieve</Button>
                    </Form.Group>
                </Row>
            </Form>

        </div>
    )
};



// Reference on how to form a mapped selet input on React: https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
// Reference on how come sometimes you cannot call "forEach" on some lists: https://java2blog.com/typeerror-foreach-is-not-function-javascript/#:~:text=foreach%20is%20not%20a%20function%20occurs%20when%20we%20call%20foreach,on%20object%20or%20use%20Array.

// EXTRA codes
// const genres = ['Action',
//         'Adventure',
//         'Animation',
//         'Biography',
//         'Comedy',
//         'Crime',
//         'Documentary',
//         'Drama',
//         'Family',
//         'Fantasy',
//         'Film Noir',
//         'History',
//         'Horror',
//         'Music',
//         'Musical',
//         'Mystery',
//         'Romance',
//         'Sci-Fi',
//         'Short',
//         'Sport',
//         'Superhero',
//         'Thriller',
//         'War',
//         'Western',
//         "None"]
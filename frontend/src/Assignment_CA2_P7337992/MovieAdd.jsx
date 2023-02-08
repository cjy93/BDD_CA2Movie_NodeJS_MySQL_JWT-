import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
// use the reducer "add"
import { useSelector, useDispatch } from 'react-redux';
import { add } from './slices/movieSlice';
import { addfields } from './slices/addFieldsSlice';
import MovieDataService from "../services";

export default function MovieAdd(props) {

    const dispatch = useDispatch();
    // Bringing in the movies from Parents as we will update the list
    const movies = props.movies;
    console.log("dispatched movies")
    console.log(movies)

    // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
    let nextId = movies.length - 1;

    // Existing parameters for the input boxes
    const addfield = useSelector(function (store) {
        return store.addfields.value
    })
    let title = addfield.title;
    let description = addfield.description;
    let rating = addfield.rating;
    let genreId = addfield.genreId;
    let active = addfield.active;
    let poster = addfield.poster;
    let url = addfield.url;
    let release = addfield.release;
    // genreName just for this app display, but send genreId corresponding to genreName to backend
    const [genreName, setGenreName] = React.useState("");

    var genreidMap = {
        1: "Action", 2: "Adventure", 3: "Animation", 4: "Comedy", 5: "Crime", 6: "Documentary", 7: "Drama", 8: "Fantasy", 9: "Horror", 10: "Mystery", 11: "Romance", 12: "Sci-Fi", 13: "Sport"
    }

    var genreNameMap = {
        "Action": 1, "Adventure": 2, "Animation": 3, "Comedy": 4, "Crime": 5, "Documentary": 6, "Drama": 7, "Fantasy": 8, "Horror": 9, "Mystery": 10, "Romance": 11, "Sci-Fi": 12, "Sport": 13
    }


    // Function to prevent user from typing non numeric in "rating" input textbox
    /*code: 48-57 are Numbers*/
    function restrictAlphabets(e) {
        console.log("keystroke")
        console.log(e)
        var x = e.keyCode;
        console.log(x)
        if ((x >= 48 && x <= 57) || x == 190) {
            return true;
        } else {
            e.preventDefault() // preventDefault to type if it is non numeric or "."
            return false;
        }
    }

    const keysGenre = Object.keys(genreNameMap);
    console.log("what are the keys")
    console.log(keysGenre)

    // Return form variables, with React Bootstrap styling
    return (
        <>
            <h2>Add your new movie details: </h2>
            {/* React-bootstrap form group */}
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formAdd">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={title}
                            onChange={(e) => { dispatch(addfields({ title: e.target.value, description: description, rating: rating, genreId: genreId, poster: poster, url: url, release: release, active: active })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formAdd">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={description}
                            onChange={(e) => { dispatch(addfields({ title: title, description: e.target.value, rating: rating, genreId: genreId, poster: poster, url: url, release: release, active: active })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control
                            type="number" // this alone can also prevent key in non numeric
                            defaultValue={rating}
                            onChange={(e) => { dispatch(addfields({ title: title, description: description, rating: Number(e.target.value), genreId: genreId, poster: poster, url: url, release: release, active: active })) }}
                            placeholder="required"
                            onKeyDown={(e) => restrictAlphabets(e)}
                        />
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label>Genres:</Form.Label>
                        <Form.Select
                            type="Text"
                            value={genreNameMap[genreId]}
                            onChange={(e) => {
                                dispatch(addfields({ title: title, description: description, rating: rating, genreId: genreNameMap[e.target.value], poster: poster, url: url, release: release, active: active }))
                            }}
                            required
                            placeholder="required"
                        >
                            {/* {keysGenre.forEach((item, index) => {
                                console.log("did it reach formsleect");
                                return < option value={item} > {item}</option>
                            })} */}
                            <option value="Choose">Choose</option>
                            {keysGenre.map(function (object, i) {
                                return < option value={object} > {object}</option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Poster URL:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={poster}
                            onChange={(e) => { dispatch(addfields({ title: title, description: description, rating: rating, genreId: genreId, poster: e.target.value, url: url, release: release, active: active })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Website URL:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={url}
                            onChange={(e) => { dispatch(addfields({ title: title, description: description, rating: rating, genreId: genreId, poster: poster, url: e.target.value, release: release, active: active })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Release Date:</Form.Label>
                        <Form.Control
                            value={release}
                            type="Date"
                            onChange={(e) => { dispatch(addfields({ title: title, description: description, rating: rating, genreId: genreId, poster: poster, url: url, release: e.target.value, active: active })) }}
                            placeholder="YYYY-MM-DD"
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Active:</Form.Label>
                        <Form.Select
                            value={active}
                            onChange={(e) => { dispatch(addfields({ title: title, description: description, rating: rating, genreId: genreId, poster: poster, url: url, release: release, active: e.target.value })) }}
                            placeholder=""
                        >
                            <option value="Choose">Choose</option>
                            <option value="N">N</option>
                            <option value="Y">Y</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary"
                            onClick={() => {
                                // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
                                let nextId = movies.length - 1;
                                let newId = nextId++;
                                // Update Redux
                                dispatch(add({ newId: newId, title: title, rating: rating, genreId: genreId, poster: poster, url: url, release: release, description: description }));

                                // Update Database backend
                                const bodyData = { name: title, description: description, imdb: Number(rating), GenreId: genreId, Image_URL: poster, links: url, Release_Date: release, Active: active, GenreFull: genreidMap[genreId] };

                                console.log("what are the added", bodyData);

                                MovieDataService.createMovie(bodyData).then(response => {
                                    if (response.data) {
                                        console.log("what is the response")
                                        console.log(response);
                                    }
                                });
                            }}>Add</Button>

                    </Form.Group>
                </Row>
            </Form>
            {/* <ul>
                {movies.map(n => (
                    // <li key={n.id}>{n.movie}{n.imdb}{n.small_posters}{n.url}{
                    //     n.release_date}</li>
                    <li style={{ listStyleType: "none" }}>
                        <a href={n.links}><img src={n.small_posters} alt={n.movie} ></img></a>
                        <a href={n.url}>{n.movie}</a> [Date Released: {n.release_date}] ({n.imdb >= 5 ? '👍' : n.imdb < 5 ? '👎' : '❓'}
                        {n.imdb}%)
                    </li>
                ))}
            </ul> */}
        </>
    )
}
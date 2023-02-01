import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
// use the reducer "add"
import { useSelector, useDispatch } from 'react-redux';
import { add } from './slices/movieSlice';
import { addfields } from './slices/addFieldsSlice';

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
    let rating = addfield.rating;
    let genres = addfield.genres;
    let poster = addfield.poster;
    let url = addfield.url;
    let release = addfield.release;


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
                            onChange={(e) => { dispatch(addfields({ title: e.target.value, rating: rating, genres: genres, poster: poster, url: url, release: release })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control
                            type="number" // this alone can also prevent key in non numeric
                            defaultValue={rating}
                            onChange={(e) => { dispatch(addfields({ title: title, rating: e.target.value, genres: genres, poster: poster, url: url, release: release })) }}
                            placeholder="required"
                            onKeyDown={(e) => restrictAlphabets(e)}
                        />
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label>Genres:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={genres}
                            onChange={(e) => { dispatch(addfields({ title: title, rating: rating, genres: e.target.value, poster: poster, url: url, release: release })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Poster URL:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={poster}
                            onChange={(e) => { dispatch(addfields({ title: title, rating: rating, genres: genres, poster: e.target.value, url: url, release: release })) }}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Website URL:</Form.Label>
                        <Form.Control
                            value={url}
                            onChange={(e) => { dispatch(addfields({ title: title, rating: rating, genres: genres, poster: poster, url: e.target.value, release: release })) }}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Release Date:</Form.Label>
                        <Form.Control
                            value={release}
                            onChange={(e) => { dispatch(addfields({ title: title, rating: rating, genres: genres, poster: poster, url: url, release: e.target.value })) }}
                            placeholder="MMM DD, YYYY"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary"
                            onClick={() => {
                                // setTitle(''); setRating(''); setGenres(''); setPoster(''); setUrl(''); setRelease('');

                                // props.onAdd([{
                                //     id: nextId++, movie: title, imdb: rating, genres: genres,
                                //     small_posters: poster, links: url, release_date: release
                                // }, ...movies])
                                let newId = nextId++
                                dispatch(add({ newId: newId, title: title, rating: rating, genres: genres, poster: poster, url: url, release: release }))
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
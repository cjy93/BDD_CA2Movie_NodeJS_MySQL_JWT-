import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form } from 'react-bootstrap';
import { pin } from './slices/pinSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieDataService from "../services";

export default function MovieDisp(props) {

    const dispatch = useDispatch();
    let movies = props.movies

    const pinned = useSelector(function (store) {
        return (store.pin.value);
    })

    return (
        <>
            {/* Run through the same mapping for each of the existing movies in the list */}
            {movies.map(function (movie, index) {
                const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';


                return (
                    <>
                        {/* Write details in each card */}
                        <Col md="3">
                            <Card style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={movie.Image_URL} />
                                <Card.Body>
                                    <Card.Title className="text-dark">{<a href={movie.links} target="_blank">{movie.name}</a>}</Card.Title>
                                    <Card.Text className="text-dark">[Date Released: {movie.Release_Date}] ({emoji}
                                        {movie.imdb}%)
                                        <Link to={`/details/${movie['movieID']}`}><button onClick={() => {
                                            // pass localStorage to "RootPage.jsx" as RootPage did not iterate across Index, so cannot receive data unless with localStorage
                                            localStorage['movieId'] = movie['movieID'];
                                        }}>Details page! 📔</button></Link>
                                        &nbsp;
                                        <button
                                            className={pinned.includes(parseInt(movie.movieID)) ? 'hide' : ''} // hide pin button if it is pinned
                                            onClick={() => {
                                                dispatch(pin(movie));
                                            }}>Pin 📌</button>
                                        {/* Delete each individual movie with button */}
                                        <button variant="primary"
                                            onClick={(e) => {
                                                props.onDelete(index);
                                                MovieDataService.deleteMovie(movie.movieID).then(response => {
                                                    if (response.data) {
                                                        console.log("what is the delete response")
                                                        console.log(response);
                                                    }
                                                });
                                            }}>
                                            Delete 🗑️
                                        </button>
                                    </Card.Text>

                                    {/* Checkbox to select the movie card */}
                                    <BoxClicked className="text-dark"
                                        index={index}
                                        onChecked={
                                            (e) => {
                                                props.onChecked(e)
                                            }
                                        }
                                    />

                                </Card.Body>
                            </Card>
                        </Col>


                    </>)
            })}
        </>
    )

    function BoxClicked(props) {
        // If the checkbox is checked, changed "checked" to true.
        const [checked, setChecked] = React.useState(false);
        // If the checkbox is unchecked(after checked), register in a 
        return (
            <div className="text-dark">
                {/* Make checkbox with Bootstrap */}
                <Form.Check type="checkbox" label="Add to delete list " className="text-dark"
                    defaultChecked={checked} // checked={checked}
                    onChange={
                        () => {
                            setChecked(!checked); // To change the existing checked status back to parent as this is a shared state. First function in onChange
                            props.onChecked(props.index) // To pass the index of selected checkbox back to parent. Second function in onChange
                        }
                    } />
            </div>
        );
    };
}


//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/
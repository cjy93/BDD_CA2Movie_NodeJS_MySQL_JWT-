import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { unpin } from './slices/pinSlice';

export default function MoviePinDisp(props) {

    const dispatch = useDispatch();
    // pinned movie indexes
    const pinned = useSelector(function (store) {
        return (store.pin.value);
    })
    // list of all current movies
    let movies = props.movies
    // Pinned movies list
    let pinnedMovies = movies.filter(movie => pinned.includes(parseInt(movie.movieID)))

    return (
        <>
            {/* Run through the same mapping for each of the existing movies in the list */}
            {pinnedMovies.map(function (movie, index) {
                const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';

                return (
                    <>
                        {/* Write details in each card */}
                        <Col md="3">
                            <Card style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={movie.Image_URL} />
                                <Card.Body>
                                    <Card.Title className="text-dark">{<a href={movie.links} target="_blank">{movie.name}</a>}</Card.Title>
                                    <Card.Text className="text-dark">
                                        [Date Released: {movie.Release_Date}] ({emoji}
                                        {movie.imdb}%)

                                        <button
                                            className={!pinned.includes(parseInt(movie.movieID)) ? 'hide' : ''} // hide pin button if it is pinned
                                            onClick={() => {
                                                dispatch(unpin(movie));
                                                console.log(movie.movieID)
                                            }}>Unpin 📌</button>
                                    </Card.Text>


                                </Card.Body>
                            </Card>
                        </Col>


                    </>)
            })}
        </>
    )


}


//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/
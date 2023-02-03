// MovieUpdateDisp.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updatefield } from './slices/updatefieldSlice';
import { Link } from 'react-router-dom';

export default function MoviePinDisp(props) {

    // list of all current movies, after filtered at "MovieUpdate.jsx"
    let movies = props.movies;
    // Call dispatch
    const dispatch = useDispatch();


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
                                    <Card.Text className="text-dark">
                                        [Date Released: {movie.Release_Date}] ({emoji}
                                        {movie.imdb}%)

                                        <button
                                            onClick={() => {
                                                // Populate the input boxes once any movie is selected. 
                                                localStorage["movieUpdateId"] = movie['movieID'];
                                                // populate the fields
                                                dispatch(updatefield({ id: parseInt(localStorage["movieUpdateId"]), title: movie.name, description: movie.description, rating: movie.imdb, genres: movie.GenreFull, poster: movie.Image_URL, url: movie.links, release: movie.Release_Date, active: movie.Active, year: movie.year, runtime: movie.runtime, actor1: movie.actor1, actor2: movie.actor2, actor3: movie.actor3, actor4: movie.actor4, actor1_pic: movie.actor1_pic, actor2_pic: movie.actor2_pic, actor3_pic: movie.actor3_pic, actor4_pic: movie.actor4_pic, youtube: movie.youtube, storyPlot: movie.storyPlot }))
                                            }}>Select movie for update</button>
                                        {/* Link to Details page from selected movie */}
                                        <Link to={`/details/${movie['id']}`}><button onClick={() => {
                                            localStorage['movieId'] = movie['movieID'];
                                        }}>Details page! 📔</button></Link>
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
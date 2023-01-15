import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form } from 'react-bootstrap';

export default function MovieDelete(props) {

    // update onDetails to pass to parent
    const [isDetails, setIsDetails] = React.useState(false)


    return (
        <>
            {/* Run through the same mapping for each of the existing movies in the list */}
            {props.movies.map(function (movie, index) {
                const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';
                return (
                    <>
                        {/* Write details in each card */}
                        <Col md="3">
                            <Card style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={movie.small_posters} />
                                <Card.Body>
                                    <Card.Title className="text-dark">{<a href={movie.links}>{movie.movie}</a>}</Card.Title>
                                    <Card.Text className="text-dark">
                                        [Date Released: {movie.release_date}] ({emoji}
                                        {movie.imdb}%)
                                        <button onClick={() => { props.onDetails(isDetails); setIsDetails(!isDetails); localStorage['movieId'] = movie.id; }}>Details page!</button>
                                    </Card.Text>
                                    {/* Delete each individual movie with button */}
                                    <button variant="primary"
                                        onClick={() => props.onDelete(index)}>
                                        Delete
                                    </button>
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
                <Form.Check type="checkbox" label="Add to delete list" className="text-dark"
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
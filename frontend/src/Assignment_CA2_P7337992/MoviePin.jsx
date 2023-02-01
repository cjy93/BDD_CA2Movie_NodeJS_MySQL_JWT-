import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MoviePinDisp from './MoviePinDisp';

export default function MoviePin(props) {

    // Add the movies from final list
    const movies = useSelector(function (store) {
        return store.record.value;
    });
    // If not log in yet, provide message to ask to log in
    const logout = useSelector(function (store) {
        return store.page.value;
    });
    return (
        <>
            {logout && <div><h1 className="mt-5 text-sm-start text-md-center">Pinned Movies</h1>
                <p className="mt-5 text-sm-start text-md-center">Max of 5</p>
                <div>
                    {/* In react-bootstrap, you need to wrap the cols>cards in Row and set number of columns by 'g-4' */}
                    <Container className='p-3'>
                        <Row xs={1} md={2} className="g-4">

                            <MoviePinDisp movies={movies}
                            />

                        </Row>
                    </Container>
                </div>
            </div>}

            {!logout && <h1>Please go to login page</h1>}

        </>
    )
}
// MovieUpdate.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Col, Card, Form, Container, Row, Accordion } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MovieUpdateDisp from './MovieUpdateDisp';
import { updatefield } from './slices/updatefieldSlice';
import { update } from './slices/movieSlice';

export default function MovieUpdate(props) {
    const dispatch = useDispatch();
    // Add the movies from final list
    const movies = useSelector(function (store) {
        return store.record.value;
    });
    // If not log in yet, provide message to ask to log in
    const logout = useSelector(function (store) {
        return store.page.value;
    });
    // Existing parameters for the input boxes
    const updateField = useSelector(function (store) {
        return store.updatefield.value
    })

    let id = updateField.id;
    let title = updateField.title;
    let rating = updateField.rating;
    let genres = updateField.genres;
    let poster = updateField.poster;
    let url = updateField.url;
    let release = updateField.release;
    let year = updateField.year;
    // Optional fields
    let runtime = updateField.runtime;
    let storyPlot = updateField.storyPlot;
    let actor1 = updateField.actor1;
    let actor2 = updateField.actor2;
    let actor3 = updateField.actor3;
    let actor4 = updateField.actor4;
    let actor1_as = updateField.actor1_as;
    let actor2_as = updateField.actor2_as;
    let actor3_as = updateField.actor3_as;
    let actor4_as = updateField.actor4_as;
    let actor1_link = updateField.actor1_link;
    let actor2_link = updateField.actor2_link;
    let actor3_link = updateField.actor3_link;
    let actor4_link = updateField.actor4_link;
    let actor1_pic = updateField.actor1_pic;
    let actor2_pic = updateField.actor2_pic;
    let actor3_pic = updateField.actor3_pic;
    let actor4_pic = updateField.actor4_pic;
    let youtube = updateField.youtube
    let plot = updateField.plot

    // Write object(once) to add to dispatch. We "spread" this object when we need to update the key value pair, for simpler writing in the input fields below.
    var fields = { id: id, title: title, rating: rating, genres: genres, poster: poster, url: url, release: release, runtime: runtime, year: year, storyPlot: storyPlot, actor1: actor1, actor2: actor2, actor3: actor3, actor4: actor4, actor1_as: actor1_as, actor2_as: actor2_as, actor3_as: actor3_as, actor4_as: actor4_as, actor1_link: actor1_link, actor2_link: actor2_link, actor3_link: actor3_link, actor4_link: actor4_link, actor1_pic: actor1_pic, actor2_pic: actor2_pic, actor3_pic: actor3_pic, actor4_pic: actor4_pic, youtube: youtube }

    // Search box, search by Movie name
    const [searchInput, setSearchInput] = React.useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    if (searchInput.length > 0) {
        var passNext = movies.filter(e => e.movie.toLowerCase().includes(String(searchInput).toLowerCase()))
    } else {
        var passNext = movies
    };


    return (
        <>
            {logout && <div><h1 className="mt-5 text-sm-start text-md-center">Update Movies</h1>
                <div>
                    <Container className='p-3'>
                        {/* Search bar for searching movies by movie name */}
                        <h2>Search for the movie</h2>
                        <Form className="d-flex me-auto my-2 my-lg-4">
                            <Form.Label>Type movie name:</Form.Label>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleChange}
                                value={searchInput}
                            />
                        </Form>
                        <h2>Click on one of "Select Movie for Updates" and edit the fields:</h2>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formAdd">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        value={title}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, title: e.target.value })); console.log(dispatch(updatefield({ ...fields, title: e.target.value }))) }}
                                        required
                                        placeholder="required"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control
                                        type="number" // this alone can also prevent key in non numeric
                                        defaultValue={rating}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, rating: e.target.value })) }}
                                        placeholder="required"
                                        onKeyDown={(e) => restrictAlphabets(e)}
                                    />
                                </Form.Group >
                                <Form.Group as={Col}>
                                    <Form.Label>Genres:</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        value={genres}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, genres: e.target.value })) }}
                                        required
                                        placeholder="required"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Poster URL:</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        value={poster}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, poster: e.target.value })) }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Website URL:</Form.Label>
                                    <Form.Control
                                        value={url}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, url: e.target.value })) }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Release Date:</Form.Label>
                                    <Form.Control
                                        value={release}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, release: e.target.value })) }}
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
                                            dispatch(update(updateField));
                                        }}>Update</Button>

                                </Form.Group>
                            </Row>
                        </Form>
                        {/* Expand to show more input fields using Accordion */}
                        <Accordion className="my-2 my-lg-4" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h3>Click to unhide more fields</h3></Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} className="mb-3" controlId="formAdd">
                                                <Form.Label>Year:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={year}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, year: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Runtime:</Form.Label>
                                                <Form.Control
                                                    type="number" // this alone can also prevent key in non numeric
                                                    defaultValue={runtime}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, runtime: e.target.value })) }}
                                                    onKeyDown={(e) => restrictAlphabets(e)}
                                                />
                                            </Form.Group >
                                            <Form.Group as={Col}>
                                                <Form.Label>actor1:</Form.Label>
                                                <Form.Control
                                                    type="Text"
                                                    value={actor1}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor1: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor2:</Form.Label>
                                                <Form.Control
                                                    type="Text"
                                                    value={actor2}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor2: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor3:</Form.Label>
                                                <Form.Control
                                                    value={actor3}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor3: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor4:</Form.Label>
                                                <Form.Control
                                                    value={actor4}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor4: e.target.value })) }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor1_pic:</Form.Label>
                                                <Form.Control
                                                    value={actor1_pic}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor1_pic: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor2_pic:</Form.Label>
                                                <Form.Control
                                                    value={actor2_pic}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor2_pic: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor3_pic:</Form.Label>
                                                <Form.Control
                                                    value={actor3_pic}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor3_pic: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>actor4_pic:</Form.Label>
                                                <Form.Control
                                                    value={actor4_pic}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, actor4_pic: e.target.value })) }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>youtube:</Form.Label>
                                                <Form.Control
                                                    value={youtube}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, youtube: e.target.value })) }}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>StoryPlot:</Form.Label>
                                                <Form.Control as="textarea"
                                                    value={storyPlot}
                                                    onChange={(e) => { dispatch(updatefield({ ...fields, storyPlot: e.target.value })) }}
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
                                                        dispatch(update(updateField));
                                                    }}>Update</Button>

                                            </Form.Group>
                                        </Row>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        {/* In react-bootstrap, you need to wrap the cols>cards in Row and set number of columns by 'g-4' */}
                        {/* Display cards */}
                        <Row xs={1} md={2} className="g-4">
                            <MovieUpdateDisp movies={passNext}
                            />

                        </Row>
                    </Container>
                </div>
            </div>}

            {!logout && <h1>Please go to login page</h1>}

        </>
    )
}
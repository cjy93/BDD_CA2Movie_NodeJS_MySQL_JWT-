// MovieUpdate.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Col, Card, Form, Container, Row, Accordion } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MovieUpdateDisp from './MovieUpdateDisp';
import { updatefield } from './slices/updatefieldSlice';
import { update } from './slices/movieSlice';
import MovieDataService from "../services";

export default function MovieUpdate(props) {
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
    const dispatch = useDispatch();
    // Add the movies from final list
    const movies = useSelector(function (store) {
        return store.record.value;
    });
    // If not log in yet, provide message to ask to log in
    const logout = useSelector(function (store) {
        return store.page.value;
    });

    var genreidMap = {
        1: "Action", 2: "Adventure", 3: "Animation", 4: "Comedy", 5: "Crime", 6: "Documentary", 7: "Drama", 8: "Fantasy", 9: "Horror", 10: "Mystery", 11: "Romance", 12: "Sci-Fi", 13: "Sport"
    }

    var genreNameMap = {
        "Action": 1, "Adventure": 2, "Animation": 3, "Comedy": 4, "Crime": 5, "Documentary": 6, "Drama": 7, "Fantasy": 8, "Horror": 9, "Mystery": 10, "Romance": 11, "Sci-Fi": 12, "Sport": 13
    }
    const keysGenre = Object.keys(genreNameMap);

    // Existing parameters for the input boxes
    const updateField = useSelector(function (store) {
        return store.updatefield.value
    })

    let id = updateField.id;
    let description = updateField.description;
    let title = updateField.title;
    let rating = updateField.rating;
    let genreId = updateField.genreId;
    let poster = updateField.poster;
    let url = updateField.url;
    let release = updateField.release;
    let active = updateField.active;
    // Optional fields
    let year = updateField.year;
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
    var fields = { id: id, description: description, title: title, rating: rating, genreId: genreId, poster: poster, url: url, release: release, active: active, runtime: runtime, year: year, storyPlot: storyPlot, actor1: actor1, actor2: actor2, actor3: actor3, actor4: actor4, actor1_as: actor1_as, actor2_as: actor2_as, actor3_as: actor3_as, actor4_as: actor4_as, actor1_link: actor1_link, actor2_link: actor2_link, actor3_link: actor3_link, actor4_link: actor4_link, actor1_pic: actor1_pic, actor2_pic: actor2_pic, actor3_pic: actor3_pic, actor4_pic: actor4_pic, youtube: youtube }

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
                                <Form.Group as={Col} className="mb-3" controlId="formAdd">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control
                                        type="Text"
                                        value={description}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, description: e.target.value })); console.log(dispatch(updatefield({ ...fields, description: e.target.value }))) }}
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
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Genre:</Form.Label>
                                    <Form.Select
                                        type="Text"
                                        value={genreNameMap[genreId]}
                                        onChange={(e) => {
                                            dispatch(updatefield({ ...fields, genreId: genreNameMap[e.target.value] }));
                                            console.log("what is the chosen genre id", genreNameMap[genreId]);
                                            console.log("what is the chosen genre value", genreNameMap[e.target.value])
                                        }}
                                        required
                                        placeholder="required"
                                    >
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
                                        onChange={(e) => { dispatch(updatefield({ ...fields, poster: e.target.value })) }}
                                        placeholder="required"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Website URL:</Form.Label>
                                    <Form.Control
                                        value={url}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, url: e.target.value })) }}
                                        placeholder="required"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Release Date:</Form.Label>
                                    <Form.Control
                                        value={release}
                                        type="Date"
                                        onChange={(e) => { dispatch(updatefield({ ...fields, release: e.target.value })) }}
                                        placeholder="YYYY-MM-DD"
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Active:</Form.Label>
                                    <Form.Select
                                        value={active}
                                        onChange={(e) => { dispatch(updatefield({ ...fields, active: e.target.value })) }}
                                        placeholder="required"                                    >
                                        <option value="Choose">Choose</option>
                                        <option value="N">N</option>
                                        <option value="Y">Y</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary"
                                        onClick={() => {

                                            // Update Database backend
                                            const bodyData = { movieID: id, name: title, description: description, imdb: rating, GenreId: genreId, Image_URL: poster, links: url, Release_Date: release, Active: active, GenreFull: genreidMap[genreId], year: year, runtime: runtime, actor1: actor1, actor2: actor2, actor3: actor3, actor4: actor4, actor1_pic: actor1_pic, actor2_pic: actor2_pic, actor3_pic: actor3_pic, actor4_pic: actor4_pic, youtube: youtube, storyPlot: storyPlot }; // "index" for is req.params
                                            console.log("what is put to updatemovie?", bodyData);
                                            console.log("what is the updateField now", updateField)
                                            MovieDataService.updateMovie(bodyData, id).then(response => {
                                                console.log("what is the response1");
                                                console.log(response);
                                            });
                                            // To avoid frontend and backend database mismatch, we also need all the fields to be completed before update Redux frontend
                                            if (id == undefined || title == undefined || description == undefined || rating == undefined || genreId == undefined || poster == undefined || url == undefined || release == undefined || active == undefined) {
                                                alert("You have missing compulsory fields!")
                                            } else {
                                                // Update Redux list
                                                console.log("you have successfully put in all the fields")
                                                dispatch(update(updateField));
                                            }

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
                                                    onClick={(e) => {
                                                        // Update Database backend
                                                        const bodyData = { movieID: id, name: title, description: description, imdb: rating, GenreId: genreId, Image_URL: poster, links: url, Release_Date: release, Active: active, GenreFull: genreidMap[genreId], year: year, runtime: runtime, actor1: actor1, actor2: actor2, actor3: actor3, actor4: actor4, actor1_pic: actor1_pic, actor2_pic: actor2_pic, actor3_pic: actor3_pic, actor4_pic: actor4_pic, youtube: youtube, storyPlot: storyPlot };
                                                        // second param for is req.params
                                                        MovieDataService.updateMovie(bodyData, id).then(response => {
                                                            if (response.data) {
                                                                console.log("what is the response2");
                                                                console.log(response);
                                                            }
                                                        });
                                                        // Update "update" for Redux
                                                        dispatch(update(updateField));
                                                        // Update "update" for database
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
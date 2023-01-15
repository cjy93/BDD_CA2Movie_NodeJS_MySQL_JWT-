import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import MovieDataService from "../services";

export default function MovieAdd(props) {

    // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
    let nextId = props.movies.length - 1;
    // initialise the starting list of movies
    const [movies, setMovies] = React.useState(props.movies);

    // to ensure that the props.movies is propagated to movies on initial step
    React.useEffect(() => {
        setMovies(props.movies);
    }, [props.movies])

    var genreidMap = {
        1: "Action", 2: "Adventure", 3: "Animation", 4: "Comedy", 5: "Crime", 6: "Documentary", 7: "Drama", 8: "Fantasy", 9: "Horror", 10: "Mystery", 11: "Romance", 12: "Sci-Fi", 13: "Sport"
    }
    // for the input boxes
    const [title, setTitle] = React.useState([]);
    const [rating, setRating] = React.useState([]);
    const [genres, setGenres] = React.useState([]);
    const [poster, setPoster] = React.useState([]);
    const [url, setUrl] = React.useState([]);
    const [release, setRelease] = React.useState("2022/03/09");
    const [description, setDescription] = React.useState("");
    const [genreid, setGenreid] = React.useState(1);
    const [active, setActive] = React.useState("Y");


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
                            onChange={e => setTitle(e.target.value)}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control
                            type="number" // this alone can also prevent key in non numeric
                            defaultValue={rating}
                            onChange={e => setRating(e.target.value)}
                            placeholder="required"
                            onKeyDown={(e) => restrictAlphabets(e)}
                        />
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            placeholder="required"
                        />
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label>Genre Id(integer from 1 to 13):</Form.Label>
                        <Form.Control
                            type="number"
                            value={genreid}
                            onChange={e => setGenreid(e.target.value)}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Poster URL:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={poster}
                            onChange={e => setPoster(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Website URL:</Form.Label>
                        <Form.Control
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Release Date:</Form.Label>
                        <Form.Control
                            value={release}
                            onChange={e => setRelease(e.target.value)}
                            placeholder="YYYY/MM/DD"
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Active:</Form.Label>
                        <Form.Select value={active} onChange={(e) => setActive(e.target.value)}>
                            <option value="N">N</option>
                            <option value="Y">Y</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={() => {
                            setTitle(''); setRating(''); setGenres(''); setPoster(''); setUrl(''); setRelease(''); setGenreid(''); setDescription(''); setActive('');
                            // "data" is the one sent back to "createMovie" and deposited to MySQL
                            let data = {
                                name: title,
                                description: description,
                                Release_Date: (release === null || release === undefined) ? "2022/03/09" : release,
                                Image_URL: poster,
                                GenreId: genreid,
                                Active: active
                            }
                            MovieDataService.createMovie(data).then(response => {
                                if (response.data) {
                                    setMovies([
                                        {
                                            id: nextId++, movie: title, imdb: rating, genres: genreidMap[genreid],
                                            small_posters: poster, links: url, release_date: release
                                        }, ...movies
                                    ]);
                                    props.onAdd([{
                                        id: nextId++, movie: title, imdb: rating, genres: genreidMap[genreid],
                                        small_posters: poster, links: url, release_date: release
                                    }, ...movies])
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
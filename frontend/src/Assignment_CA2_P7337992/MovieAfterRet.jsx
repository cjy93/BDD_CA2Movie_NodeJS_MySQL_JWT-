import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from './slices/filterfieldSlice';

export default function MovieRetrieve(props) {
    const dispatch = useDispatch();

    // Existing filtering parameters
    const filterConstraints = useSelector(function (store) {
        return store.filter.value
    })
    // State variables
    let date = filterConstraints.date;
    let genre = filterConstraints.genre;
    let rating = filterConstraints.rating;
    let searchInput = filterConstraints.searchInput;

    let uniqueGenre = props.uniqueGenre

    return (
        <>
            <Form.Group as={Col}>
                <Form.Label>Old/New:</Form.Label>
                <Form.Select value={date} onChange={(e) => { dispatch(filter({ date: e.target.value, genre: genre, rating: rating, searchInput: searchInput })) }}>
                    <option value="Old">Old movies</option>
                    <option value="New">New movies</option>
                    <option value="All">All movies</option>
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Genre:</Form.Label>
                <Form.Select value={genre} onChange={(e) => { dispatch(filter({ date: date, genre: e.target.value, rating: rating, searchInput: searchInput })) }}>
                    {uniqueGenre.map((n) => (
                        <option value={n}>{n}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Min Rating:</Form.Label>
                <Form.Control
                    type="number" // this alone can also prevent key in non numeric
                    defaultValue={rating}
                    onChange={(e) => { dispatch(filter({ date: date, genre: genre, rating: e.target.value, searchInput: searchInput })) }}
                    placeholder="required"
                    onKeyDown={(e) => restrictAlphabets(e)}
                />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Type movie name:</Form.Label>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => { e.preventDefault(); dispatch(filter({ date: date, genre: genre, rating: rating, searchInput: e.target.value })) }}
                    value={searchInput}
                    // filter(e => e.movie.toLowerCase().includes(String(searchInput).toLowerCase()))
                />
            </Form.Group>

        </>
    )
}
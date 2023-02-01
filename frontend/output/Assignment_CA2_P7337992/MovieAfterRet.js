import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { filter } from "./slices/filterfieldSlice.js";
export default function MovieRetrieve(props) {
  const dispatch = useDispatch();

  // Existing filtering parameters
  const filterConstraints = useSelector(function (store) {
    return store.filter.value;
  });
  // State variables
  let date = filterConstraints.date;
  let genre = filterConstraints.genre;
  let rating = filterConstraints.rating;
  let searchInput = filterConstraints.searchInput;
  let uniqueGenre = props.uniqueGenre;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Old/New:"), /*#__PURE__*/React.createElement(Form.Select, {
    value: date,
    onChange: e => {
      dispatch(filter({
        date: e.target.value,
        genre: genre,
        rating: rating,
        searchInput: searchInput
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "Old"
  }, "Old movies"), /*#__PURE__*/React.createElement("option", {
    value: "New"
  }, "New movies"), /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All movies"))), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Genre:"), /*#__PURE__*/React.createElement(Form.Select, {
    value: genre,
    onChange: e => {
      dispatch(filter({
        date: date,
        genre: e.target.value,
        rating: rating,
        searchInput: searchInput
      }));
    }
  }, uniqueGenre.map(n => /*#__PURE__*/React.createElement("option", {
    value: n
  }, n)))), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Min Rating:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number" // this alone can also prevent key in non numeric
    ,
    defaultValue: rating,
    onChange: e => {
      dispatch(filter({
        date: date,
        genre: genre,
        rating: e.target.value,
        searchInput: searchInput
      }));
    },
    placeholder: "required",
    onKeyDown: e => restrictAlphabets(e)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Type movie name:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "search",
    placeholder: "Search",
    className: "me-2",
    "aria-label": "Search",
    onChange: e => {
      e.preventDefault();
      dispatch(filter({
        date: date,
        genre: genre,
        rating: rating,
        searchInput: e.target.value
      }));
    },
    value: searchInput
    // filter(e => e.movie.toLowerCase().includes(String(searchInput).toLowerCase()))
  })));
}
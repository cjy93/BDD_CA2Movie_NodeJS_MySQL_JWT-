import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import MovieDataService from "../services.js";
export default function MovieAdd(props) {
  // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
  let nextId = props.movies.length - 1;
  // initialise the starting list of movies
  const [movies, setMovies] = React.useState(props.movies);

  // to ensure that the props.movies is propagated to movies on initial step
  React.useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);
  var genreidMap = {
    1: "Action",
    2: "Adventure",
    3: "Animation",
    4: "Comedy",
    5: "Crime",
    6: "Documentary",
    7: "Drama",
    8: "Fantasy",
    9: "Horror",
    10: "Mystery",
    11: "Romance",
    12: "Sci-Fi",
    13: "Sport"
  };
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
    console.log("keystroke");
    console.log(e);
    var x = e.keyCode;
    console.log(x);
    if (x >= 48 && x <= 57 || x == 190) {
      return true;
    } else {
      e.preventDefault(); // preventDefault to type if it is non numeric or "."
      return false;
    }
  }
  // Return form variables, with React Bootstrap styling
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Add your new movie details: "), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Title:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: title,
    onChange: e => setTitle(e.target.value),
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Rating:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number" // this alone can also prevent key in non numeric
    ,
    defaultValue: rating,
    onChange: e => setRating(e.target.value),
    placeholder: "required",
    onKeyDown: e => restrictAlphabets(e)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Description:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: description,
    onChange: e => setDescription(e.target.value),
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Genre Id(integer from 1 to 13):"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number",
    value: genreid,
    onChange: e => setGenreid(e.target.value),
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Poster URL:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: poster,
    onChange: e => setPoster(e.target.value)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Website URL:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: url,
    onChange: e => setUrl(e.target.value)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Release Date:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: release,
    onChange: e => setRelease(e.target.value),
    placeholder: "YYYY/MM/DD"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Active:"), /*#__PURE__*/React.createElement(Form.Select, {
    value: active,
    onChange: e => setActive(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "N"
  }, "N"), /*#__PURE__*/React.createElement("option", {
    value: "Y"
  }, "Y"))), /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      setTitle('');
      setRating('');
      setGenres('');
      setPoster('');
      setUrl('');
      setRelease('');
      setGenreid('');
      setDescription('');
      setActive('');
      // "data" is the one sent back to "createMovie" and deposited to MySQL
      let data = {
        name: title,
        description: description,
        Release_Date: release === null || release === undefined ? "2022/03/09" : release,
        Image_URL: poster,
        GenreId: genreid,
        Active: active
      };
      MovieDataService.createMovie(data).then(response => {
        if (response.data) {
          setMovies([{
            id: nextId++,
            movie: title,
            imdb: rating,
            genres: genreidMap[genreid],
            small_posters: poster,
            links: url,
            release_date: release
          }, ...movies]);
          props.onAdd([{
            id: nextId++,
            movie: title,
            imdb: rating,
            genres: genreidMap[genreid],
            small_posters: poster,
            links: url,
            release_date: release
          }, ...movies]);
        }
      });
    }
  }, "Add")))));
}
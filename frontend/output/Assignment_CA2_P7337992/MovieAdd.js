import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
// use the reducer "add"
import { useSelector, useDispatch } from 'react-redux';
import { add } from "./slices/movieSlice.js";
import { addfields } from "./slices/addFieldsSlice.js";
import MovieDataService from "../services.js";
export default function MovieAdd(props) {
  const dispatch = useDispatch();
  // Bringing in the movies from Parents as we will update the list
  const movies = props.movies;
  console.log("dispatched movies");
  console.log(movies);

  // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
  let nextId = movies.length - 1;

  // Existing parameters for the input boxes
  const addfield = useSelector(function (store) {
    return store.addfields.value;
  });
  let title = addfield.title;
  let description = addfield.description;
  let rating = addfield.rating;
  let genreId = addfield.genreId;
  let active = addfield.active;
  let poster = addfield.poster;
  let url = addfield.url;
  let release = addfield.release;
  // genreName just for this app display, but send genreId corresponding to genreName to backend
  const [genreName, setGenreName] = React.useState("");
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
  var genreNameMap = {
    "Action": 1,
    "Adventure": 2,
    "Animation": 3,
    "Comedy": 4,
    "Crime": 5,
    "Documentary": 6,
    "Drama": 7,
    "Fantasy": 8,
    "Horror": 9,
    "Mystery": 10,
    "Romance": 11,
    "Sci-Fi": 12,
    "Sport": 13
  };

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
  const keysGenre = Object.keys(genreNameMap);
  console.log("what are the keys");
  console.log(keysGenre);

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
    onChange: e => {
      dispatch(addfields({
        title: e.target.value,
        description: description,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: url,
        release: release,
        active: active
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Description:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: description,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: e.target.value,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: url,
        release: release,
        active: active
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Rating:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number" // this alone can also prevent key in non numeric
    ,
    defaultValue: rating,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: e.target.value,
        genreId: genreId,
        poster: poster,
        url: url,
        release: release,
        active: active
      }));
    },
    placeholder: "required",
    onKeyDown: e => restrictAlphabets(e)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Genres:"), /*#__PURE__*/React.createElement(Form.Select, {
    type: "Text",
    value: genreNameMap[genreId],
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: rating,
        genreId: genreNameMap[e.target.value],
        poster: poster,
        url: url,
        release: release,
        active: active
      }));
    },
    required: true,
    placeholder: "required"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Choose"
  }, "Choose"), keysGenre.map(function (object, i) {
    return /*#__PURE__*/React.createElement("option", {
      value: object
    }, " ", object);
  }))), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Poster URL:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: poster,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: rating,
        genreId: genreId,
        poster: e.target.value,
        url: url,
        release: release,
        active: active
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Website URL:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: url,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: e.target.value,
        release: release,
        active: active
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Release Date:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: release,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: url,
        release: e.target.value,
        active: active
      }));
    },
    placeholder: "YYYY-MM-DD",
    required: true
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Active:"), /*#__PURE__*/React.createElement(Form.Select, {
    value: active,
    onChange: e => {
      dispatch(addfields({
        title: title,
        description: description,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: url,
        release: release,
        active: e.target.value
      }));
    },
    placeholder: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "Choose"
  }, "Choose"), /*#__PURE__*/React.createElement("option", {
    value: "N"
  }, "N"), /*#__PURE__*/React.createElement("option", {
    value: "Y"
  }, "Y"))), /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      // Index for the new elements created by "Add" function. Users do not need to add index, the code will find the next empty integer via "nextId"
      let nextId = movies.length - 1;
      let newId = nextId++;
      // Update Redux
      dispatch(add({
        newId: newId,
        title: title,
        rating: rating,
        genreId: genreId,
        poster: poster,
        url: url,
        release: release
      }));

      // Update Database backend
      const bodyData = {
        name: title,
        description: description,
        imdb: rating,
        GenreId: genreId,
        Image_URL: poster,
        links: url,
        Release_Date: release,
        Active: active,
        GenreFull: genreidMap[genreId]
      };
      console.log("what are the added", bodyData);
      MovieDataService.createMovie(bodyData).then(response => {
        if (response.data) {
          console.log("what is the response");
          console.log(response);
        }
      });
    }
  }, "Add")))));
}
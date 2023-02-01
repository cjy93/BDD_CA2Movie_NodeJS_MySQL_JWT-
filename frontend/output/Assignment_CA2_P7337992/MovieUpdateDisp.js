// MovieUpdateDisp.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updatefield } from "./slices/updatefieldSlice.js";
import { Link } from 'react-router-dom';
export default function MoviePinDisp(props) {
  // list of all current movies, after filtered at "MovieUpdate.jsx"
  let movies = props.movies;
  // Call dispatch
  const dispatch = useDispatch();
  return /*#__PURE__*/React.createElement(React.Fragment, null, movies.map(function (movie, index) {
    const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
      md: "3"
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        width: '14rem'
      }
    }, /*#__PURE__*/React.createElement(Card.Img, {
      variant: "top",
      src: movie.small_posters
    }), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Title, {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement("a", {
      href: movie.links,
      target: "_blank"
    }, movie.movie)), /*#__PURE__*/React.createElement(Card.Text, {
      className: "text-dark"
    }, "[Date Released: ", movie.release_date, "] (", emoji, movie.imdb, "%)", /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        // Populate the input boxes once any movie is selected. 
        localStorage["movieUpdateId"] = movie['id'];
        // populate the fields
        dispatch(updatefield({
          id: parseInt(localStorage["movieUpdateId"]),
          title: movie.movie,
          rating: movie.imdb,
          genres: movie.genres,
          poster: movie.small_posters,
          url: movie.links,
          release: movie.release_date,
          year: movie.year,
          runtime: movie.runtime,
          actor1: movie.actor1,
          actor2: movie.actor2,
          actor3: movie.actor3,
          actor4: movie.actor4,
          actor1_pic: movie.actor1_pic,
          actor2_pic: movie.actor2_pic,
          actor3_pic: movie.actor3_pic,
          actor4_pic: movie.actor4_pic,
          youtube: movie.youtube,
          storyPlot: movie.storyPlot
        }));
      }
    }, "Select movie for update"), /*#__PURE__*/React.createElement(Link, {
      to: `/details/${movie['id']}`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        localStorage['movieId'] = movie['id'];
      }
    }, "Details page! \uD83D\uDCD4")))))));
  }));
}

//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/
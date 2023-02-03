import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { unpin } from "./slices/pinSlice.js";
export default function MoviePinDisp(props) {
  const dispatch = useDispatch();
  // pinned movie indexes
  const pinned = useSelector(function (store) {
    return store.pin.value;
  });
  // list of all current movies
  let movies = props.movies;
  // Pinned movies list
  let pinnedMovies = movies.filter(movie => pinned.includes(parseInt(movie.movieID)));
  return /*#__PURE__*/React.createElement(React.Fragment, null, pinnedMovies.map(function (movie, index) {
    const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
      md: "3"
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        width: '14rem'
      }
    }, /*#__PURE__*/React.createElement(Card.Img, {
      variant: "top",
      src: movie.Image_URL
    }), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Title, {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement("a", {
      href: movie.links,
      target: "_blank"
    }, movie.name)), /*#__PURE__*/React.createElement(Card.Text, {
      className: "text-dark"
    }, "[Date Released: ", movie.Release_Date, "] (", emoji, movie.imdb, "%)", /*#__PURE__*/React.createElement("button", {
      className: !pinned.includes(parseInt(movie.movieID)) ? 'hide' : '' // hide pin button if it is pinned
      ,
      onClick: () => {
        dispatch(unpin(movie));
        console.log(movie.movieID);
      }
    }, "Unpin \uD83D\uDCCC"))))));
  }));
}

//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/
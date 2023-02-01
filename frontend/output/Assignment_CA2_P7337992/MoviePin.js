import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MoviePinDisp from "./MoviePinDisp.js";
export default function MoviePin(props) {
  // Add the movies from final list
  const movies = useSelector(function (store) {
    return store.record.value;
  });
  // If not log in yet, provide message to ask to log in
  const logout = useSelector(function (store) {
    return store.page.value;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, logout && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "mt-5 text-sm-start text-md-center"
  }, "Pinned Movies"), /*#__PURE__*/React.createElement("p", {
    className: "mt-5 text-sm-start text-md-center"
  }, "Max of 5"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Container, {
    className: "p-3"
  }, /*#__PURE__*/React.createElement(Row, {
    xs: 1,
    md: 2,
    className: "g-4"
  }, /*#__PURE__*/React.createElement(MoviePinDisp, {
    movies: movies
  }))))), !logout && /*#__PURE__*/React.createElement("h1", null, "Please go to login page"));
}
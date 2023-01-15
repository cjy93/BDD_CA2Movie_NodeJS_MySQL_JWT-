import MovieList from "./MovieList.js";
import MovieAdd from "./MovieAdd.js";
import StartList from "./StartList.js";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Container } from 'react-bootstrap';

// Load in JSON file with Fetch (because file extention is ".json" type)
export default function ListMovies(props) {
  const [data, setData] = React.useState([]);
  const getData = () => {
    fetch('/frontend/dist/moviesList.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      console.log(myJson);
      setData(myJson); // data is updated
    });
  };
  // fetch data from getData() only once, must use useEffect(()=>{},[]) format to run fetch just once.
  React.useEffect(() => {
    getData();
    // convert the object of objects into a list of objects so i can use "map" function
  }, []);
  // Initial movie list is "my_list"
  const my_list = Object.values(data);
  // Update current movie list after initialisation
  const [newMovie, setNewMovie] = React.useState([]);
  // Run this so we can instantly pass `newMovie` to props.onMovie can pass to the parent "App_Assignment1_P7337992.jsx"
  props.onMovies(newMovie);
  // Return React Components
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "mt-5 text-sm-start text-md-center"
  }, "Movie Listings"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-5 text-sm-start text-md-center"
  }, "To Start, please click on Load initial Movies/ Reset button"), /*#__PURE__*/React.createElement(Container, {
    className: "mt-5 text-sm-start text-sm-left"
  }, /*#__PURE__*/React.createElement(StartList, {
    movies: my_list,
    onStart: movieStart => {
      setNewMovie(movieStart);
    }
  }), /*#__PURE__*/React.createElement(MovieAdd, {
    movies: newMovie,
    onAdd: movieAdd => {
      setNewMovie(movieAdd);
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(MovieList, {
    movies: newMovie,
    onDetails: props.onDetails
  }), /*#__PURE__*/React.createElement("br", null)));
}

// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
//  {/* Create Retrieve/filter movie section */}
//  <MovieHide movies={newMovie} onRetrieve={(movieAdd) => {
//     setNewMovie(movieAdd)
// }} /><br />
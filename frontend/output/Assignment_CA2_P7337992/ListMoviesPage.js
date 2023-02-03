import MovieList from "./MovieList.js";
import MovieAdd from "./MovieAdd.js";
import MovieRetrieve from "./MovieRetrieve.js";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { set } from "./slices/movieSlice.js";
import { login } from "./slices/pageSlice.js";
import { Link } from 'react-router-dom';
import MovieDataService from "../services.js"; // Load in JSON file with Fetch (because file extention is ".json" type)
export default function ListMovies(props) {
  const dispatch = useDispatch();
  // Pull out current "movies" list
  const movies = useSelector(function (store) {
    return store.record.value;
  });
  const logout = useSelector(function (store) {
    return store.page.value;
  });

  // Existing filtering parameters
  const filterConstraints = useSelector(function (store) {
    return store.filter.value;
  });
  let date = filterConstraints.date;
  let genre = filterConstraints.genre;
  let rating = filterConstraints.rating;
  let searchInput = filterConstraints.searchInput;

  // isFilterNone==true means nothing is filtered, and occurs when "genre"="None", "All movies" , rating=0
  let isFilterNone;
  if (date == "All" && genre == "None" && rating == 0 && searchInput == "") {
    isFilterNone = true;
  } else {
    isFilterNone = false;
  }

  // Update current movie list after initialisation
  let my_list;
  // Data fetch from standard JSON
  const getData = () => {
    // return list movies from axios fetch
    MovieDataService.allMovies().then(response => {
      if (response.data) {
        console.log("what is the response");
        console.log(response);
        if (response.status == 200) {
          my_list = Object.values(response.data);
          dispatch(set(my_list));
          console.log("movie received successfully from database");
        } else {
          console.log("nothing came in from database");
        }
      }
    });
    // fetch('/dist/moviesList.json'
    //     , {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }
    // )
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         // Initial movie list is "my_list"
    //         my_list = Object.values(myJson)
    //         console.log("what is my list")
    //         dispatch(set(my_list));
    //         console.log(dispatch(set(my_list)).payload)
    //     });
  };
  // fetch data from getData() only once, must use useEffect(()=>{},[]) format to run fetch just once.
  React.useEffect(() => {
    if (movies.length == 0) {
      getData();
    } else {
      // You do not want to load the data from new copy as you may have modified the list and then gone to another page and returned to ListMovies page causing list to re-render when return to <ListMovies> component. This code prevents rerender of original movie list
      console.log("There is already data loaded");
    }
    // convert the object of objects into a list of objects so i can use "map" function
  }, []);
  // Run this so we can instantly pass `newMovie` to props.onMovie can pass to the parent "App_Assignment1_P7337992.jsx"
  // props.onMovies(dispatch(set(my_list))) // for passing to details page
  // Return React Components
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, logout && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "mt-5 text-sm-start text-md-center"
  }, "Movie Listings"), /*#__PURE__*/React.createElement("h2", {
    className: "mt-5 text-sm-start text-md-center"
  }, "To Logout, please click this"), /*#__PURE__*/React.createElement(Container, {
    className: "mt-5 text-sm-start text-sm-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement(Link, {
    to: '/'
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      dispatch(login(logout));
    }
  }, "Logout"))), /*#__PURE__*/React.createElement(MovieAdd, {
    movies: movies
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(MovieRetrieve, {
    movies: movies,
    isFilterNone: isFilterNone
  }), /*#__PURE__*/React.createElement("br", null), isFilterNone && /*#__PURE__*/React.createElement(MovieList, {
    movies: movies
    // onDetails={props.onDetails}
  }), /*#__PURE__*/React.createElement("br", null))), !logout && /*#__PURE__*/React.createElement("h1", null, "Please go to Login page/ Credentials invalid"));
}

// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Row, Form, Button } from 'react-bootstrap';
import MovieAfterRet from "./MovieAfterRet.js";
import MovieList from "./MovieList.js";
import { useSelector } from 'react-redux';
export default function MovieRetrieve(props) {
  // Pull out current "movies" list because we only want to call "movies" from Slicer in the main page. Reason is when we add, delete or retrieve movies, we want the movies list in the slicer to be already modified.
  const movies = props.movies;
  let isFilterNone = props.isFilterNone;

  // Existing filtering parameters
  const filterConstraints = useSelector(function (store) {
    return store.filter.value;
  });
  // State variables
  let date = filterConstraints.date;
  let genre = filterConstraints.genre;
  let rating = filterConstraints.rating;
  let searchInput = filterConstraints.searchInput;

  //  Method 1: Filter states by older, newer and All movies.
  // Hypothetically set date before May 2022 as old
  const mappingDate = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11,
    "None": null
  }; // since my data came in the form `MMM DD, YYYY`

  // Create new list to store Old or New movies object
  let filteredOld = [];
  let filteredNew = [];
  //  Sort the movies into respective lists based on whether it was before May or after May (the month). ALl movies are from 2022, so no need to sort by year.
  movies.forEach(function (movie, index) {
    // Use "try" "catch" incase variable movie.release_date is null
    if (movie.release_date.length > 0) {
      if (mappingDate[movie.release_date.substr(0, 3)] > 3) {
        // pull out first 3 characters of a string
        filteredNew.push(movie);
      } else if (mappingDate[movie.release_date.substr(0, 3)] <= 3) {
        filteredOld.push(movie);
      }
    } else {
      // if the release date is not given(for example, those created under ADD function), we assume they are old movies
      filteredOld.push(movie);
    }
  });
  // Based on "Old"/ "New"/"All" preference, give the first level filtered list
  var filteredLevel1 = date == "Old" ? filteredOld : date == "New" ? filteredNew : props.movies;

  // Method 2: Filter states by Genre    
  // function input date will determine what list to extract the remaining genres available
  const getGenreList = date => {
    // Based on the remaining filteredLevel1 list out of all the movies, retrieve the available genre options
    // Gather all the genres
    let allRemainGenres = [];
    let filteredList = [];
    if (date == "Old") {
      filteredList = filteredOld;
    } else if (date == "New") {
      filteredList = filteredNew;
    } else {
      filteredList = props.movies;
    }
    if (filteredList.length > 0) {
      filteredList.forEach(function (movie, index) {
        // split by commas and strip empty spaces. There are genre data that appears like "Action, Thriller, Comedy" instead of just single genre like "Action"
        const myArray = movie.genres.split(",").map(item => item.trim());
        // push the list of genres into an overall list
        allRemainGenres.push(myArray);
      });
      // Flatten the list (since each movie gives a list of genres)
      let flatGenres = [].concat.apply([], allRemainGenres);
      // Keep Unique list and sort in alphabetical order
      var uniqueGenre = [...new Set(flatGenres)].sort();
      // Add a "None" option in case users does not want to filter by any Genre
      uniqueGenre = [...uniqueGenre, "None"];
    } else {
      var uniqueGenre = ["None"];
    }
    return uniqueGenre;
  }; // end of function getGenreList
  // Call the function once, so you can pass this list to the next function which requires to know the available Genres based on "Date" filter.
  let uniqueGenre = getGenreList(date);
  let filteredList2 = [];
  if (filteredLevel1.length > 0) {
    filteredLevel1.forEach(function (movie, index) {
      // take each movie.genre as a string.
      // As some of them have more than one genre, it is troublesome to do exact string match. So, do a substring match
      if (movie.genres.includes(genre) && genre != "None") {
        filteredList2.push(movie);
      }
    });

    // Based on whether genre is "None" or not, will choose diff filtered list. If Genre chosen is "None", return the output from first level filter, else return the output after first and second level filtering
    var filteredLevel2 = genre == "None" ? filteredLevel1 : filteredList2;
  } else {
    var filteredLevel2 = [];
  }

  //  Method 3: Filter states by Rating
  let filteredList3 = [];
  if (filteredLevel2.length > 0) {
    filteredLevel2.forEach(function (movie, index) {
      // take each movie.genre as a string.
      // As some of them have more than one genre, it is troublesome to do exact string match. So, do a substring match
      if (movie.imdb > rating) {
        filteredList3.push(movie); // can change to filter function
      }
    });

    var filteredLevel3 = filteredList3;
  } else {
    var filteredLevel3 = [];
  }

  // Method 4: Search by movie name
  let filteredList4 = [];
  var filteredLevel4 = [];
  if (filteredLevel3.length > 0) {
    filteredLevel3.forEach(function (movie, index) {
      if (movie.movie.toLowerCase().includes(String(searchInput).toLowerCase())) {
        filteredLevel4.push(movie);
      }
    });
  } else if (filteredLevel2.length > 0) {
    // Only reason if filteredLevel3 is empty is if filteredLevel1 is empty. Do need check filteredLevel1 as filteredLevel2 as it is build on top of filterlevel1
    movies.forEach(function (movie1, index) {
      if (movie1.movie.toLowerCase().includes(String(searchInput).toLowerCase())) {
        filteredList4.push(movie1);
      }
    });
    var filteredLevel4 = filteredList4;
  } else {
    var filteredLevel4 = [];
  }
  console.log("filteredLevel3", filteredLevel3);
  console.log("searchInput", searchInput);
  console.log("filteredLevel4", filteredLevel4);
  // Pass the filteredLevel4 as the final output to frontend

  // Return section UI form
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formFilter"
  }, /*#__PURE__*/React.createElement("h2", null, "Retrieve Movies: ")), /*#__PURE__*/React.createElement(MovieAfterRet, {
    uniqueGenre: uniqueGenre
  }))), !isFilterNone && /*#__PURE__*/React.createElement(MovieList, {
    movies: filteredLevel4
  }));
}
;

// Reference on how to form a mapped selet input on React: https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
// Reference on how come sometimes you cannot call "forEach" on some lists: https://java2blog.com/typeerror-foreach-is-not-function-javascript/#:~:text=foreach%20is%20not%20a%20function%20occurs%20when%20we%20call%20foreach,on%20object%20or%20use%20Array.

// EXTRA codes
// const genres = ['Action',
//         'Adventure',
//         'Animation',
//         'Biography',
//         'Comedy',
//         'Crime',
//         'Documentary',
//         'Drama',
//         'Family',
//         'Fantasy',
//         'Film Noir',
//         'History',
//         'Horror',
//         'Music',
//         'Musical',
//         'Mystery',
//         'Romance',
//         'Sci-Fi',
//         'Short',
//         'Sport',
//         'Superhero',
//         'Thriller',
//         'War',
//         'Western',
//         "None"]
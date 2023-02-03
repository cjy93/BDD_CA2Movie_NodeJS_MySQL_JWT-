import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
export default function DetailsPage(props) {
  const dispatch = useDispatch();
  // Pull out current "movies" list
  try {
    var logout = useSelector(function (store) {
      return store.page.value;
    });
    const movies = useSelector(function (store) {
      return store.record.value;
    });
    console.log("calling in DetailsPage");
    // Selected movie index
    if (localStorage["movieId"] == undefined) {
      var i = 0;
    } else {
      var i = localStorage["movieId"];
    }
    console.log("movieID");
    console.log(localStorage["movieId"]);

    // Filter the movie based on its "id" since we have kept the selected movie by movieId equals to component id

    let temp = movies.filter(movie => movie.movieID == localStorage["movieId"]);
    var chosenMovie = temp[0]; // take the solo element out of the list
    console.log("chosenMovie");
    console.log(chosenMovie[0]);
    // If the movie list "movies" is not empty, find these variables    
    try {
      // declare the variables you want to display
      console.log("successfully creating all the page variables");
      var id = chosenMovie.movieID;
      var name = chosenMovie.name;
      var year = chosenMovie.year;
      var rating = chosenMovie.imdb;
      var runtime = chosenMovie.runtime;
      var genres = chosenMovie.GenreFull;
      var storyPlot = chosenMovie.storyPlot;
      var actor1 = chosenMovie.actor1;
      var actor2 = chosenMovie.actor2;
      var actor3 = chosenMovie.actor3;
      var actor4 = chosenMovie.actor4;
      var actor1_as = chosenMovie.actor1_as;
      var actor2_as = chosenMovie.actor2_as;
      var actor3_as = chosenMovie.actor3_as;
      var actor4_as = chosenMovie.actor4_as;
      var actor1_link = chosenMovie.actor1_link;
      var actor2_link = chosenMovie.actor2_link;
      var actor3_link = chosenMovie.actor3_link;
      var actor4_link = chosenMovie.actor4_link;
      var actor1_pic = chosenMovie.actor1_pic;
      var actor2_pic = chosenMovie.actor2_pic;
      var actor3_pic = chosenMovie.actor3_pic;
      var actor4_pic = chosenMovie.actor4_pic;
      var movie_link = chosenMovie.links;
      var youtube = chosenMovie.youtube;
      var release_date = chosenMovie.Release_Date;
      var poster = chosenMovie.Image_URL;
      var plot = chosenMovie.Plot;
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("There is error to find Movie list");
        console.log(e);
        console.log(movie == undefined);
      }
    }
  } catch {
    console.log("Please choose a movie!");
    var logout = useSelector(function (store) {
      return store.page.value;
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, logout && /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("h1", {
    className: "mt-5 text-center"
  }, "Details page!"), /*#__PURE__*/React.createElement("div", {
    class: "text-center"
  }, /*#__PURE__*/React.createElement(Link, {
    to: '/movies'
  }, /*#__PURE__*/React.createElement(Button, {
    style: {
      "margin-right": 16
    },
    variant: "primary",
    className: "text-center",
    onClick: () => {}
  }, "Back To Movie List")), /*#__PURE__*/React.createElement(Link, {
    to: '/update'
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    className: "text-center",
    onClick: () => {}
  }, "Back To Update Page"))), /*#__PURE__*/React.createElement("div", {
    class: "container-fluid mt-5 pt-5 mb-5 pb-5"
  }, /*#__PURE__*/React.createElement("div", {
    class: "row"
  }, /*#__PURE__*/React.createElement("div", {
    class: "col-md-12 text-center display-4"
  }, "Movie Details")), /*#__PURE__*/React.createElement("div", {
    class: "row mt-0"
  }, /*#__PURE__*/React.createElement("div", {
    class: "col-md-3 mb-5 mx-3 recommendations"
  }, /*#__PURE__*/React.createElement("div", {
    class: "card h-150 text-white bg-dark mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    class: "card-body"
  }, /*#__PURE__*/React.createElement("h3", null, "Recommendations"), /*#__PURE__*/React.createElement("div", {
    class: "recommendedPics"
  }, /*#__PURE__*/React.createElement("a", {
    "data-bs-toggle": "tooltip",
    title: "Click me!",
    href: "https://www.youtube.com/embed/giXco2jaZ_4"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://m.media-amazon.com/images/M/MV5BMmIwZDMyYWUtNTU0ZS00ODJhLTg2ZmEtMTk5ZmYzODcxODYxXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UY209_CR0,0,140,209_AL_.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, "Top Gun: Maverick"))), /*#__PURE__*/React.createElement("div", {
    class: "recommendedPics"
  }, /*#__PURE__*/React.createElement("a", {
    "data-bs-toggle": "tooltip",
    title: "Click me!",
    href: "https://www.youtube.com/embed/aWzlQ2N6qqg"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY209_CR0,0,140,209_AL_.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, "Doctor Strange in the Multiverse of Madness"))), /*#__PURE__*/React.createElement("div", {
    class: "recommendedPics"
  }, /*#__PURE__*/React.createElement("a", {
    "data-bs-toggle": "tooltip",
    title: "Click me!",
    href: "https://www.youtube.com/embed/mqqft2x_Aa4"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_UY209_CR0,0,140,209_AL_.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, "The Batman"))), /*#__PURE__*/React.createElement("div", {
    class: "recommendedPics"
  }, /*#__PURE__*/React.createElement("a", {
    "data-bs-toggle": "tooltip",
    title: "Click me!",
    href: "https://www.youtube.com/embed/nM4iy0reaCA"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://m.media-amazon.com/images/M/MV5BYjdhYTE3NjMtZjI3OC00NzVlLWFiNTUtNzQ3NDNiNTI3NDg4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UY209_CR0,0,140,209_AL_.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, "Hustle"))), /*#__PURE__*/React.createElement("div", {
    class: "recommendedPics"
  }, /*#__PURE__*/React.createElement("a", {
    "data-bs-toggle": "tooltip",
    title: "Click me!",
    href: "https://www.youtube.com/embed/ye63hQLDj4k"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://m.media-amazon.com/images/M/MV5BOGI5N2FhNzktZjZlNi00MmRjLWE1MmUtNjRlNzQyOGMzYjNhXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UY209_CR0,0,140,209_AL_.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, "Memory")))))), /*#__PURE__*/React.createElement("div", {
    class: "col-md-5 mb-5 mainBody"
  }, /*#__PURE__*/React.createElement("div", {
    class: "row mt-0"
  }, /*#__PURE__*/React.createElement("div", {
    class: "col-md-12 mb-5 mx-3 "
  }, /*#__PURE__*/React.createElement("div", {
    class: "card h-150 bg-dark"
  }, /*#__PURE__*/React.createElement("div", {
    class: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    class: "text-md-center",
    id: "title_and_year"
  }), /*#__PURE__*/React.createElement("section", {
    class: "container",
    id: "details1"
  }, /*#__PURE__*/React.createElement("div", {
    id: "poster",
    class: "text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: movie_link
  }, /*#__PURE__*/React.createElement("img", {
    src: poster,
    style: {
      'height': 300
    }
  })), /*#__PURE__*/React.createElement("h3", null, "Movie: ", name, " (", year, ")"), /*#__PURE__*/React.createElement("h2", {
    class: "text-sm-start text-md-center border mt-0"
  }, "Movie Details"), /*#__PURE__*/React.createElement("h4", null, "Genres: ", genres))), /*#__PURE__*/React.createElement("section", {
    className: "container",
    id: "details2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Embeds Page",
    className: "embed-responsive-item",
    src: youtube,
    allowFullScreen: true
  })), /*#__PURE__*/React.createElement("div", {
    id: "release_date",
    class: "text-center",
    className: "text-center"
  }, "Release Date: ", release_date), /*#__PURE__*/React.createElement("div", {
    id: "storyPlot",
    class: "text-center col-sm-4 mx-auto"
  }, "StoryPlot: ", storyPlot), /*#__PURE__*/React.createElement("div", {
    id: "rating",
    class: "text-center"
  }, "Rating: ", rating), /*#__PURE__*/React.createElement("div", {
    id: "timing",
    class: "text-center"
  }, "Runtime: ", runtime)), /*#__PURE__*/React.createElement("section", {
    class: "container",
    id: "details3"
  }, /*#__PURE__*/React.createElement("div", {
    id: "reviews",
    class: "text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    class: "text-sm-start text-md-center border mt-0"
  }, "Reviews and Full Plot"), plot))))))), /*#__PURE__*/React.createElement("div", {
    class: "col-md-3 mb-5 mx-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "card h-150  bg-dark"
  }, /*#__PURE__*/React.createElement("div", {
    class: "card-body"
  }, /*#__PURE__*/React.createElement("section", {
    class: "container",
    id: "details3"
  }, /*#__PURE__*/React.createElement("div", {
    id: "director",
    class: "text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    class: "text-sm-start text-md-center border mt-0"
  }, "Actors")), /*#__PURE__*/React.createElement("div", {
    id: "actors",
    class: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    id: "actor1",
    class: "col-1-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "actorPics"
  }, /*#__PURE__*/React.createElement("a", {
    href: actor1_link
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      'width': 150
    },
    src: actor1_pic
  }))), /*#__PURE__*/React.createElement("div", {
    class: "actorNames"
  }, actor1), /*#__PURE__*/React.createElement("div", {
    class: "actorAs",
    style: {
      fontSize: '0.8em'
    }
  }, actor1_as)), /*#__PURE__*/React.createElement("div", {
    id: "actor2",
    class: "col-1-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "actorPics"
  }, /*#__PURE__*/React.createElement("a", {
    href: actor2_link
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      'width': 150
    },
    src: actor2_pic
  }))), /*#__PURE__*/React.createElement("div", {
    class: "actorNames"
  }, actor2), /*#__PURE__*/React.createElement("div", {
    class: "actorAs",
    style: {
      fontSize: '0.8em'
    }
  }, actor2_as)), /*#__PURE__*/React.createElement("div", {
    id: "actor3",
    class: "col-1-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "actorPics"
  }, /*#__PURE__*/React.createElement("a", {
    href: actor3_link
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      'width': 150
    },
    src: actor3_pic
  }))), /*#__PURE__*/React.createElement("div", {
    class: "actorNames"
  }, actor3), /*#__PURE__*/React.createElement("div", {
    class: "actorAs",
    style: {
      fontSize: '0.8em'
    }
  }, actor3_as)), /*#__PURE__*/React.createElement("div", {
    id: "actor4",
    class: "col-1-4"
  }, /*#__PURE__*/React.createElement("div", {
    class: "actorPics"
  }, /*#__PURE__*/React.createElement("a", {
    href: actor4_link
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      'width': 150
    },
    src: actor4_pic
  }))), /*#__PURE__*/React.createElement("div", {
    class: "actorNames"
  }, actor4), /*#__PURE__*/React.createElement("div", {
    class: "actorAs",
    style: {
      fontSize: '0.8em'
    }
  }, actor4_as)))))))))), !logout && /*#__PURE__*/React.createElement("h1", null, "Please go to Login Page"));
}

// Reference for Redirect pages: https://www.delftstack.com/howto/react/onclick-redirect-react/
// Configure webpack css-loader and style-loader: https://blog.jakoblind.no/css-modules-webpack/
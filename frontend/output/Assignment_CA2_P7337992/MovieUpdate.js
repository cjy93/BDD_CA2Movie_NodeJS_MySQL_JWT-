// MovieUpdate.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Col, Card, Form, Container, Row, Accordion } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MovieUpdateDisp from "./MovieUpdateDisp.js";
import { updatefield } from "./slices/updatefieldSlice.js";
import { update } from "./slices/movieSlice.js";
import MovieDataService from "../services.js";
export default function MovieUpdate(props) {
  const dispatch = useDispatch();
  // Add the movies from final list
  const movies = useSelector(function (store) {
    return store.record.value;
  });
  // If not log in yet, provide message to ask to log in
  const logout = useSelector(function (store) {
    return store.page.value;
  });
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
  const keysGenre = Object.keys(genreNameMap);

  // Existing parameters for the input boxes
  const updateField = useSelector(function (store) {
    return store.updatefield.value;
  });
  let id = updateField.id;
  let description = updateField.description;
  let title = updateField.title;
  let rating = updateField.rating;
  let genreId = updateField.genreId;
  let poster = updateField.poster;
  let url = updateField.url;
  let release = updateField.release;
  let active = updateField.active;
  // Optional fields
  let year = updateField.year;
  let runtime = updateField.runtime;
  let storyPlot = updateField.storyPlot;
  let actor1 = updateField.actor1;
  let actor2 = updateField.actor2;
  let actor3 = updateField.actor3;
  let actor4 = updateField.actor4;
  let actor1_as = updateField.actor1_as;
  let actor2_as = updateField.actor2_as;
  let actor3_as = updateField.actor3_as;
  let actor4_as = updateField.actor4_as;
  let actor1_link = updateField.actor1_link;
  let actor2_link = updateField.actor2_link;
  let actor3_link = updateField.actor3_link;
  let actor4_link = updateField.actor4_link;
  let actor1_pic = updateField.actor1_pic;
  let actor2_pic = updateField.actor2_pic;
  let actor3_pic = updateField.actor3_pic;
  let actor4_pic = updateField.actor4_pic;
  let youtube = updateField.youtube;
  let plot = updateField.plot;

  // Write object(once) to add to dispatch. We "spread" this object when we need to update the key value pair, for simpler writing in the input fields below.
  var fields = {
    id: id,
    description: description,
    title: title,
    rating: rating,
    genreId: genreId,
    poster: poster,
    url: url,
    release: release,
    active: active,
    runtime: runtime,
    year: year,
    storyPlot: storyPlot,
    actor1: actor1,
    actor2: actor2,
    actor3: actor3,
    actor4: actor4,
    actor1_as: actor1_as,
    actor2_as: actor2_as,
    actor3_as: actor3_as,
    actor4_as: actor4_as,
    actor1_link: actor1_link,
    actor2_link: actor2_link,
    actor3_link: actor3_link,
    actor4_link: actor4_link,
    actor1_pic: actor1_pic,
    actor2_pic: actor2_pic,
    actor3_pic: actor3_pic,
    actor4_pic: actor4_pic,
    youtube: youtube
  };

  // Search box, search by Movie name
  const [searchInput, setSearchInput] = React.useState("");
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  if (searchInput.length > 0) {
    var passNext = movies.filter(e => e.movie.toLowerCase().includes(String(searchInput).toLowerCase()));
  } else {
    var passNext = movies;
  }
  ;
  return /*#__PURE__*/React.createElement(React.Fragment, null, logout && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "mt-5 text-sm-start text-md-center"
  }, "Update Movies"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Container, {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("h2", null, "Search for the movie"), /*#__PURE__*/React.createElement(Form, {
    className: "d-flex me-auto my-2 my-lg-4"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Type movie name:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "search",
    placeholder: "Search",
    className: "me-2",
    "aria-label": "Search",
    onChange: handleChange,
    value: searchInput
  })), /*#__PURE__*/React.createElement("h2", null, "Click on one of \"Select Movie for Updates\" and edit the fields:"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Title:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: title,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        title: e.target.value
      }));
      console.log(dispatch(updatefield({
        ...fields,
        title: e.target.value
      })));
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
      dispatch(updatefield({
        ...fields,
        description: e.target.value
      }));
      console.log(dispatch(updatefield({
        ...fields,
        description: e.target.value
      })));
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
      dispatch(updatefield({
        ...fields,
        rating: e.target.value
      }));
    },
    placeholder: "required",
    onKeyDown: e => restrictAlphabets(e)
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Genre:"), /*#__PURE__*/React.createElement(Form.Select, {
    type: "Text",
    value: genreNameMap[genreId],
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        genreId: genreNameMap[e.target.value]
      }));
      console.log("what is the chosen genre id", genreNameMap[genreId]);
      console.log("what is the chosen genre value", genreNameMap[e.target.value]);
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
      dispatch(updatefield({
        ...fields,
        poster: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Website URL:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: url,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        url: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Release Date:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: release,
    type: "Date",
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        release: e.target.value
      }));
    },
    placeholder: "YYYY-MM-DD"
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Active:"), /*#__PURE__*/React.createElement(Form.Select, {
    value: active,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        active: e.target.value
      }));
    },
    placeholder: "Choose"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Choose"
  }, "Choose"), /*#__PURE__*/React.createElement("option", {
    value: "N"
  }, "N"), /*#__PURE__*/React.createElement("option", {
    value: "Y"
  }, "Y"))), /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      // Update Database backend
      const bodyData = {
        movieID: id,
        name: title,
        description: description,
        imdb: rating,
        GenreId: genreId,
        Image_URL: poster,
        links: url,
        Release_Date: release,
        Active: active,
        GenreFull: genreidMap[genreId],
        year: year,
        runtime: runtime,
        actor1: actor1,
        actor2: actor2,
        actor3: actor3,
        actor4: actor4,
        actor1_pic: actor1_pic,
        actor2_pic: actor2_pic,
        actor3_pic: actor3_pic,
        actor4_pic: actor4_pic,
        youtube: youtube,
        storyPlot: storyPlot
      }; // "index" for is req.params
      console.log("what is put to updatemovie?", bodyData);
      MovieDataService.updateMovie(bodyData, id).then(response => {
        console.log("what is the response");
        console.log(response);
      });
      // Update Redux list
      dispatch(update(updateField));
    }
  }, "Update")))), /*#__PURE__*/React.createElement(Accordion, {
    className: "my-2 my-lg-4",
    flush: true
  }, /*#__PURE__*/React.createElement(Accordion.Item, {
    eventKey: "0"
  }, /*#__PURE__*/React.createElement(Accordion.Header, null, /*#__PURE__*/React.createElement("h3", null, "Click to unhide more fields")), /*#__PURE__*/React.createElement(Accordion.Body, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Year:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number",
    value: year,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        year: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Runtime:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "number" // this alone can also prevent key in non numeric
    ,
    defaultValue: runtime,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        runtime: e.target.value
      }));
    },
    onKeyDown: e => restrictAlphabets(e)
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor1:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: actor1,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor1: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor2:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: actor2,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor2: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor3:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor3,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor3: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor4:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor4,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor4: e.target.value
      }));
    }
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor1_pic:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor1_pic,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor1_pic: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor2_pic:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor2_pic,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor2_pic: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor3_pic:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor3_pic,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor3_pic: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "actor4_pic:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: actor4_pic,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        actor4_pic: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "youtube:"), /*#__PURE__*/React.createElement(Form.Control, {
    value: youtube,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        youtube: e.target.value
      }));
    }
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "StoryPlot:"), /*#__PURE__*/React.createElement(Form.Control, {
    as: "textarea",
    value: storyPlot,
    onChange: e => {
      dispatch(updatefield({
        ...fields,
        storyPlot: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: e => {
      // Update Database backend
      const bodyData = {
        movieID: id,
        name: title,
        description: description,
        imdb: rating,
        GenreId: genreId,
        Image_URL: poster,
        links: url,
        Release_Date: release,
        Active: active,
        GenreFull: genreidMap[genreId],
        year: year,
        runtime: runtime,
        actor1: actor1,
        actor2: actor2,
        actor3: actor3,
        actor4: actor4,
        actor1_pic: actor1_pic,
        actor2_pic: actor2_pic,
        actor3_pic: actor3_pic,
        actor4_pic: actor4_pic,
        youtube: youtube,
        storyPlot: storyPlot
      };
      // second param for is req.params
      MovieDataService.updateMovie(bodyData, id).then(response => {
        if (response.data) {
          console.log("what is the response");
          console.log(response);
        }
      });
      // Update "update" for Redux
      dispatch(update(updateField));
      // Update "update" for database
    }
  }, "Update"))))))), /*#__PURE__*/React.createElement(Row, {
    xs: 1,
    md: 2,
    className: "g-4"
  }, /*#__PURE__*/React.createElement(MovieUpdateDisp, {
    movies: passNext
  }))))), !logout && /*#__PURE__*/React.createElement("h1", null, "Please go to login page"));
}
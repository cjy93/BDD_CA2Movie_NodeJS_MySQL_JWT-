import React from 'react';
export default function StartList(props) {
  // initialise the starting list of movies
  const [movies, setMovies] = React.useState(props.movies);
  // to ensure that the props.movies is propagated to movies on initial step
  React.useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);
  console.log("initial movies at INITPAGE file");
  console.log(movies);

  // Return frontend with button for Load Initial Movies/Reset
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    class: "text-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success text-sm-start text-md-center",
    onClick: () => {
      props.onStart([...movies]);
    }
  }, "Load Initial Movies/ Reset")), /*#__PURE__*/React.createElement("br", null));
}
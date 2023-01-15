import React from 'react';
export default function Movie(props) {
  // update onDetails to pass to parent
  const [isDetails, setIsDetails] = React.useState(false);
  const emoji = props.rating >= 5 ? '👍' : props.rating < 5 ? '👎' : '❓';
  return /*#__PURE__*/React.createElement("li", {
    style: {
      listStyleType: "none"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: props.url
  }, /*#__PURE__*/React.createElement("img", {
    src: props.small_posters,
    alt: props.movie
  })), /*#__PURE__*/React.createElement("a", {
    href: props.url
  }, props.title), " [Date Released: ", props.release, "] (", emoji, props.rating, "%)", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      props.onDetails(isDetails);
      setIsDetails(!isDetails);
      localStorage['movieId'] = props.serialNum;
    }
  }, "Details page!"));
}

// Reference for onClick button: https://contactmentor.com/add-onclick-reactjs-parameters/
// Reference for switch pages based on Submit: https://contactmentor.com/add-onclick-reactjs-parameters/
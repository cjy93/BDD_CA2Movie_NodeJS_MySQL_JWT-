import DetailsPage from "./DetailsPage.js";
import React from 'react';
export default function Movie(props) {
  const [goBack, setGoBack] = React.useState(true);

  // update states with user inputs
  const handleReviewsPage = () => {
    setGoBack(false);
  };
  const handleBack = () => {
    setGoBack(true);
  };
  const emoji = props.rating >= 5 ? '👍' : props.rating < 5 ? '👎' : '❓';

  // Go to Details page
  const renderGoReviews = /*#__PURE__*/React.createElement("li", {
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
    onClick: handleReviewsPage
  }, "Details page!"));
  const renderGoBack = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailsPage, null), /*#__PURE__*/React.createElement("button", {
    onClick: handleBack
  }, "Go Back"));
  return /*#__PURE__*/React.createElement("div", null, goBack ? renderGoReviews : renderGoBack);
}

// This version will go to Details page in each of the listing area (the listings)
// Reference for onClick button: https://contactmentor.com/add-onclick-reactjs-parameters/
// Reference for switch pages based on Submit: https://contactmentor.com/add-onclick-reactjs-parameters/
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Card, Form } from 'react-bootstrap';
export default function MovieDelete(props) {
  // update onDetails to pass to parent
  const [isDetails, setIsDetails] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.movies.map(function (movie, index) {
    const emoji = movie.imdb >= 5 ? '👍' : movie.imdb < 5 ? '👎' : '❓';
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
      md: "3"
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        width: '14rem'
      }
    }, /*#__PURE__*/React.createElement(Card.Img, {
      variant: "top",
      src: movie.small_posters
    }), /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Title, {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement("a", {
      href: movie.links
    }, movie.movie)), /*#__PURE__*/React.createElement(Card.Text, {
      className: "text-dark"
    }, "[Date Released: ", movie.release_date, "] (", emoji, movie.imdb, "%)", /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        props.onDetails(isDetails);
        setIsDetails(!isDetails);
        localStorage['movieId'] = movie.id;
      }
    }, "Details page!")), /*#__PURE__*/React.createElement("button", {
      variant: "primary",
      onClick: () => props.onDelete(index)
    }, "Delete"), /*#__PURE__*/React.createElement(BoxClicked, {
      className: "text-dark",
      index: index,
      onChecked: e => {
        props.onChecked(e);
      }
    })))));
  }));
  function BoxClicked(props) {
    // If the checkbox is checked, changed "checked" to true.
    const [checked, setChecked] = React.useState(false);
    // If the checkbox is unchecked(after checked), register in a 
    return /*#__PURE__*/React.createElement("div", {
      className: "text-dark"
    }, /*#__PURE__*/React.createElement(Form.Check, {
      type: "checkbox",
      label: "Add to delete list",
      className: "text-dark",
      defaultChecked: checked // checked={checked}
      ,
      onChange: () => {
        setChecked(!checked); // To change the existing checked status back to parent as this is a shared state. First function in onChange
        props.onChecked(props.index); // To pass the index of selected checkbox back to parent. Second function in onChange
      }
    }));
  }

  ;
}

//Reference for writing card components bootstrap: https://react-bootstrap.github.io/components/cards/
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'react-bootstrap';
export default function MovieDeleteMany(props) {
  // Return the "Delete Selected" button back to "MovieList.jsx"
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Form.Group, {
    className: "mb-3",
    controlId: "formDelete"
  }, /*#__PURE__*/React.createElement("h2", null, "Delete those selected: "), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => props.deleteSel()
  }, "Delete selected"))));
}
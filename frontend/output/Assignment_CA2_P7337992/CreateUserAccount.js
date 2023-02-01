import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// use the reducer "userAccount"
import { addUser } from "./slices/userAccountSlice.js";
import { userfield } from "./slices/userfieldSlice.js";
import { Link } from 'react-router-dom';
export default function CreateUserAccount(props) {
  const dispatch = useDispatch();
  // Existing username and password fields
  const userFields = useSelector(function (store) {
    return store.userfields.value;
  });
  let username = userFields.username;
  let password = userFields.password;
  // Boolean operator to check if user is created. true = created
  const [created, setCreated] = React.useState(false);

  // Return form variables, with React Bootstrap styling
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form, {
    className: "me-5 ms-5"
  }, /*#__PURE__*/React.createElement("h2", null, "Create New Users Here: "), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Username:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: username,
    onChange: e => {
      dispatch(userfield({
        username: e.target.value,
        password: password
      }));
    },
    required: true,
    placeholder: "required"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Password:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "text",
    defaultValue: password,
    onChange: e => {
      dispatch(userfield({
        username: username,
        password: e.target.value
      }));
    },
    placeholder: "required"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, !created && /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      dispatch(addUser({
        username: username,
        password: password
      }));
      // If user is created, change to true
      setCreated(true);
      // Checks if user is created. If created, display this below
    }
  }, "Create New Account"))), created && /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("h1", null, "Account created! Go to Login Page!"), /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "success"
  }, "Login")))));
}
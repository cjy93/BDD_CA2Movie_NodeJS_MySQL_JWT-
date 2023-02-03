import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// use the reducer "userAccount"
import { addUser } from "./slices/userAccountSlice.js";
import { userfield } from "./slices/userfieldSlice.js";
import { Link } from 'react-router-dom';
import MovieDataService from "../services.js";
export default function CreateUserAccount(props) {
  const dispatch = useDispatch();
  // Existing username and password fields
  const userFields = useSelector(function (store) {
    return store.userfields.value;
  });
  let email = userFields.email;
  let password = userFields.password;
  let role = userFields.role;
  let name = userFields.name;
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
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Email:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: email,
    onChange: e => {
      dispatch(userfield({
        email: e.target.value,
        password: password,
        role: role,
        name: name
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
        email: email,
        password: e.target.value,
        role: role,
        name: name
      }));
    },
    placeholder: "required"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Role:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: role,
    onChange: e => {
      dispatch(userfield({
        email: email,
        password: password,
        role: e.target.value,
        name: name
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  })), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    as: Col,
    className: "mb-3",
    controlId: "formAdd"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Name:"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "Text",
    value: name,
    onChange: e => {
      dispatch(userfield({
        email: email,
        password: password,
        role: role,
        name: e.target.value
      }));
    },
    required: true,
    placeholder: "required"
  })), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  })), /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, !created && /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      // To update Redux frontend
      dispatch(addUser({
        email: email,
        password: password,
        role: role,
        name: name
      }));
      // If user is created, change to true
      setCreated(true);
      // To update SQL database backend
      let bodyData = {
        email: email,
        password: password,
        role: role,
        name: name
      };
      console.log("what is in bodyData", bodyData);
      MovieDataService.createUser(bodyData).then(response => {
        if (response.data) {
          console.log("what is the response");
          console.log(response);
        }
      });
    }
  }, "Create New Account"))), created && /*#__PURE__*/React.createElement(Row, {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("h1", null, "Account created! Go to Login Page!"), /*#__PURE__*/React.createElement(Link, {
    to: "/"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "success"
  }, "Login")))));
}
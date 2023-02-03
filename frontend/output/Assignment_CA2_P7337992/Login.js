// FOR PURPOSE OF THIS ASSIGNMENT, USERNAME: jy , PASSWORD: 123
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Row, Col, Card, Form, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "./slices/pageSlice.js";
import { Link } from 'react-router-dom';
import { userfield } from "./slices/userfieldSlice.js";
import MovieDataService from "../services.js"; // functional component name is capitalised
export default function Login(props) {
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = React.useState(true); //show or hide password

  const logout = useSelector(function (store) {
    return store.page.value;
  });

  // Pull out existing parameters
  const userList = useSelector(function (store) {
    return store.userList.value;
  });

  // Field parameters (can share between Login and CreateUser)
  const userFields = useSelector(function (store) {
    return store.userfields.value;
  });
  let username = userFields.username;
  let password = userFields.password;
  let successMsg = "Success";
  let invalidMsg = "Either invalid account or not an ADMIN! Try admin account email: jiayi@gmail.com, password: 12345 ";
  let emptyMsg = "Both email and password cannot be empty!";

  // Username
  let usernameEle =
  /*#__PURE__*/
  // Put "div" so elements can go to next row, not print in one row
  React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Form.Label, {
    className: "text-dark"
  }, "Email: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: username,
    onChange: function (event) {
      console.log(event.target);
      dispatch(userfield({
        username: event.target.value,
        password: password
      })); //updateds username
    },
    placeholder: "required"
  }));
  // Password
  let passwordEle = /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Form.Label, {
    className: "text-dark"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    className: "text-dark",
    type: isPassword ? "password" : "text",
    value: isPassword ? undefined : password,
    onChange: function (key) {
      // can use onKeypress more secure (24Nov2022 48min)so it wont show on the HTML
      console.log(key);
      dispatch(userfield({
        username: username,
        password: key.target.value
      })); // see from console
    },
    placeholder: "required"
  }), /*#__PURE__*/React.createElement("input", {
    type: "button"
    // button change 
    ,
    value: isPassword ? "Show password" : "Hide Password"
    // when click, either become true or false
    ,
    onClick: function () {
      setIsPassword(!isPassword);
    }
  }));

  // Submit button
  let submitEle = /*#__PURE__*/React.createElement(Form.Group, null, /*#__PURE__*/React.createElement(Link, {
    to: '/movies'
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    className: "text-dark"
    // type={"button"}
    ,
    value: "Login",
    onClick: function () {
      if (username === undefined || username === null || username.length <= 0) {
        alert(emptyMsg);
        return;
      }
      if (password === undefined || password === null || password.length <= 0) {
        alert(emptyMsg);
        return;
      }

      // For Axios and backend
      const userData = {
        email: username,
        password: password
      };
      // return login promise
      MovieDataService.login(userData).then(response => {
        if (response.data) {
          console.log("what is the response");
          console.log(response);
          if (response.status == 200) {
            dispatch(login(logout));
          } else {
            alert(invalidMsg);
          }
        }
      });

      // fetch backend if you have api
      // fetch("api url")
      //     .then((response) => response.json())
      //     .then((jsonObj) => {
      //         alert(sucessMsg)
      //     }).catch((err) => {
      //         console.log(err);
      //         alert(invalidMsg);
      //     })
    }
  }, " ", /*#__PURE__*/React.createElement("b", null, "Login"))));

  // put all elements together
  const container = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Row, {
    className: "vh-100 d-flex justify-content-center align-items-center"
  }, /*#__PURE__*/React.createElement(Col, {
    md: 8,
    lg: 6,
    xs: 12
  }, /*#__PURE__*/React.createElement("div", {
    className: "border border-3 border-primary text-dark"
  }), /*#__PURE__*/React.createElement(Card, {
    className: "shadow"
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-3 mt-md-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "fw-bold mb-2 text-uppercase text-dark"
  }, /*#__PURE__*/React.createElement("b", null, "Welcome to Labamba!", /*#__PURE__*/React.createElement("img", {
    src: "src\\data\\logo.ico"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "fw-bold mb-2 text-uppercase text-dark"
  }, "This is admin only account"), /*#__PURE__*/React.createElement("p", {
    className: "text-dark mb-5"
  }, "Please enter your login and password!"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Form, null, usernameEle, passwordEle, submitEle), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-0  text-center text-dark"
  }, "Don't have an account?", " ", /*#__PURE__*/React.createElement(Link, {
    to: '/create'
  }, "Sign Up")))))))))));
  return container;
}
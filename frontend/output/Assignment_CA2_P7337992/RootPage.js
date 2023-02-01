// RootPage.jsx
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function RootPage(props) {
  // variable "movieDetailsId" used in router at path "/details/movieId"
  if (localStorage['movieId'] == undefined) {
    var movieDetailsId = 'check';
  } else {
    var movieDetailsId = localStorage["movieId"];
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Navbar, {
    bg: "dark",
    variant: "dark"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Navbar.Brand, {
    href: "/"
  }, /*#__PURE__*/React.createElement(Link, {
    to: '/'
  }, /*#__PURE__*/React.createElement("img", {
    src: "src\\Assignment_CA1_P7337992\\Other_codes_CA1\\data\\logo.ico",
    style: {
      width: "20%",
      height: "20%"
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement(Nav, {
    className: "justify-content-end"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: '/'
  }, "Login"), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: '/movies'
  }, "Movies"), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: `/details/${movieDetailsId}`
  }, "Details"), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: '/update'
  }, "Update movie"), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: '/pin'
  }, "Pinned movies"), /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: '/create'
  }, "Create New User")))), /*#__PURE__*/React.createElement("div", null))));
}

// Reference: https://stackoverflow.com/questions/55625431/warning-validatedomnesting-a-cannot-appear-as-a-descendant-of-a
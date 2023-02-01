// App_Assignment2_P7337992.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// ROUTER imports
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import store from "./Assignment_CA2_P7337992/storage.js";
import { Provider } from 'react-redux';
// Components to different Pages
import RootPage from "./Assignment_CA2_P7337992/RootPage.js";
import HomePage from "./Assignment_CA2_P7337992/HomePage.js";
import ListMovies from "./Assignment_CA2_P7337992/ListMoviesPage.js";
import DetailsPage from "./Assignment_CA2_P7337992/DetailsPage.js";
import MovieUpdate from "./Assignment_CA2_P7337992/MovieUpdate.js";
import MoviePin from "./Assignment_CA2_P7337992/MoviePin.js";
import CreateUserAccount from "./Assignment_CA2_P7337992/CreateUserAccount.js"; // CREATE HASH ROUTER
const router = createHashRouter([{
  // Router is like the brain, only need one per app!
  path: '/',
  element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RootPage, null), /*#__PURE__*/React.createElement(Outlet, null)),
  children: [{
    // <Login> only if user is logged out
    // Otherwise, go to <ListMoviesPage>
    path: '/',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HomePage, null), /*#__PURE__*/React.createElement(Outlet, null))
  }, {
    path: 'details/:movieId',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DetailsPage, null), /*#__PURE__*/React.createElement(Outlet, null))
  }, {
    path: 'movies',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListMovies, null), /*#__PURE__*/React.createElement(Outlet, null))
  }, {
    path: 'update',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MovieUpdate, null), /*#__PURE__*/React.createElement(Outlet, null))
  }, {
    path: 'pin',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MoviePin, null), /*#__PURE__*/React.createElement(Outlet, null))
  }, {
    path: 'create',
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CreateUserAccount, null), /*#__PURE__*/React.createElement(Outlet, null))
  }]
}]);
function App(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(RouterProvider, {
    router: router
  }), /*#__PURE__*/React.createElement(Outlet, null)));
}

// Render react root
const root = ReactDOM.createRoot(document.getElementById('root'));

// RUN THIS FOR PRACTICAL
root.render( /*#__PURE__*/React.createElement(App, null));

//{/* LOGIN PAGE */}
// {!isLogin && <Login onLogin={function (isValid) { setIsLogin(isValid) }} />}
// {/* {isLogin && <Clock time={time} />} */}
// {isLogin && <ListMovies />}
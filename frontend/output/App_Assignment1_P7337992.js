import Login from "./Assignment_CA1_P7337992/login.js";
import ListMovies from "./Assignment_CA1_P7337992/ListMoviesPage.js";
import DetailsPage from "./Assignment_CA1_P7337992/DetailsPage.js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Since you when you import css file it will add ".js" extention while build, so recommend add to "node modules" folder
import 'mycodes/Assignment_CA1_P7337992/styles.css';
function App(props) {
  // check if the user is already logged in or not
  const [isLogin, setIsLogin] = React.useState(false);
  const [isDetails, setIsDetails] = React.useState(true);
  const [onBack, setOnBack] = React.useState(false);
  const [movies, setMovies] = React.useState(false);
  console.log("isDetails");
  console.log(isDetails);
  console.log("onBack");
  console.log(onBack);
  return /*#__PURE__*/React.createElement("div", null, !isLogin && /*#__PURE__*/React.createElement(Login, {
    onLogin: function (isValid) {
      setIsLogin(isValid);
    }
  }), isLogin && onBack == false && isDetails && /*#__PURE__*/React.createElement(ListMovies, {
    onLogout: isValid => {
      setIsLogin(isValid);
    },
    onMovies: isValid => {
      setMovies(isValid);
    },
    onDetails: isValid => {
      setIsDetails(isValid);
    }
  }), isLogin && onBack == false && isDetails == false && /*#__PURE__*/React.createElement(DetailsPage, {
    onMovies: movies,
    onBack: isValid => {
      setOnBack(isValid);
    }
  }), isLogin && onBack == true && /*#__PURE__*/React.createElement(ListMovies, {
    onLogout: isValid => {
      setIsLogin(isValid);
    },
    onMovies: isValid => {
      setMovies(isValid);
    },
    onDetails: isValid => {
      setIsDetails(isValid);
      setOnBack(!onBack);
    }
  }));
}

// Render react root
const root = ReactDOM.createRoot(document.getElementById('root'));

// RUN THIS FOR PRACTICAL
root.render( /*#__PURE__*/React.createElement(App, null));

//{/* LOGIN PAGE */}
// {!isLogin && <Login onLogin={function (isValid) { setIsLogin(isValid) }} />}
// {/* {isLogin && <Clock time={time} />} */}
// {isLogin && <ListMovies />}
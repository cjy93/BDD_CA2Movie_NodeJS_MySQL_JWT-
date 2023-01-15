import Login from './Assignment_CA1_P7337992/login'
import ListMovies from './Assignment_CA1_P7337992/ListMoviesPage'
import DetailsPage from './Assignment_CA1_P7337992/DetailsPage'
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

    console.log("isDetails")
    console.log(isDetails)
    console.log("onBack")
    console.log(onBack)
    return (
        <div>
            {/* If you are not logined, send you to Login page */}
            {!isLogin && <Login onLogin={function (isValid) { setIsLogin(isValid) }} />}
            {/* `isDetails` is now true. After click button `Details Page!`, `isDetails` will become false */}
            {isLogin && (onBack == false) && isDetails && <ListMovies onLogout={(isValid) => { setIsLogin(isValid) }} onMovies={(isValid) => { setMovies(isValid) }} onDetails={(isValid) => { setIsDetails(isValid) }} />}
            {/* If user clicks "Go Back" from details page, check these conditions */}
            {isLogin && (onBack == false) && (isDetails == false) && <DetailsPage onMovies={movies} onBack={(isValid) => { setOnBack(isValid) }} />}
            {/* You will reach back `ListMoviesPage` after you click back. But once you click button `details page`, you need to reset `onBack` back to false so it can reach the `DetailsPage` again */}
            {isLogin && (onBack == true) && <ListMovies onLogout={(isValid) => { setIsLogin(isValid) }} onMovies={(isValid) => { setMovies(isValid) }} onDetails={(isValid) => { setIsDetails(isValid); setOnBack(!onBack) }} />}
        </div >
    );
}

// Render react root
const root = ReactDOM.createRoot(document.getElementById('root'));

// RUN THIS FOR PRACTICAL
root.render(<App />);

//{/* LOGIN PAGE */}
// {!isLogin && <Login onLogin={function (isValid) { setIsLogin(isValid) }} />}
// {/* {isLogin && <Clock time={time} />} */}
// {isLogin && <ListMovies />}
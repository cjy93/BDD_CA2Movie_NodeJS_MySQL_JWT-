// App_Assignment2_P7337992.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// ROUTER imports
import {
    createHashRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import store from "./Assignment_CA2_P7337992/storage"
import { Provider } from 'react-redux'
// Components to different Pages
import RootPage from './Assignment_CA2_P7337992/RootPage'
import HomePage from './Assignment_CA2_P7337992/HomePage'
import ListMovies from './Assignment_CA2_P7337992/ListMoviesPage'
import DetailsPage from './Assignment_CA2_P7337992/DetailsPage'
import MovieUpdate from './Assignment_CA2_P7337992/MovieUpdate';
import MoviePin from './Assignment_CA2_P7337992/MoviePin';
import CreateUserAccount from './Assignment_CA2_P7337992/CreateUserAccount';


// CREATE HASH ROUTER
const router = createHashRouter(
    [
        {
            // Router is like the brain, only need one per app!
            path: '/',
            element: <><RootPage /><Outlet /></>,
            children: [
                {
                    // <Login> only if user is logged out
                    // Otherwise, go to <ListMoviesPage>
                    path: '/',
                    element: <><HomePage /><Outlet /></>,
                },
                {
                    path: 'details/:movieId',
                    element: <><DetailsPage /><Outlet /></>,
                },
                {
                    path: 'movies',
                    element: <><ListMovies /><Outlet /></>,
                },
                {
                    path: 'update',
                    element: <><MovieUpdate /><Outlet /></>,
                },
                {
                    path: 'pin',
                    element: <><MoviePin /><Outlet /></>,
                },
                {
                    path: 'create',
                    element: <><CreateUserAccount /><Outlet /></>
                }
            ],
        },
    ]);


function App(props) {

    return (
        <div>
            <Provider store={store}>
                <RouterProvider router={router} />
                {/* To show the Children */}
                <Outlet />
            </Provider>
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
import MovieList from './MovieList'
import MovieAdd from './MovieAdd'
import MovieRetrieve from './MovieRetrieve'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { set } from './slices/movieSlice';
import { login } from './slices/pageSlice';
import { Link } from 'react-router-dom';


// Load in JSON file with Fetch (because file extention is ".json" type)
export default function ListMovies(props) {
    const dispatch = useDispatch();
    // Pull out current "movies" list
    const movies = useSelector(function (store) {
        return store.record.value;
    });
    const logout = useSelector(function (store) {
        return store.page.value;
    });


    // Existing filtering parameters
    const filterConstraints = useSelector(function (store) {
        return store.filter.value
    })
    let date = filterConstraints.date;
    let genre = filterConstraints.genre;
    let rating = filterConstraints.rating;
    let searchInput = filterConstraints.searchInput;

    // isFilterNone==true means nothing is filtered, and occurs when "genre"="None", "All movies" , rating=0
    let isFilterNone
    if (date == "All" && genre == "None" && rating == 0 && searchInput == "") {
        isFilterNone = true
    } else {
        isFilterNone = false
    }


    // Update current movie list after initialisation
    let my_list
    // Data fetch from standard JSON
    const getData = () => {
        fetch('/dist/moviesList.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                // Initial movie list is "my_list"
                my_list = Object.values(myJson)
                console.log("what is my list")
                dispatch(set(my_list));
                console.log(dispatch(set(my_list)).payload)
            });
    }
    // fetch data from getData() only once, must use useEffect(()=>{},[]) format to run fetch just once.
    React.useEffect(() => {
        if (movies.length == 0) {
            getData();
        } else {
            // You do not want to load the data from new copy as you may have modified the list and then gone to another page and returned to ListMovies page causing list to re-render when return to <ListMovies> component. This code prevents rerender of original movie list
            console.log("There is already data loaded")
        }
        // convert the object of objects into a list of objects so i can use "map" function
    }, [])
    // Run this so we can instantly pass `newMovie` to props.onMovie can pass to the parent "App_Assignment1_P7337992.jsx"
    // props.onMovies(dispatch(set(my_list))) // for passing to details page
    // Return React Components
    return (

        <div className="App">
            {logout &&
                <div>
                    <h1 className="mt-5 text-sm-start text-md-center">Movie Listings</h1>
                    <h2 className="mt-5 text-sm-start text-md-center">To Logout, please click this</h2>

                    <Container className="mt-5 text-sm-start text-sm-left">
                        {/* Create logout button */}
                        <div className="text-center">
                            <Link to={'/'}><Button variant="secondary" onClick={() => { dispatch(login(logout)) }}>Logout</Button></Link></div>
                        {/* Create Add movie section */}
                        <MovieAdd movies={movies}
                        /><br />
                        {/* Create Retrieve/filter movie section */}
                        {/* // Map MovieList inside filter, so even when filtered, can delete from inside the filtered list */}
                        <MovieRetrieve
                            movies={movies}
                            isFilterNone={isFilterNone}
                        /><br />
                        {/* Create Delete single or many and design movie cards */}
                        {isFilterNone && <MovieList movies={movies}
                        // onDetails={props.onDetails}
                        />}
                        <br />

                        {/* You need to put the React element into another standard element before you can style them(based on trial and error) */}
                        {/* <div style={{ display: 'none' }}><DetailsPage movies={newMovie} /></div> */}
                    </Container></div>}

            {/* Conditions to be on Details page (Put here because we do not want to re-fetch all the movies again. Retains current list) */}
            {/* {logout && (onBack == true) && (isDetails == false) && <DetailsPage />} */}
            {/* If not logged in, give warning to divert to Login Page */}
            {!logout && <h1>Please go to Login page/ Credentials invalid</h1>}

        </div>
    );
}


// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
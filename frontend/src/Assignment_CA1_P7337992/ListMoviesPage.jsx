import MovieList from './MovieList'
import MovieAdd from './MovieAdd'
import StartList from './StartList'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Container } from 'react-bootstrap';

// Load in JSON file with Fetch (because file extention is ".json" type)
export default function ListMovies(props) {
    const [data, setData] = React.useState([]);
    const getData = () => {
        fetch('/frontend/dist/moviesList.json'
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
                console.log(myJson)
                setData(myJson) // data is updated
            });
    }
    // fetch data from getData() only once, must use useEffect(()=>{},[]) format to run fetch just once.
    React.useEffect(() => {
        getData();
        // convert the object of objects into a list of objects so i can use "map" function
    }, [])
    // Initial movie list is "my_list"
    const my_list = Object.values(data)
    // Update current movie list after initialisation
    const [newMovie, setNewMovie] = React.useState([]);
    // Run this so we can instantly pass `newMovie` to props.onMovie can pass to the parent "App_Assignment1_P7337992.jsx"
    props.onMovies(newMovie)
    // Return React Components
    return (
        <div className="App">
            <h1 className="mt-5 text-sm-start text-md-center">Movie Listings</h1>
            <h2 className="mt-5 text-sm-start text-md-center">To Start, please click on Load initial Movies/ Reset button</h2>
            <Container className="mt-5 text-sm-start text-sm-left">
                {/* Create Initialise list/ Reset list */}
                <StartList movies={my_list} onStart={(movieStart) => {
                    setNewMovie(movieStart)
                }} />
                {/* Create Add movie section */}
                <MovieAdd movies={newMovie} onAdd={(movieAdd) => {
                    setNewMovie(movieAdd)
                }} /><br />

                {/* Create Delete single or many and design movie cards */}
                <MovieList movies={newMovie} onDetails={props.onDetails} /><br />

                {/* You need to put the React element into another standard element before you can style them(based on trial and error) */}
                {/* <div style={{ display: 'none' }}><DetailsPage movies={newMovie} /></div> */}
            </Container>
        </div>
    );
}


// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
//  {/* Create Retrieve/filter movie section */}
//  <MovieHide movies={newMovie} onRetrieve={(movieAdd) => {
//     setNewMovie(movieAdd)
// }} /><br />
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

export default function DetailsPage(props) {
    const dispatch = useDispatch();
    // Pull out current "movies" list
    try {
        var logout = useSelector(function (store) {
            return store.page.value;
        });
        const movies = useSelector(function (store) {
            return store.record.value;
        });


        console.log("calling in DetailsPage")
        // Selected movie index
        if (localStorage["movieId"] == undefined) {
            var i = 0
        } else {
            var i = localStorage["movieId"]
        }
        console.log("movieID")
        console.log(localStorage["movieId"])



        // Filter the movie based on its "id" since we have kept the selected movie by movieId equals to component id

        let temp = movies.filter(movie => movie.movieID == localStorage["movieId"])
        var chosenMovie = temp[0] // take the solo element out of the list
        console.log("chosenMovie")
        console.log(chosenMovie[0])
        // If the movie list "movies" is not empty, find these variables    
        try {
            // declare the variables you want to display
            console.log("successfully creating all the page variables")
            var id = chosenMovie.movieID
            var name = chosenMovie.name
            var year = chosenMovie.year
            var rating = chosenMovie.imdb
            var runtime = chosenMovie.runtime
            var genres = chosenMovie.GenreFull
            var storyPlot = chosenMovie.storyPlot
            var actor1 = chosenMovie.actor1
            var actor2 = chosenMovie.actor2
            var actor3 = chosenMovie.actor3
            var actor4 = chosenMovie.actor4
            var actor1_as = chosenMovie.actor1_as
            var actor2_as = chosenMovie.actor2_as
            var actor3_as = chosenMovie.actor3_as
            var actor4_as = chosenMovie.actor4_as
            var actor1_link = chosenMovie.actor1_link
            var actor2_link = chosenMovie.actor2_link
            var actor3_link = chosenMovie.actor3_link
            var actor4_link = chosenMovie.actor4_link
            var actor1_pic = chosenMovie.actor1_pic
            var actor2_pic = chosenMovie.actor2_pic
            var actor3_pic = chosenMovie.actor3_pic
            var actor4_pic = chosenMovie.actor4_pic
            var movie_link = chosenMovie.links
            var youtube = chosenMovie.youtube
            var release_date = chosenMovie.Release_Date
            var poster = chosenMovie.Image_URL
            var plot = chosenMovie.Plot

        } catch (e) {
            if (e instanceof TypeError) {
                console.log("There is error to find Movie list")
                console.log(e)
                console.log(movie == undefined)
            }
        }
    } catch {
        console.log("Please choose a movie!")
        var logout = useSelector(function (store) {
            return store.page.value;
        });
    }

    return (
        <>
            {logout && <Container>
                <h1 className="mt-5 text-center">Details page!</h1>
                <div class="text-center">
                    <Link to={'/movies'}><Button style={{ "margin-right": 16 }} variant="primary" className="text-center" onClick={() => {
                    }}>Back To Movie List</Button></Link>
                    <Link to={'/update'}><Button variant="secondary" className="text-center" onClick={() => {
                    }}>Back To Update Page</Button></Link></div>
                {/* <img src={poster[localStorage['movieId']]} alt={name[localStorage['movieId']]} /> */}

                {/* Card blocks */}
                <div class="container-fluid mt-5 pt-5 mb-5 pb-5">
                    {/* <!-- Main Header --> */}
                    <div class="row">
                        <div class="col-md-12 text-center display-4">
                            Movie Details
                        </div>
                    </div>
                    {/* Recommendations section
                    <!-- Every movie details page contains these fixed 5 recommended movies. This part is not scrapped --> */}
                    <div class="row mt-0">
                        <div class="col-md-3 mb-5 mx-3 recommendations">
                            <div class="card h-150 text-white bg-dark mb-3">
                                <div class="card-body">
                                    <h3>Recommendations</h3>
                                    <div class="recommendedPics">
                                        <a data-bs-toggle="tooltip" title="Click me!"
                                            href="https://www.youtube.com/embed/giXco2jaZ_4">
                                            <img src="https://m.media-amazon.com/images/M/MV5BMmIwZDMyYWUtNTU0ZS00ODJhLTg2ZmEtMTk5ZmYzODcxODYxXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UY209_CR0,0,140,209_AL_.jpg"
                                                alt="" />
                                            <p>Top Gun: Maverick</p>
                                        </a>
                                    </div>
                                    <div class="recommendedPics">
                                        <a data-bs-toggle="tooltip" title="Click me!"
                                            href="https://www.youtube.com/embed/aWzlQ2N6qqg">
                                            <img src="https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_UY209_CR0,0,140,209_AL_.jpg"
                                                alt="" />
                                            <p>Doctor Strange in the Multiverse of Madness</p>
                                        </a>
                                    </div>
                                    <div class="recommendedPics">
                                        <a data-bs-toggle="tooltip" title="Click me!"
                                            href="https://www.youtube.com/embed/mqqft2x_Aa4">
                                            <img src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_UY209_CR0,0,140,209_AL_.jpg"
                                                alt="" />
                                            <p>The Batman</p>
                                        </a>
                                    </div>
                                    <div class="recommendedPics">
                                        <a data-bs-toggle="tooltip" title="Click me!"
                                            href="https://www.youtube.com/embed/nM4iy0reaCA">
                                            <img src="https://m.media-amazon.com/images/M/MV5BYjdhYTE3NjMtZjI3OC00NzVlLWFiNTUtNzQ3NDNiNTI3NDg4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UY209_CR0,0,140,209_AL_.jpg"
                                                alt="" />
                                            <p>Hustle</p>
                                        </a>
                                    </div>
                                    <div class="recommendedPics">
                                        <a data-bs-toggle="tooltip" title="Click me!"
                                            href="https://www.youtube.com/embed/ye63hQLDj4k">
                                            <img src="https://m.media-amazon.com/images/M/MV5BOGI5N2FhNzktZjZlNi00MmRjLWE1MmUtNjRlNzQyOGMzYjNhXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UY209_CR0,0,140,209_AL_.jpg"
                                                alt="" />
                                            <p>Memory</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Main Body Section */}
                        <div class="col-md-5 mb-5 mainBody">
                            <div class="row mt-0">
                                <div class="col-md-12 mb-5 mx-3 ">
                                    <div class="card h-150 bg-dark">
                                        <div class="card-body">
                                            <div class="text-md-center" id="title_and_year"></div>
                                            <section class="container" id="details1">
                                                <div id="poster" class="text-center">
                                                    <a href={movie_link}><img src={poster} style={{ 'height': 300 }} /></a>
                                                    <h3>Movie: {name} ({year})</h3>
                                                    <h2 class="text-sm-start text-md-center border mt-0">Movie Details</h2>
                                                    <h4>Genres: {genres}</h4>
                                                </div>
                                            </section>
                                            <section className="container" id="details2">
                                                <div className="text-center"><iframe title="Embeds Page" className="embed-responsive-item" src={youtube} allowFullScreen
                                                ></iframe></div>
                                                <div id="release_date" class="text-center" className="text-center">Release Date: {release_date}</div>
                                                <div id="storyPlot" class="text-center col-sm-4 mx-auto">StoryPlot: {storyPlot}</div>
                                                <div id="rating" class="text-center">Rating: {rating}</div>
                                                <div id="timing" class="text-center">Runtime: {runtime}</div>
                                            </section>
                                            <section class="container" id="details3">
                                                <div id="reviews" class="text-center">
                                                    <h2 class="text-sm-start text-md-center border mt-0">Reviews and Full Plot</h2>
                                                    {plot}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actors section */}
                        <div class="col-md-3 mb-5 mx-4">
                            <div class="card h-150  bg-dark">
                                <div class="card-body">
                                    <section class="container" id="details3">
                                        {/* <!-- Only included first director --> */}
                                        <div id="director" class="text-center">
                                            <h2 class="text-sm-start text-md-center border mt-0">Actors</h2>
                                        </div>
                                        {/* <!-- Only included 4 main actors --> */}
                                        <div id="actors" class="text-center">
                                            <div id="actor1" class="col-1-4">
                                                <div class="actorPics"><a href={actor1_link}><img style={{ 'width': 150 }} src={actor1_pic} />
                                                </a></div>
                                                <div class="actorNames">{actor1}</div>
                                                <div class="actorAs" style={{ fontSize: '0.8em' }}>{actor1_as}</div>

                                            </div>
                                            <div id="actor2" class="col-1-4">
                                                <div class="actorPics"><a href={actor2_link}><img style={{ 'width': 150 }} src={actor2_pic} />
                                                </a></div>
                                                <div class="actorNames">{actor2}</div>
                                                <div class="actorAs" style={{ fontSize: '0.8em' }}>{actor2_as}</div>
                                            </div>
                                            <div id="actor3" class="col-1-4">
                                                <div class="actorPics"><a href={actor3_link}><img style={{ 'width': 150 }} src={actor3_pic} />
                                                </a></div>
                                                <div class="actorNames">{actor3}</div>
                                                <div class="actorAs" style={{ fontSize: '0.8em' }}>{actor3_as}</div>
                                            </div>
                                            <div id="actor4" class="col-1-4">
                                                <div class="actorPics"><a href={actor4_link}><img style={{ 'width': 150 }} src={actor4_pic} />
                                                </a></div>
                                                <div class="actorNames">{actor4}</div>
                                                <div class="actorAs" style={{ fontSize: '0.8em' }}>{actor4_as}</div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </Container>}
            {!logout && <h1>Please go to Login Page</h1>}
        </>
    )

}

// Reference for Redirect pages: https://www.delftstack.com/howto/react/onclick-redirect-react/
// Configure webpack css-loader and style-loader: https://blog.jakoblind.no/css-modules-webpack/
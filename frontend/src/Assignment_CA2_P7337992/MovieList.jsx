import MovieDisp from './MovieDisp';
import MovieDeleteMany from './MovieDeleteMany';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Container, Row } from 'react-bootstrap';
// use the reducer "add"
import { useSelector, useDispatch } from 'react-redux';
import { deleteOne, deleteMany } from './slices/movieSlice';


export default function MovieList(props) {
    // Pull out current "movies" list from Parent because if filtered, the movie list is a smaller list.
    // If not filtered the movie list is full list
    let movies = props.movies
    const dispatch = useDispatch();

    // Initialise empty array that keeps indexes of checkboxes are clicked(no matter tick or unticked boxes)
    let isChecked = [] // not state variable. "let" can change and is scoped, "var" is for global scope
    const setIsChecked = (index, indexToDelete = null) => {
        // push the index anytime the checkbox is clicked, no matter "checked" or "unchecked"
        if (index === "del") {
            // If you clicked on a object odd number of times, and click "Delete Selected", the movie will be gone
            // Remove one item if the length of the list is not even number. Else, these checkboxes are "unchecked" and should not be deleted
            if (isChecked.length % 2 != 0 && indexToDelete != null) {
                isChecked.splice(indexToDelete);
            }
        } else {
            isChecked.push(index);
        }
        console.log("isChecked list: [" + isChecked + "]");
    };

    // Create wrapper functions of setIsChecked(just for good naming), because this for resetting state after you clicked "Delete Selected"
    const refreshState = (e, indexToDelete) => {
        setIsChecked(e, indexToDelete)
    }


    // Delete all the movies that are ticked
    const DeleteManyMovies = (movies) => {
        console.log("Deleting all the movies inside: [" + isChecked + "]");
        // algo that finds out how many repeats are there for each unique element in a list
        // "count" is a object with key being the index of the element, value being how many times the index is present in a list "isChecked"
        const count = {};
        for (const element of isChecked) {
            if (count[element]) {
                count[element] += 1;
            } else {
                count[element] = 1;
            }
        };
        // If the number of times the same index called is ODD number, the movie with this index should be removed
        const indexToDelete = []
        for (const [key, value] of Object.entries(count)) {
            if (value % 2 == 1) {
                indexToDelete.push(key)
            }
        }
        // Splice away movies with those index that is under delete list "indexToDelete"
        while (indexToDelete.length > 0) {
            let element = indexToDelete.pop()
            dispatch(deleteMany(element));
        }
        // even though a value is returned, the rest of the code also runs
        return indexToDelete

    }
    // Return UI for Delete Many and singular movies.
    return (
        <div>
            <div>
                <MovieDeleteMany
                    deleteSel={
                        () => {
                            const indexToDelete = DeleteManyMovies(movies)
                            // setMovies([...movies]);
                            // want to set the deletion list back to empty so in the next round of selection after "Delete selected", it will not be impacted by previous deletion indexes.
                            refreshState("del", indexToDelete)
                        }
                    }
                />
            </div>

            <div>
                {/* In react-bootstrap, you need to wrap the cols>cards in Row and set number of columns by 'g-4' */}
                <Container className='p-3'>
                    <Row xs={1} md={2} className="g-4">

                        <MovieDisp
                            movies={movies}
                            isChecked={isChecked}
                            onChecked={
                                (e) => {
                                    setIsChecked(e)
                                }
                            }
                            // onDetails={props.onDetails}
                            onDelete={
                                (index) => {
                                    dispatch(deleteOne(index));
                                    // const popped = dispatch(deleteOne(index))
                                    // console.log("What is popped in deleteOne")
                                    // console.log(popped)
                                }
                            }
                        />

                    </Row>
                </Container>

            </div>
        </div>
    )
}

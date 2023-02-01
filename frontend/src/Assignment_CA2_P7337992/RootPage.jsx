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

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><Link to={'/'} ><img src="src\Assignment_CA1_P7337992\Other_codes_CA1\data\logo.ico" style={{ width: "20%", height: "20%" }} /></Link></Navbar.Brand>
                    <div>
                        <ul >
                            {/*our links will go here */}
                            <Nav className="justify-content-end">
                                {/* Suppose to be <Nav.Link><Link></Link></Nav.Link>, but there will be warnings that says we cannot do this <a><a></a></a> kind of pattern. Hence we pass Link as a prop like so */}
                                <Link
                                    className="nav-link"
                                    to={'/'}>Login
                                </Link>
                                <Link
                                    className="nav-link"
                                    to={'/movies'}>Movies
                                </Link>
                                <Link
                                    className="nav-link"
                                    to={`/details/${movieDetailsId}`}
                                >
                                    Details
                                </Link>
                                <Link
                                    className="nav-link"
                                    to={'/update'} >
                                    Update movie
                                </Link>
                                <Link
                                    className="nav-link"
                                    to={'/pin'}>
                                    Pinned movies
                                </Link>
                                <Link
                                    className="nav-link"
                                    to={'/create'}>
                                    Create New User
                                </Link>
                            </Nav>
                        </ul>
                    </div>
                    <div>
                        { /* Content will go here later */}
                        {/* Outlet will display the elements based on the URL given, inclusive of the parent elements */}
                        {/* Outlet will display children one level down */}
                        {/* We can only wrap Provider once in the whole app! */}
                        {/* <Provider store={store}> */}
                        {/* To show the Children */}
                        {/* <Outlet /> */}
                        {/* </Provider> */}
                    </div>
                </Container >
            </Navbar >
        </div >

    );
}

// Reference: https://stackoverflow.com/questions/55625431/warning-validatedomnesting-a-cannot-appear-as-a-descendant-of-a
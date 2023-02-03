// FOR PURPOSE OF THIS ASSIGNMENT, USERNAME: jy , PASSWORD: 123
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Row, Col, Card, Form, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './slices/pageSlice';
import { Link } from 'react-router-dom';
import { userfield } from './slices/userfieldSlice';
import MovieDataService from "../services";

// functional component name is capitalised
export default function Login(props) {
    const dispatch = useDispatch();
    const [isPassword, setIsPassword] = React.useState(true); //show or hide password

    const logout = useSelector(function (store) {
        return store.page.value;
    });

    // Pull out existing parameters
    const userList = useSelector(function (store) {
        return store.userList.value
    })

    // Field parameters (can share between Login and CreateUser)
    const userFields = useSelector(function (store) {
        return store.userfields.value
    })
    let username = userFields.username;
    let password = userFields.password;


    let successMsg = "Success";
    let invalidMsg = "Either invalid account or not an ADMIN! Try admin account email: jiayi@gmail.com, password: 12345 "
    let emptyMsg = "Both email and password cannot be empty!"

    // Username
    let usernameEle = (
        // Put "div" so elements can go to next row, not print in one row
        <Form.Group>
            <Form.Label className="text-dark">Email: </Form.Label>
            {/* Dont have username due to no initial value */}
            {/* can omit value={username} if you want to, unless got initial userName*/}
            <input type="text" value={username} onChange={function (event) {
                console.log(event.target);
                dispatch(userfield({ username: event.target.value, password: password })) //updateds username
            }} placeholder="required" />
        </Form.Group>
    )
    // Password
    let passwordEle = (
        <Form.Group>
            <Form.Label className="text-dark">Password: </Form.Label>
            <input className="text-dark" type={isPassword ? "password" : "text"} value={isPassword ? undefined : password} onChange={function (key) { // can use onKeypress more secure (24Nov2022 48min)so it wont show on the HTML
                console.log(key)
                dispatch(userfield({ username: username, password: key.target.value })) // see from console
            }} placeholder="required" />
            <input
                type={"button"}
                // button change 
                value={isPassword ? "Show password" : "Hide Password"}
                // when click, either become true or false
                onClick={
                    function () {
                        setIsPassword(!isPassword)
                    }
                }
            />
        </Form.Group>
    )

    // Submit button
    let submitEle = (
        <Form.Group>
            <Link to={'/movies'}>
                <Button variant=
                    "primary" className="text-dark"
                    // type={"button"}
                    value={"Login"}
                    onClick={
                        function () {
                            if (username === undefined || username === null || username.length <= 0) {
                                alert(emptyMsg);
                                return;
                            }

                            if (password === undefined || password === null || password.length <= 0) {
                                alert(emptyMsg);
                                return;
                            }

                            // For Axios and backend
                            const userData = {
                                email: username,
                                password: password
                            }
                            // return login promise
                            MovieDataService.login(userData).then(response => {
                                if (response.data) {
                                    // wipe out existing token
                                    delete localStorage["token"]
                                    console.log("what is the response")
                                    console.log(response);
                                    if (response.status == 200) {
                                        dispatch(login(logout));
                                        // save new token
                                        localStorage["token"] = response.data.token;
                                    } else {
                                        alert(invalidMsg);
                                    }
                                }
                            });

                            // fetch backend if you have api
                            // fetch("api url")
                            //     .then((response) => response.json())
                            //     .then((jsonObj) => {
                            //         alert(sucessMsg)
                            //     }).catch((err) => {
                            //         console.log(err);
                            //         alert(invalidMsg);
                            //     })
                        }
                    }
                > <b>Login</b>
                </Button>
            </Link>
        </Form.Group>
    )

    // put all elements together
    const container = (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">

                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary text-dark"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-dark"><b>Welcome to Labamba!<img src="src\data\logo.ico" /></b></h2>
                                    <h3 className="fw-bold mb-2 text-uppercase text-dark">This is admin only account</h3>
                                    <p className="text-dark mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form>
                                            {usernameEle}
                                            {passwordEle}
                                            {submitEle}
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center text-dark">
                                                Don't have an account?{" "}
                                                <Link
                                                    to={'/create'}>
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
    return container;

}
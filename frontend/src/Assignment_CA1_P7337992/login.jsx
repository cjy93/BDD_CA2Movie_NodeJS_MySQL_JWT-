// FOR PURPOSE OF THIS ASSIGNMENT, USERNAME: jy , PASSWORD: 123
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Row, Col, Card, Form, Container } from 'react-bootstrap';
import MovieDataService from "../services";

// functional component name is capitalised
export default function Login(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isPassword, setIsPassword] = React.useState(true); //show or hide password

    let successMsg = "Success";
    let invalidMsg = "Either invalid username or incorrect password! Try admin Username: jiayi@gmail.com, password: 12345 "
    let emptyMsg = "Both username and password cannot be empty!"

    // Username
    let usernameEle = (
        // Put "div" so elements can go to next row, not print in one row
        <Form.Group>
            <Form.Label className="text-dark">Username: </Form.Label>
            {/* Dont have username due to no initial value */}
            {/* can omit value={username} if you want to, unless got initial userName*/}
            <input type="text" value={username} onChange={function (event) {
                setUsername(event.target.value) //updateds username
            }} placeholder="required" />
        </Form.Group>
    )
    // Password
    let passwordEle = (
        <Form.Group>
            <Form.Label className="text-dark">Password: </Form.Label>
            <input className="text-dark" type={isPassword ? "password" : "text"} value={isPassword ? undefined : password} onChange={function (key) { // can use onKeypress more secure (24Nov2022 48min)so it wont show on the HTML
                setPassword(key.target.value) // see from console
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
            <Button variant=
                "primary" className="text-dark"
                // type={"button"}
                value={"Login"}
                onClick={
                    function (e) {
                        console.log(e);
                        e.preventDefault()
                        if (username === undefined || username === null || username.length <= 0) {
                            alert(emptyMsg);
                            return;
                        }

                        if (password === undefined || password === null || password.length <= 0) {
                            alert(emptyMsg);
                            return;
                        }

                        const userData = {
                            email: username,
                            password: password
                        }
                        // return login promise
                        MovieDataService.login(userData).then(response => {
                            if (response.data) {
                                console.log(response);
                                const validated = response.data.validated
                                if (validated) {
                                    props.onLogin(true);
                                } else {
                                    alert(invalidMsg);
                                }
                            }
                        });
                    }
                }
            > <b>Login</b>
            </Button>
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
                                    <h2 className="fw-bold mb-2 text-uppercase text-dark"><b>Welcome to Labamba!<img src="src\Assignment_CA1_P7337992\Other_codes_CA1\data\logo.ico" /></b></h2>
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
                                                <a href="{''}" className="text-primary fw-bold">
                                                    Sign Up
                                                </a>
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
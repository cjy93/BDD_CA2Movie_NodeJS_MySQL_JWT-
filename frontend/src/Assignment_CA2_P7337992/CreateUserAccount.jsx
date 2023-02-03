import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// use the reducer "userAccount"
import { addUser } from './slices/userAccountSlice';
import { userfield } from './slices/userfieldSlice';
import { Link } from 'react-router-dom';
import MovieDataService from "../services";

export default function CreateUserAccount(props) {
    const dispatch = useDispatch();
    // Existing username and password fields
    const userFields = useSelector(function (store) {
        return store.userfields.value
    })
    let email = userFields.email;
    let password = userFields.password;
    let role = userFields.role;
    let name = userFields.name;
    // Boolean operator to check if user is created. true = created
    const [created, setCreated] = React.useState(false);

    // Return form variables, with React Bootstrap styling
    return (
        <>
            {/* React-bootstrap form group */}
            <Form className="me-5 ms-5">
                <h2>Create New Users Here: </h2>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formAdd">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={email}
                            onChange={(e) => { dispatch(userfield({ email: e.target.value, password: password, role: role, name: name })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                </Row><Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={password}
                            onChange={(e) => { dispatch(userfield({ email: email, password: e.target.value, role: role, name: name })) }}
                            placeholder="required"
                        />
                    </Form.Group >
                </Row><Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formAdd">
                        <Form.Label>Role:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={role}
                            onChange={(e) => { dispatch(userfield({ email: email, password: password, role: e.target.value, name: name })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Row className="mb-3"></Row>
                </Row><Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formAdd">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={name}
                            onChange={(e) => { dispatch(userfield({ email: email, password: password, role: role, name: e.target.value })) }}
                            required
                            placeholder="required"
                        />
                    </Form.Group>
                    <Row className="mb-3"></Row>
                </Row><Row className="mb-3">

                    {!created && <Form.Group>
                        <Button variant="primary"
                            onClick={() => {
                                // To update Redux frontend
                                dispatch(addUser({ email: email, password: password, role: role, name: name }));
                                // If user is created, change to true
                                setCreated(true);
                                // To update SQL database backend
                                let bodyData = { email: email, password: password, role: role, name: name };
                                console.log("what is in bodyData", bodyData);
                                MovieDataService.createUser(bodyData).then(response => {
                                    if (response.data) {
                                        console.log("what is the response")
                                        console.log(response);
                                    }
                                });
                            }}>Create New Account</Button>
                    </Form.Group>}
                    {/* // Checks if user is created. If created, display this below */}
                </Row>
                {created && <Row className="mb-3">
                    <h1>Account created! Go to Login Page!</h1>
                    <Link to="/">
                        <Button variant="success">Login</Button>
                    </Link>
                </Row>}
            </Form >

        </>
    )
}
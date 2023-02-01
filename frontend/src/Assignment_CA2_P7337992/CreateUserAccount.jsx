import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// use the reducer "userAccount"
import { addUser } from './slices/userAccountSlice';
import { userfield } from './slices/userfieldSlice';
import { Link } from 'react-router-dom';

export default function CreateUserAccount(props) {
    const dispatch = useDispatch();
    // Existing username and password fields
    const userFields = useSelector(function (store) {
        return store.userfields.value
    })
    let username = userFields.username;
    let password = userFields.password;
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
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="Text"
                            value={username}
                            onChange={(e) => { dispatch(userfield({ username: e.target.value, password: password })) }}
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
                            onChange={(e) => { dispatch(userfield({ username: username, password: e.target.value })) }}
                            placeholder="required"
                        />
                    </Form.Group >
                </Row><Row className="mb-3">
                    {!created && <Form.Group>
                        <Button variant="primary"
                            onClick={() => {
                                dispatch(addUser({ username: username, password: password }));
                                // If user is created, change to true
                                setCreated(true);
                                // Checks if user is created. If created, display this below
                            }}>Create New Account</Button>
                    </Form.Group>}
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
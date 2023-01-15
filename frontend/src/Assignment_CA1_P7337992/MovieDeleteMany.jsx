import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button,Form } from 'react-bootstrap';
export default function MovieDeleteMany(props) {
    // Return the "Delete Selected" button back to "MovieList.jsx"
    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="formDelete">
            <h2>Delete those selected: </h2>
            <Button variant="primary" onClick={() => props.deleteSel()}>
                Delete selected
            </Button>
            </Form.Group>    
        </Form>           

        </>
    )
}
import React from 'react';
import {
    Nav,
    Navbar,
    Col,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

export default function () {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Ascii</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
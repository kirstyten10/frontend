import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Navbar, Nav, } from 'react-bootstrap';

const NavScrollExample = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${searchTerm.trim()}`);
        }
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleNavigateToOwnedBooks = () => {
        navigate('/owned-books');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={handleNavigateHome}>Home</Nav.Link>
                        <Nav.Link onClick={handleNavigateToOwnedBooks}>Owned Books</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search for books"
                            className="me-2"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavScrollExample;
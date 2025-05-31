import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RetroNavbar() {
  // Cek apakah ada token (user sudah login)
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Redirect ke login page atau refresh halaman
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className="retro-navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">RETROWEB</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout} className="retro-button ms-lg-2 mt-2 mt-lg-0">Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="retro-button ms-lg-2 mt-2 mt-lg-0">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RetroNavbar;
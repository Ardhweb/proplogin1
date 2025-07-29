import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SimpleNavbar = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  const authRaw = localStorage.getItem('auth');
  const isAuthenticated = !!authRaw;

 const handleLogout = async () => {
  const authRaw = localStorage.getItem('auth');
  if (!authRaw) return;

  const { token } = JSON.parse(authRaw);

  try {
    const response = await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      // Remove auth token from localStorage
      localStorage.removeItem('auth');
      navigate('/login');
    } else {
      alert('Logout failed!');
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('Logout error!');
  }
};


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/action1">Action</NavDropdown.Item>
              <NavDropdown.Item href="/action2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="/something">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/more">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Auth condition */}
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline-primary" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SimpleNavbar;

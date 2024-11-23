import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  
import home from './Images/home3.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  //page location indicator
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    return path.charAt(1).toUpperCase() + path.slice(2).replace('/', ' ');
  };

  return (
    <Navbar bg="dark" className="bg-gradient py-2 fixed-top w-100" variant="dark" expand="lg">
      <Container fluid>

        {/* Page location div*/}
        <div className="current-page text-light d-none d-lg-block">
          {getCurrentPage()}
        </div>
        
        <Navbar.Brand as={Link} to="/homepage" className="d-lg-none">
          <img
            src={home}
            alt="CinemaMatrix Home"
            className="home d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="nav-center">
            <Nav.Link as={Link} to="/homepage" className="d-none d-lg-block">
              <img
                src={home}
                alt="CinemaMatrix Home"
                className="home d-inline-block align-top"
              />
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <div className="current-page invisible d-none d-lg-block">
          {getCurrentPage()}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;

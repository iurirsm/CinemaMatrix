import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  //page location indicator
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path.startsWith("/edit-movie/")) return "Edit Movie";
    if (path.startsWith("/show-movie/")) return "Show Movie";
    return path.charAt(1).toUpperCase() + path.slice(2).replace("/", " ");
  };

  return (
    <Navbar
      bg="dark"
      className="bg-gradient py-2 fixed-top w-100"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/homepage" className="d-lg-none">
          <img
            src={logo}
            alt="CinemaMatrix Home"
            className="home d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <div className="d-flex justify-content-between align-items-center gap-3">
            <img
              src={logo}
              alt="CinemaMatrix Home"
              className="home d-inline-block align-top "
            />
            <p className="text-white pt-3">Cinema Matrix</p>
          </div>
          <Nav className="nav-center">
            <Nav.Link as={Link} to="/homepage" className="d-none d-lg-block">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/movies">
                  my Movies
                </Nav.Link>
                <NavDropdown
                  title={<>Hi {user.username || "User"}</>}
                  id="user-dropdown"
                  className="text-capitalize"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/login" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* Page location div*/}
        <div className="current-page text-light d-none d-lg-block">
          {getCurrentPage()}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;

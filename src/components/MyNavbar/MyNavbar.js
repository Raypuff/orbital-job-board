import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// import styles from "./MyNavbar.module.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <NavDropdown title="Sign in" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="linktoNUSauthpage">Sign in as NUS Student</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/sign_in">Sign in as Organization</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="job_board">
              Post A Job
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;

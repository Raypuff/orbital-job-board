import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostAJobButton from "../PostAJobButton";

// import styles from "./LoggedOutNavbar.module.css";

const LoggedOutNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title="Sign in"
              id="collasible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item>
                <Link to="linktoNUSauthpage">Sign in as NUS Student</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/sign_in">Sign in as Organization</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <PostAJobButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default LoggedOutNavbar;

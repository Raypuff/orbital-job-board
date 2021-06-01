import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import styles from "./LoggedOutNavbar.module.css";

const LoggedOutNavbar = () => {
  return (
    <NavDropdown title="Sign in" id="collasible-nav-dropdown" alignRight>
      <NavDropdown.Item>
        <Nav.Link to="linktoNUSauthpage">Sign in as NUS Student</Nav.Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav.Link to="/sign_in">Sign in as Organization</Nav.Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedOutNavbar;

import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import styles from "./LoggedOutNavbar.module.css";

const LoggedOutNavbar = () => {
  return (
    <NavDropdown title="Sign in" id="collasible-nav-dropdown" alignRight>
      <NavDropdown.Item>
        <Nav.Link href="/linktoNUSauthpage">Sign in as NUS Student</Nav.Link>
        {/* <Link href="/linktoNUSauthpage">Sign in as NUS Student</Link> */}
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav.Link href="/sign_in">Sign in as Organization</Nav.Link>
        {/* <Link href="/sign_in">Sign in as Organization</Link> */}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedOutNavbar;

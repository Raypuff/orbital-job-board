import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// import styles from "./SignedOutNavbar.module.css";

const SignedOutNavbar = () => {
  return (
    <NavDropdown title="Sign in" id="collasible-nav-dropdown" alignRight>
      <NavDropdown.Item>
        <Nav.Link as={Link} to="/sign-in-student">
          Sign in as NUS Student
        </Nav.Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav>
          <Nav.Link as={Link} to="/sign-in-organization">
            Sign in as Organization
          </Nav.Link>
        </Nav>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav>
          <Nav.Link as={Link} to="/sign-in-admin">
            Sign in as Administrator
          </Nav.Link>
        </Nav>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default SignedOutNavbar;

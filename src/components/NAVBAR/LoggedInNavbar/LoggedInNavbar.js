import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import PostAJobButton from "../PostAJobButton";

// import styles from "./MyNavbar.module.css";

const LoggedInNavbar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
      alert("Logged out successfully");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

  function isVerified() {
    if (currentUser.emailVerified) {
      return "User is verified";
    } else {
      return "User in not verified";
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title="Profile"
              id="collasible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Header>{currentUser.email}</NavDropdown.Header>
              <NavDropdown.Divider />
              <Navbar.Text>{isVerified()}</Navbar.Text>
              <NavDropdown.Item>
                <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <PostAJobButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default LoggedInNavbar;

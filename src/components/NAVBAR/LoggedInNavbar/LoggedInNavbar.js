import React, { useState } from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./LoggedInNavbar.module.css";

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
      return "Verified";
    } else {
      return "Please verify your email";
    }
  }

  return (
    <NavDropdown title="Profile" id="collasible-nav-dropdown" alignRight>
      <NavDropdown.Header className={styles.email}>
        {currentUser.email}
        <br />({isVerified()})
      </NavDropdown.Header>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LoggedInNavbar;

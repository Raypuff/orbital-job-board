import React, { useState } from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import styles from "./SignedInOrgNavbar.module.css";

const SignedInOrgNavbar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
      alert("Signed out successfully");
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
        <Nav.Link as={Link} to="/profile-organization">
          Your profile
        </Nav.Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Nav.Link onClick={handleLogout}>Sign out</Nav.Link>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default SignedInOrgNavbar;

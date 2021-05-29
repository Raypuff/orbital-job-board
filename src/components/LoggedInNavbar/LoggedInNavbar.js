import React, { useState } from "react";
import { Navbar, Nav, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// import styles from "./MyNavbar.module.css";

const LoggedInNavbar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/sign_in");
    } catch {
      setError("Failed to log out");
      console.log(error);
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <>
              {["bottom"].map((placement) => (
                <OverlayTrigger
                  trigger="click"
                  key={placement}
                  placement={placement}
                  overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                      <Popover.Title as="h3">
                        {currentUser.displayName}
                      </Popover.Title>
                      <Popover.Content>
                        <div>{currentUser.email}</div>
                        <Button variant="link" onClick={handleLogout}>
                          Log out
                        </Button>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Button variant="secondary">Profile</Button>
                </OverlayTrigger>
              ))}
            </>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="post_a_job">
              Post A Job
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default LoggedInNavbar;

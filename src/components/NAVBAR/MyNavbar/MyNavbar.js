import { Navbar, Nav } from "react-bootstrap";

import LoggedOutNavbar from "../LoggedOutNavbar";
import LoggedInNavbar from "../LoggedInNavbar";
import PostAJobButton from "../PostAJobButton";

const MyNavbar = ({ isLoggedIn }) => {
  const LoginButton = (isLoggedIn) => {
    if (isLoggedIn != null) {
      return <LoggedInNavbar />;
    }
    return <LoggedOutNavbar />;
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <LoginButton isLoggedIn={isLoggedIn} />
          </Nav>
          <PostAJobButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;

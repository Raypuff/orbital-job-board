import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoggedOutNavbar from "../LoggedOutNavbar";
import LoggedInNavbar from "../LoggedInNavbar";
import PostAJobButton from "../PostAJobButton";
import styles from "./MyNavbar.module.css";
import nusccsgplogo from "../../../assets/nusccsgp.png";

const MyNavbar = ({ isLoggedIn }) => {
  const LoginButton = ({ isLoggedIn }) => {
    if (isLoggedIn != null) {
      return <LoggedInNavbar />;
    }
    return <LoggedOutNavbar />;
  };

  return (
    <div className={styles.navback}>
      <div className={styles.navbar}>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">
              <img
                className={styles.navbarLogo}
                src={nusccsgplogo}
                alt="NUS CCSGP Logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <LoginButton isLoggedIn={isLoggedIn} />
            </Nav>
            <PostAJobButton />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default MyNavbar;

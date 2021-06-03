import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../SignedOutNavbar";
import SignedInOrgNavbar from "../SignedInOrgNavbar";
import PostAJobButton from "../PostAJobButton";
import styles from "./MyNavbar.module.css";
import nusccsgplogo from "../../../assets/nusccsgp.png";

const MyNavbar = ({ isSignedIn }) => {
  const LoginButton = ({ isSignedIn }) => {
    if (isSignedIn != null) {
      return <SignedInOrgNavbar />;
    }
    return <SignedOutNavbar />;
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
              <LoginButton isSignedIn={isSignedIn} />
            </Nav>
            <PostAJobButton />
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default MyNavbar;

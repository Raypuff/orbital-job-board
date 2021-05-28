import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./MyNavbar.module.css";

const MyNavbar = () => {
  return (
    <Navbar className={styles.navBar}>
      <Navbar.Collapse className="justify-content-start">
        <Navbar.Text>
          <Link className={styles.signIn} to="/">
            Home
          </Link>
        </Navbar.Text>
      </Navbar.Collapse>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <Link className={styles.signIn} to="sign_in">
            Sign in
          </Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;

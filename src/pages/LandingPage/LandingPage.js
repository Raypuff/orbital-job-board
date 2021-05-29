import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import LoggedOutNavbar from "../../components/LoggedOutNavbar";
import LoggedInNavbar from "../../components/LoggedInNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { useAuth } from "../../contexts/AuthContext";

const LandingPage = () => {
  const { currentUser } = useAuth();

  function NavBarLoggedIn() {
    if (currentUser != null) {
      return <LoggedInNavbar />;
    }
    return <LoggedOutNavbar />;
  }

  return (
    <>
      <Header />
      <NavBarLoggedIn isLoggedIn={currentUser} />
      <div className={styles.mainPage}>
        <h1 className={styles.hookTag}>
          <span className={styles.yourself}>It's time to get yourself </span>
          <span className={styles.involved}>involved.</span>
        </h1>
        <Link to="/jobboard">
          <Button variant="warning">Volunteer Now!</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;

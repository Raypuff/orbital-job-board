import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { useAuth } from "../../contexts/AuthContext";

const LandingPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <div className={styles.mainPage}>
        <h1 className={styles.hookTag}>
          <span className={styles.yourself}>It's time to get yourself </span>
          <span className={styles.involved}>involved.</span>
        </h1>
        <Link to="/job_board">
          <Button variant="warning">Volunteer Now!</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;

import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import MyNavbar from "../../components/MyNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <>
      <Header />
      <MyNavbar />
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

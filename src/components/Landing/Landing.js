import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.mainPage}>
      <h1 className={styles.hookTag}>
        <span className={styles.yourself}>It's time to get yourself </span>
        <span className={styles.involved}>involved.</span>
      </h1>
      <Link to="/job-board">
        <Button variant="warning">Volunteer Now!</Button>
      </Link>
    </div>
  );
};

export default Landing;

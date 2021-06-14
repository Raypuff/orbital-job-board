import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.contentContainer}>
          <div className={styles.title1}>It's time to get</div>
          <div className={styles.title2}>involved.</div>
          <Link className={styles.link} to="/jobs">
            <div className={styles.button}>
              <div className={styles.buttonText}>Volunteer now!</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

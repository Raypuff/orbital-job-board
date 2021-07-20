//IMPORTS
//Bootstrap
import { Row, Col } from "react-bootstrap";
//React Router
import { Link } from "react-router-dom";
//Auth Context
import { useAuth } from "../../contexts/AuthContext";
//Images
import landingbg from "../../assets/backgrounds/landingbg.png";
//Animations
import { Fade } from "react-reveal";
//CSS Modules
import styles from "./Landing.module.css";
import { useEffect } from "react";

const Landing = () => {
  //CUSTOM HOOKS
  //Retrieve the user details
  const { currentUser, userType } = useAuth();

  //Don't show
  function showPostAJobButton() {
    return !(currentUser !== null && userType !== "organization");
  }

  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <div className={styles.hookWrapper}>
            <div className={styles.hook1}>It is time to get</div>
            <Fade>
              <div className={styles.hook2}>involved.</div>
            </Fade>
            <div className={styles.hook3}>
              We connect volunteers from NUS with charities and organizations.
              Join us as we make Singapore a more loving, gracious and accepting
              country one volunteer job at at time.
            </div>
            <div className={styles.buttonRow}>
              <Link
                to="/jobs"
                className={
                  showPostAJobButton() ? styles.button1 : styles.button3
                }
              >
                <div className={styles.buttonText1}>Volunteer now</div>
              </Link>

              <Link
                to="/post-a-job"
                className={
                  showPostAJobButton() ? styles.button2 : styles.displayNone
                }
              >
                <div className={styles.buttonText2}>Post a job</div>
              </Link>
            </div>
          </div>
        </Col>
        <Col className={styles.rightCol}></Col>
      </Row>
      <img className={styles.bg} src={landingbg} alt="landing page graphic" />
    </div>
  );
};

export default Landing;

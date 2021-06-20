import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import landingbg from "../../assets/landingbg.png";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <div className={styles.hookWrapper}>
            <div className={styles.hook1}>It is time to get</div>
            <div className={styles.hook2}>involved.</div>
            <div className={styles.hook3}>
              We connect volunteers from NUS with charities and organizations.
              Join us as we make Singapore a more loving, gracious and accepting
              country one volunteer job at at time.
            </div>
            <div className={styles.buttonRow}>
              <Link to="/jobs" className={styles.button1}>
                <div className={styles.buttonText1}>Volunteer now</div>
              </Link>
              <Link to="/post-a-job" className={styles.button2}>
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

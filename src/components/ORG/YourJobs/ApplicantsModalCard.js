import { Card, Button, Col, Row } from "react-bootstrap";
import {
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { dummyStus } from "../../DummyData";
import styles from "./ApplicantsModalCard.module.css";

const ApplicantsModalCard = ({ application }) => {
  const allStus = dummyStus;
  const yourApplication = application;
  const yourStudent = allStus[yourApplication.stuID];

  return (
    <Card>
      <div className={styles.cardContainer}>
        <Row>
          <Col lg={9}>
            <div className={styles.topRowContainer}>
              <h5>{yourStudent.name}</h5>
              <div
                className={
                  yourApplication.status === "Pending"
                    ? styles.pending
                    : styles.displayNone
                }
              >
                <HourglassSplit />
                Pending
              </div>
              <div
                className={
                  yourApplication.status === "Rejected"
                    ? styles.rejected
                    : styles.displayNone
                }
              >
                <XCircleFill />
                Rejected
              </div>
              <div
                className={
                  yourApplication.status === "Accepted"
                    ? styles.accepted
                    : styles.displayNone
                }
              >
                <CheckCircleFill />
                Accepted
              </div>
            </div>
            <h6>Submitted on {yourApplication.dateApplied.toDateString()}</h6>
            <h6>Course of study: {yourStudent.course}</h6>
            <h6>Year of study: {yourStudent.yearOfStudy}</h6>
            <h6>Mobile number: {yourStudent.contactNo}</h6>
            <h6>Email address: {yourStudent.email}</h6>
            <h6>
              Additional information:
              <br />
              {yourApplication.stuAddInfo}
            </h6>
          </Col>
          <Col lg={3}>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <Button variant="outline-danger">Reject</Button>
                <Button variant="outline-success">Accept</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ApplicantsModalCard;

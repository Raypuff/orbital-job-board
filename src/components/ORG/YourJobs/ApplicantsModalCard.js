import { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import {
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import styles from "./ApplicantsModalCard.module.css";

const ApplicantsModalCard = ({
  id,
  stuID,
  jobID,
  status,
  stuAddInfo,
  dateApplied,
  name,
  email,
  contactNo,
  course,
  yearOfStudy,
  title,
  setChanged,
}) => {
  //const [loading, setLoading] = useState(false);
  // useState for frontend update of status

  const handleAcceptReject = async (choice) => {
    //setLoading(true);
    const body = { status: choice };
    try {
      const updateAppStatus = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/job-applications/status/" + id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setChanged(true);

      const text = `Hello ${name}! There has been an update to your volunteer application. Please click on the link below and log in to view the updates to your application! volunteer-ccsgp-vercel.app`;
      const html = `Hello ${name}!<br>There has been an update to your volunteer application. <br>Please click on the link below and log in to view the updates to your application! <a href="volunteer-ccsgp-vercel.app">volunteer-ccsgp-vercel.app</a>`;
      const msg = {
        msg: {
          to: email,
          from: "volunteerccsgp@gmail.com",
          subject: `[Volunteer CCSGP] Change in status of your job application for ${title}`,
          text: text,
          html: html,
        },
      };
      await fetch(process.env.REACT_APP_BACKEND_URL + "/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
    } catch (err) {
      console.error(err);
    }
    //setLoading(false);
  };

  return (
    <Card>
      <div className={styles.cardContainer}>
        <Row>
          <Col lg={9}>
            <div className={styles.topRowContainer}>
              <h5>{name}</h5>
              <div
                className={
                  status === "Pending" ? styles.pending : styles.displayNone
                }
              >
                <HourglassSplit />
                Pending
              </div>
              <div
                className={
                  status === "Rejected" ? styles.rejected : styles.displayNone
                }
              >
                <XCircleFill />
                Rejected
              </div>
              <div
                className={
                  status === "Accepted" ? styles.accepted : styles.displayNone
                }
              >
                <CheckCircleFill />
                Accepted
              </div>
            </div>
            <h6>Submitted on {dateApplied}</h6>
            <h6>Course of study: {course}</h6>
            <h6>Year of study: {yearOfStudy}</h6>
            <h6>Mobile number: {contactNo}</h6>
            <h6>Email address: {email}</h6>
            <h6>
              Additional information:
              <br />
              {stuAddInfo}
            </h6>
          </Col>
          <Col lg={3}>
            <div className={styles.buttonContainer}>
              <div className={styles.buttonWrapper}>
                <div
                  className={
                    status === "Pending" ? styles.display : styles.displayNone
                  }
                >
                  <Button
                    variant="outline-danger"
                    onClick={(event) => handleAcceptReject(event.target.value)}
                    value="Rejected"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={(event) => handleAcceptReject(event.target.value)}
                    value="Accepted"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ApplicantsModalCard;

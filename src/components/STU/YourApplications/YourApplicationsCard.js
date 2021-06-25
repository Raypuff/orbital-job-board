import { forwardRef, useEffect, useState } from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ThreeDotsVertical,
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import styles from "./YourApplicationsCard.module.css";

const YourApplicationsCard = ({
  key,
  id,
  stuID,
  jobID,
  status,
  stuAddInfo,
  dateApplied,
}) => {
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);

  const getJob = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/jobs/" + jobID
    );
    const jsonData = await response.json();
    setJob(jsonData);
    setJobLoading(false);
  };

  useEffect(() => {
    getJob();
  }, [job]);

  if (jobLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <Card>
          <Row>
            <Col lg={8}>
              <div className={styles.contentContainer}>
                <div className={styles.topRowContainer}>
                  <div className={styles.titleContainer}>
                    <h4 className={styles.title}>{job.title}</h4>
                    <div
                      className={
                        status === "Pending"
                          ? styles.pending
                          : styles.displayNone
                      }
                    >
                      <HourglassSplit className={styles.icons} />
                      <h6>Status: Pending acceptance from organization</h6>
                    </div>
                    <div
                      className={
                        status === "Rejected"
                          ? styles.rejected
                          : styles.displayNone
                      }
                    >
                      <XCircleFill className={styles.icons} />
                      <h6>Status: Rejected by organization</h6>
                    </div>
                    <div
                      className={
                        status === "Accepted"
                          ? styles.accepted
                          : styles.displayNone
                      }
                    >
                      <CheckCircleFill className={styles.icons} />
                      <h6>Status: Accepted</h6>
                    </div>
                  </div>
                  <div className={styles.dotsContainerMobile}>
                    <TripleDot jobID={jobID} />
                  </div>
                </div>

                <h6>Applied on: {new Date(dateApplied).toDateString()}</h6>
                <h6>
                  Job status:{" "}
                  {job.status !== "Completed" ? "In progress" : "Completed"}
                </h6>

                <h6>
                  Location:{" "}
                  {job.platform === "Virtual"
                    ? "Virtual"
                    : job.platform === "Physical" && job.multiLocation
                    ? "Multiple locations"
                    : job.platform === "Physical" && !job.multiLocation
                    ? `${job.location} S(${job.postalCode})`
                    : ""}
                </h6>
                <h6>Commitment type: {job.type}</h6>
                <h6>
                  Your additional information:
                  <br />
                  {stuAddInfo}
                </h6>
              </div>
            </Col>
            <Col lg={4}>
              <div className={styles.applicantsContainer}>
                <div className={styles.dotsContainer}>
                  <TripleDot jobID={jobID} />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default YourApplicationsCard;

const CustomDropdown = forwardRef(({ children, onClick }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    href=""
    ref={ref}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}
  >
    <ThreeDotsVertical className={styles.dots} />
  </a>
));

const TripleDot = ({ jobID }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
      <Dropdown.Menu align="right">
        <Dropdown.Item as={Link} to={`/jobs/${jobID}`} target="blank">
          View listing
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// function tConvert(time) {
// 	// Check correct time format and split into components
// 	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
// 		time,
// 	];

// 	if (time.length > 1) {
// 		// If time format correct
// 		time = time.slice(1); // Remove full string match value
// 		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
// 		time[0] = +time[0] % 12 || 12; // Adjust hours
// 	}
// 	return time.join(""); // return adjusted time or original string
// }

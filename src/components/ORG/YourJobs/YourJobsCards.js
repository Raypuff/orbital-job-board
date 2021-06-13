import { useState, forwardRef } from "react";
import { Row, Col, Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ThreeDotsVertical,
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import styles from "./YourJobsCards.module.css";
import ApplicantsModal from "./ApplicantsModal";

const YourJobsCards = ({
  key,
  id,
  status,
  title,
  beneficiaries,
  skills,
  purpose,
  platform,
  multiLocation,
  location,
  postalCode,
  type,
  flexiDate,
  longStartDate,
  longEndDate,
  flexiHours,
  longHours,
  adShift,
  addInfo,
  imageUrl,
  pocName,
  pocNo,
  pocEmail,
  datePosted,
  applicants,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Card>
          <Row>
            <Col lg={8}>
              <div className={styles.contentContainer}>
                <div className={styles.topRowContainer}>
                  <div className={styles.titleContainer}>
                    <h4 className={styles.title}>{title}</h4>
                    <div
                      className={
                        status === "Pending"
                          ? styles.pending
                          : styles.displayNone
                      }
                    >
                      <HourglassSplit className={styles.icons} />
                      <h6>Status: Pending approval by administrator</h6>
                    </div>
                    <div
                      className={
                        status === "Rejected"
                          ? styles.rejected
                          : styles.displayNone
                      }
                    >
                      <XCircleFill className={styles.icons} />
                      <h6>Status: Rejected by administrator</h6>
                    </div>
                    <div
                      className={
                        status === "Approved"
                          ? styles.approved
                          : styles.displayNone
                      }
                    >
                      <CheckCircleFill className={styles.icons} />
                      <h6>Status: Approved by administrator</h6>
                    </div>
                    <div
                      className={
                        status === "TakenDown"
                          ? styles.rejected
                          : styles.displayNone
                      }
                    >
                      <XCircleFill className={styles.icons} />
                      <h6>Status: Post taken down by administrator</h6>
                    </div>
                    <div
                      className={
                        status === "Completed"
                          ? styles.status
                          : styles.displayNone
                      }
                    >
                      <CheckCircleFill className={styles.icons} />
                      <h6>Status: Completed</h6>
                    </div>
                  </div>
                  <div className={styles.dotsContainerMobile}>
                    <TripleDot id={id} setShowModal={setShowModal} />
                  </div>
                </div>

                <h6>Posted on: {datePosted.toDateString()}</h6>
                <h6>
                  Location:{" "}
                  {platform === "Virtual"
                    ? "Virtual"
                    : platform === "Physical" && multiLocation
                    ? "Multiple locations"
                    : platform === "Physical" && !multiLocation
                    ? `${location} S(${postalCode})`
                    : ""}
                </h6>
                <h6>Commitment type: {type}</h6>
                <div
                  className={
                    type === "Long term" ? styles.type : styles.displayNone
                  }
                >
                  <h6>
                    Start date:{" "}
                    {type === "Long term" && flexiDate
                      ? "Flexible"
                      : type === "Long term" && !flexiDate
                      ? longStartDate.toDateString()
                      : ""}
                  </h6>
                  <h6>
                    End date:{" "}
                    {type === "Long term" && flexiDate
                      ? "Flexible"
                      : type === "Long term" && !flexiDate
                      ? longStartDate.toDateString()
                      : ""}
                  </h6>
                  <h6>
                    Required hours:{" "}
                    {type === "Long term" && flexiHours
                      ? "Flexible"
                      : type === "Long term" && !flexiHours
                      ? longHours
                      : ""}
                  </h6>
                </div>
                <div
                  className={
                    type === "Ad hoc" ? styles.type : styles.displayNone
                  }
                >
                  <h6>Shifts:</h6>
                  {type === "Ad hoc" &&
                    adShift !== null &&
                    adShift.map((shift, index) => {
                      return (
                        <h6>{`Shift ${
                          index + 1
                        }: ${shift.date.toDateString()} | ${tConvert(
                          shift.startTime
                        )} - ${tConvert(shift.endTime)}`}</h6>
                      );
                    })}
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={styles.applicantsContainer}>
                <div className={styles.dotsContainer}>
                  <TripleDot id={id} setShowModal={setShowModal} />
                </div>

                <div className={styles.applicants}>
                  <h4>Applicants: {applicants.length}</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <ApplicantsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        key={id}
        id={id}
        status={status}
        title={title}
        beneficiaries={beneficiaries}
        skills={skills}
        purpose={purpose}
        platform={platform}
        multiLocation={multiLocation}
        location={location}
        postalCode={postalCode}
        type={type}
        flexiDate={flexiDate}
        longStartDate={longStartDate}
        longEndDate={longEndDate}
        flexiHours={flexiHours}
        longHours={longHours}
        adShift={adShift}
        addInfo={addInfo}
        imageUrl={imageUrl}
        pocName={pocName}
        pocNo={pocNo}
        pocEmail={pocEmail}
        datePosted={datePosted}
        applicants={applicants}
      />
    </>
  );
};

export default YourJobsCards;

const statusDict = {
  Pending: "Pending approval by administrator",
  Rejected: "Rejected by administrator",
  Approved: "Approved",
  TakenDown: "Taken down by administrator",
  Completed: "Completed",
};

const CustomDropdown = forwardRef(({ children, onClick }, ref) => (
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

const TripleDot = ({ id, setShowModal }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
      <Dropdown.Menu align="right">
        <Dropdown.Item>Edit job</Dropdown.Item>
        <Dropdown.Item onClick={() => setShowModal(true)}>
          View applicants
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={`/jobs/${id}`} target="blank">
          View listing
        </Dropdown.Item>
        <Dropdown.Item>Mark as completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

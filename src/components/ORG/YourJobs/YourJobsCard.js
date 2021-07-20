//IMPORTS
//React Hooks
import { useState, forwardRef, useEffect, useRef } from "react";
//Bootstrap
import {
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  ThreeDotsVertical,
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
//Components
import ApplicantsModal from "./ApplicantsModal";
//React Router
import { Link } from "react-router-dom";
//CSV Export
import { CSVLink } from "react-csv";
//CSS Modules
import styles from "./YourJobsCard.module.css";

import { useJob } from "../../../contexts/JobContext";
import { useOrg } from "../../../contexts/OrgContext";

const YourJobsCard = ({
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
  flexiShifts,
  adShift,
  addInfo,
  imageUrl,
  closingDate,
  noClosingDate,
  pocName,
  pocNo,
  pocEmail,
  dateCreated,
  datePosted,
  applicants,
}) => {
  //USESTATES
  //Show State of Modals
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  //Applications
  const [applications, setApplications] = useState([]);
  //Applications to export after being selected
  const [exportApplications, setExportApplications] = useState([]);

  //CUSTOM HOOKS
  //Refs to refer to the selections for exporting applicants
  const acceptedRef = useRef();
  const pendingRef = useRef();
  const rejectedRef = useRef();

  const { getAppsOfJob, setJobAsComplete } = useOrg();

  async function getPageData() {
    const appData = getAppsOfJob(id);
    setApplications(appData);
  }

  //USEEFFECTS
  //Fetching applications
  useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showApplicantsModal]);

  //FUNCTIONS
  //To filter through applications that were selected for
  const processApplications = () => {
    setExportApplications(
      applications
        .filter((app) => {
          if (app.status === "Accepted") {
            if (acceptedRef.current && acceptedRef.current.checked === true) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        })
        .filter((app) => {
          if (app.status === "Pending") {
            if (pendingRef.current.checked === true) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        })
        .filter((app) => {
          if (app.status === "Rejected") {
            if (rejectedRef.current.checked === true) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        })
    );
  };
  //Mark a job as complete
  const handleComplete = async () => {
    try {
      await setJobAsComplete(id);
    } catch (err) {
      console.error(err);
    }
    window.location.reload(false);
  };

  const TripleDot = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
        <Dropdown.Menu align="right">
          {status !== "Completed" && (
            <Dropdown.Item as={Link} to={`/your-jobs/edit/${id}`}>
              Edit job
            </Dropdown.Item>
          )}
          {applications && applications.length > 0 && (
            <Dropdown.Item onClick={() => setShowApplicantsModal(true)}>
              View applicants
            </Dropdown.Item>
          )}
          {applications && applications.length > 0 && (
            <Dropdown.Item onClick={() => setShowExportModal(true)}>
              Export applicants
            </Dropdown.Item>
          )}
          <Dropdown.Item as={Link} to={`/jobs/${id}`} target="blank">
            View listing
          </Dropdown.Item>
          {status === "Approved" && (
            <Dropdown.Item onClick={() => setShowCompleteModal(true)}>
              Mark as completed
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

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
                    <TripleDot />
                  </div>
                </div>

                <h6>
                  Created on:{" "}
                  {dateCreated
                    ? new Date(dateCreated).toDateString()
                    : "No date created"}
                </h6>
                <h6
                  className={
                    status !== "Approved" && status !== "Completed"
                      ? styles.displayNone
                      : null
                  }
                >
                  Posted on:{" "}
                  {datePosted
                    ? new Date(datePosted).toDateString()
                    : "No date posted as job is not approved"}
                </h6>
                <h6>
                  Applications close on:{" "}
                  {noClosingDate
                    ? "No closing date for applications"
                    : new Date(closingDate).toDateString()}
                </h6>
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
                      ? new Date(longStartDate).toDateString()
                      : ""}
                  </h6>
                  <h6>
                    End date:{" "}
                    {type === "Long term" && flexiDate
                      ? "Flexible"
                      : type === "Long term" && !flexiDate
                      ? new Date(longStartDate).toDateString()
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
                  <h6>
                    Shifts:{" "}
                    {type === "Ad hoc"
                      ? !flexiShifts
                        ? adShift && adShift.length > 1
                          ? adShift.map((shift, index) => {
                              return (
                                <h6 key={index}>{`Shift ${
                                  index + 1
                                }: ${new Date(
                                  shift.date
                                ).toDateString()} | ${tConvert(
                                  shift.startTime
                                )} - ${tConvert(shift.endTime)}`}</h6>
                              );
                            })
                          : "No shifts indicated"
                        : "Flexible shifts"
                      : ""}
                  </h6>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={styles.applicantsContainer}>
                <div className={styles.dotsContainer}>
                  <TripleDot />
                </div>

                <div
                  className={
                    applicants ? styles.applicants : styles.noApplicants
                  }
                  onClick={() => setShowApplicantsModal(true)}
                >
                  Applicants: {applicants ? applicants.length : "0"}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <ApplicantsModal
        show={showApplicantsModal}
        onHide={() => setShowApplicantsModal(false)}
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
        dateCreated={dateCreated}
        datePosted={datePosted}
        applicants={applicants}
      />
      {/* MODALS */}
      {/* Mark as complete modal */}
      <Modal
        show={showCompleteModal}
        onHide={() => setShowCompleteModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Mark as completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to mark {title} as complete. Your job will no longer be
          publicly available on the job board. You will not be able to undo this
          action. Are you sure you want to perform this action?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="danger" onClick={() => handleComplete()}>
            Mark as completed
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Export applicants modal */}
      <Modal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        size="md"
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Export applicants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-4">
              Select the types of applicants that you would like to export into
              a CSV spreadsheet
            </div>
            <div className="d-flex flex-column align-items-center">
              <Form.Group controlId="formAccepted">
                <Form.Check
                  type="checkbox"
                  ref={acceptedRef}
                  label="Accepted applicants"
                />
              </Form.Group>
              <Form.Group controlId="formPending">
                <Form.Check
                  type="checkbox"
                  ref={pendingRef}
                  label="Pending applicants"
                />
              </Form.Group>
              <Form.Group controlId="formRejected">
                <Form.Check
                  type="checkbox"
                  ref={rejectedRef}
                  label="Rejected applicants"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <CSVLink
              data={exportApplications}
              filename={`CCSGP ${title} Volunteer.csv`}
            >
              <Button
                variant="primary"
                disabled={!applications}
                onClick={processApplications}
              >
                Export applicants
              </Button>
            </CSVLink>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default YourJobsCard;

//CUSTOM TRIPLE DOT BUTTON
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
    <OverlayTrigger placement="left" overlay={renderTooltip}>
      <ThreeDotsVertical className={styles.dots} />
    </OverlayTrigger>
  </a>
));

//TOOLTIPS
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    More actions
  </Tooltip>
);

//FUNCTION TO CONVERT TIME FORMAT
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

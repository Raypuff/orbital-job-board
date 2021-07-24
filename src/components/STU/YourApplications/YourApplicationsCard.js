//IMPORTS
//React Hooks
import { forwardRef, useEffect, useState } from "react";
//Bootstrap
import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import {
  ThreeDotsVertical,
  HourglassSplit,
  XCircleFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
//React Router
import { Link } from "react-router-dom";
//CSS Modules
import styles from "./YourApplicationsCard.module.css";
//Contexts
import { useJob } from "../../../contexts/JobContext";
import { useStu } from "../../../contexts/StuContext";

const YourApplicationsCard = ({
  key,
  id,
  stuID,
  jobID,
  status,
  stuAddInfo,
  dateApplied,
}) => {
  //USESTATES
  //Job status and whether it is still loading
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState(false);

  const { getJobDetails } = useJob();
  const { deleteApps } = useStu();

  async function getPageData() {
    const jobData = await getJobDetails(jobID);
    setJob(jobData);
    setJobLoading(false);
  }

  //USEEFFECTS
  //Retrieving job details
  useEffect(() => {
    getPageData();
  }, [job]);

  //LOADING
  if (jobLoading) {
    return (
      <div className="w-100 d-flex justify-content-center py-2 mb-2">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
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
                    <TripleDot
                      jobID={jobID}
                      setShowDeletionConfirmation={setShowDeletionConfirmation}
                    />
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
                  <TripleDot
                    jobID={jobID}
                    setShowDeletionConfirmation={setShowDeletionConfirmation}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <Modal
        show={showDeletionConfirmation}
        onHide={() => {
          setShowDeletionConfirmation(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>You are about to delete your application</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          Are you sure you want to do this? You cannot undo this action.
          <Button
            variant="danger"
            onClick={async () => {
              await deleteApps(id, stuID, job.id);
              window.location.reload(false);
            }}
          >
            Delete application
          </Button>
        </Modal.Body>
      </Modal>
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

const TripleDot = ({ jobID, setShowDeletionConfirmation }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
      <Dropdown.Menu align="right">
        <Dropdown.Item as={Link} to={`/jobs/${jobID}`} target="blank">
          View listing
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setShowDeletionConfirmation(true);
          }}
        >
          Delete application
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

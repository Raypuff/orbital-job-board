import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import ApplicantsModalCard from "./ApplicantsModalCard";
import styles from "./ApplicantsModal.module.css";

const ApplicantsModal = ({
  show,
  onHide,
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
  //create usestate for job apps
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    const response = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.com/job_applications/" + id
    );
    const jsonData = await response.json();
    setApplications(jsonData);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const [filterField, setFilterField] = useState("All");
  const onHideAndResetFilter = () => {
    onHide();
    setFilterField("All");
  };

  const applicationsFiltered = applications.filter((application) => {
    if (filterField === "All") {
      return true;
    } else {
      return application.status === filterField;
    }
  });

  return (
    <Modal
      show={show}
      onHide={onHideAndResetFilter}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <div className={styles.titleContainer}>
          <Modal.Title className={styles.titleWrapper}>
            <div>{title}</div>
          </Modal.Title>
          <Form>
            <div className={styles.filterWrapper}>
              <Form.Label>Filter by: </Form.Label>
              <Form.Group style={{ margin: "0" }}>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    setFilterField(event.target.value);
                  }}
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </Form.Control>
              </Form.Group>
            </div>
          </Form>
        </div>
      </Modal.Header>
      <Modal.Body>
        {applicationsFiltered.length >= 1 ? (
          applicationsFiltered.map((application) => {
            return (
              <ApplicantsModalCard
                key={application.id}
                id={application.id}
                stuID={application.stuID}
                jobID={application.jobID}
                status={application.status}
                stuAddInfo={application.stuAddInfo}
                dateApplied={application.dateApplied}
                name={application.stuName}
                email={application.stuEmail}
                contactNo={application.stuNo}
                course={application.stuCourse}
                yearOfStudy={application.stuYearOfStudy}
              />
            );
          })
        ) : filterField === "All" ? (
          <div className={styles.emptyState}>
            There are no applicants for this job
          </div>
        ) : (
          <div className={styles.emptyState}>
            There are no applicants for this job that fulfil the following
            filter: {filterField}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ApplicantsModal;

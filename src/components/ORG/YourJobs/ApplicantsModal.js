import { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import ApplicantsModalCard from "./ApplicantsModalCard";
import { dummyApps, dummyStus } from "../../DummyData";
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
  const yourApplications = Object.values(dummyApps);

  const [filterField, setFilterField] = useState("All");
  const onHideAndResetFilter = () => {
    onHide();
    setFilterField("All");
  };

  const allStus = dummyStus;

  const yourApplicationsFiltered = yourApplications.filter((application) => {
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
        {yourApplicationsFiltered.length >= 1 ? (
          yourApplicationsFiltered.map((application) => {
            const stu = allStus[application.stuID];
            return (
              <ApplicantsModalCard
                key={application.id}
                id={application.id}
                stuID={application.stuID}
                jobID={application.jobID}
                status={application.status}
                stuAddInfo={application.stuAddInfo}
                dateApplied={application.dateApplied}
                name={stu.name}
                email={stu.email}
                contactNo={stu.contactNo}
                course={stu.course}
                yearOfStudy={stu.yearOfStudy}
              />
            );
          })
        ) : filterField === "All" ? (
          <div className={styles.emptyPage}>
            There are no applicants for this job
          </div>
        ) : (
          <div className={styles.emptyPage}>
            There are no applicants for this job that fulfil the following
            filter: {filterField}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ApplicantsModal;

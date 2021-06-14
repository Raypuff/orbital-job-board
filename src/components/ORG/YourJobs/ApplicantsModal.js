import { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import ApplicantsModalCard from "./ApplicantsModalCard";
import { dummyApps } from "../../DummyData";
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
          <Modal.Title>
            <div>{title}</div>
          </Modal.Title>
          <Form>
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
          </Form>
        </div>
      </Modal.Header>
      <Modal.Body>
        {yourApplications
          .filter((application) => {
            if (filterField === "All") {
              return true;
            } else {
              return application.status === filterField;
            }
          })
          .map((application) => {
            return <ApplicantsModalCard application={application} />;
          })}
      </Modal.Body>
    </Modal>
  );
};

export default ApplicantsModal;

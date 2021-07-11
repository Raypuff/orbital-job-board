import { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./JobDetailsAdminModal.module.css";
var uniqid = require("uniqid");

const handleAcceptReject = async (jobId, choice, reason, orgEmail, title) => {
  const body = { status: choice, removalReason: reason };

  try {
    await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs/status/" + jobId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    var notifChoice;

    if (choice === "TakenDown") {
      notifChoice = "Taken Down";
    } else {
      notifChoice = choice;
    }

    const newNotif = {
      newNotif: {
        id: uniqid(),
        receiverID: orgEmail,
        header: "Change in job status",
        message: `Your job (${title}) has been ${notifChoice}, please visit the Your Jobs page for more details.`,
        dateTime: new Date().toUTCString(),
        dismissed: false,
      },
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNotif),
    });
    window.location.reload(false);
  } catch (err) {
    console.error(err);
  }
};

export const JobDetailsAdminRejModal = ({
  show,
  onHide,
  id,
  orgType,
  orgName,
  orgEmail,
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
  applicants,
}) => {
  const rejReasonRef = useRef();
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>You are rejecting {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className={styles.modalContainer}>
            Are you sure you want to reject this posting?
            <Form.Label>Please provide a reason why</Form.Label>
            <Form.Control type="text" ref={rejReasonRef} required />
            <Button
              onClick={(event) =>
                handleAcceptReject(
                  id,
                  "Rejected",
                  rejReasonRef.current.value,
                  orgEmail,
                  title
                )
              }
              variant="danger"
            >
              Reject posting
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export const AdminOpenRejModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="danger" onClick={handleClick}>
        Reject posting
      </Button>
    </>
  );
};

export const JobDetailsAdminAppModal = ({
  show,
  onHide,
  id,
  orgType,
  orgName,
  orgEmail,
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
  applicants,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>You are approving {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContainer}>
          Are you sure you want to approve this posting?
          <Button
            onClick={(event) =>
              handleAcceptReject(id, "Approved", "", orgEmail, title)
            }
            variant="success"
          >
            Approve posting
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const AdminOpenAppModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="success" onClick={handleClick}>
        Approve posting
      </Button>
    </>
  );
};

export const JobDetailsAdminTDModal = ({
  show,
  onHide,
  id,
  orgType,
  orgName,
  orgEmail,
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
  applicants,
}) => {
  const tdReasonRef = useRef();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>You are taking down {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form controlId="formTakedownReason">
          <div className={styles.modalContainer}>
            Are you sure you want to take down this posting?
            <Form.Label>Please provide a reason why</Form.Label>
            <Form.Control type="text" ref={tdReasonRef} required />
            <Button
              onClick={(event) =>
                handleAcceptReject(
                  id,
                  "TakenDown",
                  tdReasonRef.current.value,
                  orgEmail,
                  title
                )
              }
              variant="danger"
            >
              Take down posting
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export const AdminOpenTDModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="danger" onClick={handleClick}>
        Take down posting
      </Button>
    </>
  );
};

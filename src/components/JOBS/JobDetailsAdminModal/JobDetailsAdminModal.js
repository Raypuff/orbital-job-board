//IMPORTS
//React Hooks
import { useRef } from "react";
//Bootstrap
import { Modal, Button, Form } from "react-bootstrap";
//CSS Modules
import styles from "./JobDetailsAdminModal.module.css";
//Contexts
import { useEmail } from "../../../contexts/EmailContext";
//Unique ID
var uniqid = require("uniqid");

//Function to handle job accept, reject or takedown
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

//Confirmation modal for rejecting a job
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

//Button to open the rejection modal
export const AdminOpenRejModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="danger" onClick={handleClick}>
        Reject posting
      </Button>
    </>
  );
};

//Confirmation modal for approving a job
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
  async function alertSubscribers() {
    const body = {
      tags: beneficiaries.concat(skills),
      subject: `[Volunteer CCSGP] New job posting: ${title}`,
      text: `Please check your account for a new job posting that you have subscribed to`,
      html: `Please check your account for a new job posting that you have subscribed to`,
    };
    try {
      await fetch(`http://localhost:5000/subscriptions/alert-subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>You are approving {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContainer}>
          Are you sure you want to approve this posting?
          <Button
            onClick={(event) => {
              handleAcceptReject(id, "Approved", "", orgEmail, title);
              alertSubscribers();
            }}
            variant="success"
          >
            Approve posting
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

//Button to open the approval modal
export const AdminOpenAppModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="success" onClick={handleClick}>
        Approve posting
      </Button>
    </>
  );
};

//Confirmation modal for taking down a job
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

//Button to open the take down modal
export const AdminOpenTDModalButton = ({ handleClick }) => {
  return (
    <>
      <Button variant="danger" onClick={handleClick}>
        Take down posting
      </Button>
    </>
  );
};

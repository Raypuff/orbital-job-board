//IMPORTS
//React Hooks
import { useRef } from "react";
//Bootstrap
import { Modal, Button, Form } from "react-bootstrap";
//CSS Modules
import styles from "./JobDetailsAdminModal.module.css";
//Contexts
import { useAdmin } from "../../../contexts/AdminContext";
import { useNotif } from "../../../contexts/NotifContext";
//Unique ID
var uniqid = require("uniqid");

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
  const { updateJobStatus } = useAdmin();
  const { sendNotif } = useNotif();

  const handleReject = async (jobId, reason, orgEmail, title) => {
    try {
      await updateJobStatus(jobId, "Rejected", reason);

      const newNotif = {
        newNotif: {
          id: uniqid(),
          receiverID: orgEmail,
          header: "Change in job status",
          message: `Your job (${title}) has been rejected, please visit the Your Jobs page for more details.`,
          dateTime: new Date().toUTCString(),
          dismissed: false,
        },
      };

      await sendNotif(newNotif);

      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

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
              onClick={(event) => {
                handleReject(id, rejReasonRef.current.value, orgEmail, title);
              }}
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
  const { updateJobStatus, alertSubscribers } = useAdmin();
  const { sendNotif } = useNotif();

  const handleAccept = async (jobId, orgEmail, title) => {
    try {
      await updateJobStatus(jobId, "Approved", "");

      const newNotif = {
        newNotif: {
          id: uniqid(),
          receiverID: orgEmail,
          header: "Change in job status",
          message: `Your job (${title}) has been Approved, please visit the Your Jobs page for more details.`,
          dateTime: new Date().toUTCString(),
          dismissed: false,
        },
      };

      await sendNotif(newNotif);
      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>You are approving {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContainer}>
          Are you sure you want to approve this posting?
          <Button
            onClick={async (event) => {
              await handleAccept(id, orgEmail, title);
              alertSubscribers(beneficiaries, skills, title);
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
  const { updateJobStatus } = useAdmin();
  const { sendNotif } = useNotif();

  const handleTakedown = async (jobId, reason, orgEmail, title) => {
    try {
      await updateJobStatus(jobId, "TakenDown", reason);

      const newNotif = {
        newNotif: {
          id: uniqid(),
          receiverID: orgEmail,
          header: "Change in job status",
          message: `Your job (${title}) has been Taken Down, please visit the Your Jobs page for more details.`,
          dateTime: new Date().toUTCString(),
          dismissed: false,
        },
      };

      await sendNotif(newNotif);

      window.location.reload(false);
    } catch (err) {
      console.error(err);
    }
  };

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
              onClick={async (event) =>
                await handleTakedown(
                  id,
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

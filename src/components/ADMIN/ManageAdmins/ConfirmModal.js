//IMPORTS
//React Hoooks
import { useState } from "react";
//Bootstrap
import { Modal, Button, Alert, Card } from "react-bootstrap";
//CSS Modules
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ show, onHide, adminID, adminName, action }) => {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSuccess("");
    setError("");
    try {
      //hey zech do stuff here
      console.log(`i am performing ${action} on ${adminID}`);
      setSuccess("Success!");
    } catch (error) {
      console.log(error);
      setError("Error occured");
    }
    setIsSubmitting(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h5" className={styles.modalTitle}>
          You are about to{" "}
          {action === "remove"
            ? `remove ${adminName} as an administrator`
            : action === "promote"
            ? `promote ${adminName} to become a master admin`
            : action === "demote"
            ? `demote ${adminName} to become a regular admin`
            : "error state"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalBody}>
          Are you sure you want to do this?
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={isSubmitting || success || error}
          >
            {action === "remove"
              ? "Remove"
              : action === "promote"
              ? "Promote"
              : action === "demote"
              ? "Demote"
              : "error state"}
          </Button>
        </div>
        <Card.Text />
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;

//IMPORTS
//React Hoooks
import { useState } from "react";
//Bootstrap
import { Modal, Button, Alert, Card } from "react-bootstrap";
//CSS Modules
import styles from "./ConfirmModal.module.css";

import { useAdmin } from "../../../contexts/AdminContext";

const ConfirmModal = ({ show, onHide, adminID, adminName, action }) => {
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { changeAdminStatus, deleteAdmin } = useAdmin();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSuccess("");
    setError("");
    var status;
    if (action === "promote") {
      status = "Master";
    } else if (action === "demote") {
      status = "Regular";
    }

    try {
      if (status !== "remove") {
        await changeAdminStatus(adminID, status);
      } else if (status === "remove") {
        console.log("Deleting admin");
        await deleteAdmin(adminID);
      }
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

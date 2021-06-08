import { Modal, Button } from "react-bootstrap";
// import styles from "./JobModal.module.css";

const JobModal = ({
  show,
  onHide,
  id,
  type,
  name,
  uen,
  email,
  status,
  title,
  purpose,
  beneficiary,
  skillsReq,
  duration,
  addInfo,
  pocName,
  pocNo,
  pocEmail,
  applicants,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            title yeet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>description yeet</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobModal;

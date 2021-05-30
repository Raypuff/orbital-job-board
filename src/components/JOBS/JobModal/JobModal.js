import { Modal, Button } from "react-bootstrap";
// import styles from "./JobModal.module.css";

const JobModal = ({
  show,
  onHide,
  id,
  title,
  org_name,
  beneficiary,
  duration,
  writeup,
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
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{`${org_name} | ${beneficiary} | ${duration}`}</h4>
          <p>{writeup}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobModal;

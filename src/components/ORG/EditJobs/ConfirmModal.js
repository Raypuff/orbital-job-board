import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";

const ConfirmModal = ({ job, show, onHide }) => {
  const updateEdits = () => {
    //set status as pending
    //update lat and lng according to new postal code (if it is physical and !multiLocation)
    //remove date posted(?)

    console.log(job);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to confirm your edits? If you decide to proceed
        with the changes, your job status will be changed to "Pending" and will
        need to be approved by an administrator before it can be publicly
        visible.
      </Modal.Body>
      <Modal.Footer>
        <Button className="mx-auto" variant="danger" onClick={updateEdits}>
          Confirm changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

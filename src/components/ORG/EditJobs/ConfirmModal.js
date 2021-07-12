import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useDist } from "../../../contexts/DistContext";

const ConfirmModal = ({ job, show, onHide }) => {
  const { getGeocode } = useDist();

  async function getLatLng(job) {
    var lat;
    var lng;
    var result;
    if (job.postalCode) {
      result = await getGeocode(`${job.postalCode}`);
      lat = result[0];
      lng = result[1];
    }
    job["lat"] = lat;
    job["lng"] = lng;

    return job;
  }

  const updateEdits = async () => {
    try {
      var editJob = await getLatLng(job);
      editJob.datePosted = null;
      editJob.status = "Pending";
      editJob = { editJob: editJob };
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/edit/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editJob),
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
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

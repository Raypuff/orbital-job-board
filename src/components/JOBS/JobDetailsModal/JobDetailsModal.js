import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

const JobDetailsModal = ({
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
  const { currentUser } = useAuth();

  if (currentUser !== null) {
    // NEED TO CHANGE TO VOLUNTEER ACCOUNT ONLY
    return (
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <SignedOutModal show={show} onHide={onHide} />;
  }
};

export default JobDetailsModal;

const SignedOutModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign in lol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Sign in lol</h4>
        <p>sign in pls first lmao</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

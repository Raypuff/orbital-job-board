import { Modal } from "react-bootstrap";

const ApplicantsModal = ({
  show,
  onHide,
  key,
  id,
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
  datePosted,
  applicants,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ height: "200vh" }}>p</p>
      </Modal.Body>
    </Modal>
  );
};

export default ApplicantsModal;

import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import JobBoardModal from "../JobBoardModal";
import styles from "./JobBoardCard.module.css";

const JobBoardCard = ({
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
  const [show, setShow] = useState(false);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`${type} | ${name} | ${beneficiary} | ${duration}`}</Card.Subtitle>
          <Card.Text>{purpose}</Card.Text>
          <Card.Text>{skillsReq}</Card.Text>
          <Card.Text>{addInfo}</Card.Text>
          <Card.Text>{`${pocName} | ${pocNo} | ${pocEmail}`}</Card.Text>
          <Card.Text>{email}</Card.Text>
        </Card.Body>
        <Button
          className={styles.applyButton}
          variant="primary"
          onClick={() => setShow(true)}
        >
          Apply Now!
        </Button>
        <JobBoardModal
          show={show}
          onHide={() => setShow(false)}
          id={id}
          type={type}
          name={name}
          uen={uen}
          email={email}
          status={status}
          title={title}
          purpose={purpose}
          beneficiary={beneficiary}
          skillsReq={skillsReq}
          duration={duration}
          addInfo={addInfo}
          pocName={pocName}
          pocNo={pocNo}
          pocEmail={pocEmail}
        />
      </Card>
    </>
  );
};

export default JobBoardCard;

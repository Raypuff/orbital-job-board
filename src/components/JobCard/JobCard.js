import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import JobModal from "../JobModal";
import styles from "./JobCard.module.css";

const JobCard = ({ id, title, org_name, beneficiary, duration, writeup }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`${org_name} | ${beneficiary} | ${duration}`}</Card.Subtitle>
          <Card.Text>{writeup}</Card.Text>
        </Card.Body>
        <Button
          className={styles.applyButton}
          variant="primary"
          onClick={() => setShow(true)}
        >
          Apply Now!
        </Button>
        <JobModal
          show={show}
          onHide={() => setShow(false)}
          id={id}
          title={title}
          org_name={org_name}
          beneficiary={beneficiary}
          duration={duration}
          writeup={writeup}
        />
      </Card>
    </>
  );
};

export default JobCard;

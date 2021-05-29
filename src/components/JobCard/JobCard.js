import { Card } from "react-bootstrap";

const JobCard = ({ id, title, org_name, beneficiary, duration, writeup }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`${org_name} | ${beneficiary} | ${duration}`}</Card.Subtitle>
        <Card.Text>{writeup}</Card.Text>
        <Card.Link href="#">Apply Now!</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default JobCard;

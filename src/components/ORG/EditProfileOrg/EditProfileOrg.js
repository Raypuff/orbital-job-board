import { Row, Col, Card, Button, Form } from "react-bootstrap";
import styles from "./EditProfileOrg.module.css";

const EditProfileOrg = ({ setEdit }) => {
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("your turn zech");
    // add alert to show success
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Edit your organization profile</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formOrgType">
                <Form.Label>Organization type</Form.Label>
                <Form.Control
                  placeholder="pull orgType from database"
                  // ref={???}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formOrgName">
                <Form.Label>Organization name</Form.Label>
                <Form.Control
                  placeholder="pull orgName from database"
                  // ref={???}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formuen">
                <Form.Label>Organization UEN</Form.Label>
                <Form.Control
                  placeholder="pull uen from database"
                  // ref={???}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formorgEmail">
                <Form.Label>Email address of organization</Form.Label>
                <Form.Control
                  placeholder="pull orgEmail from database"
                  // ref={???}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formpocName">
                <Form.Label>Name of contact person</Form.Label>
                <Form.Control
                  placeholder="Edit the contact person's name"
                  // ref={???}
                />
              </Form.Group>
              <Form.Group controlId="formpocNum">
                <Form.Label>Mobile number of contact person</Form.Label>
                <Form.Control
                  placeholder="Edit the contact person's mobile number"
                  // ref={???}
                />
              </Form.Group>
              {/* <Row>
                <Col> */}
              <Button
                // disabled={loading}
                variant="light"
                onClick={(event) => setEdit(false)}
              >
                Cancel
              </Button>
              {/* </Col>
                <Col> */}
              <Button
                // disabled={loading}
                variant="primary"
                type="submit"
                alignRight
              >
                Submit
              </Button>
              {/* </Col>
              </Row> */}
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileOrg;

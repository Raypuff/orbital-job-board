import EditProfileOrg from "../EditProfileOrg";
import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "./YourProfileOrg.module.css";

const YourProfileOrg = () => {
  const [edit, setEdit] = useState(false);

  if (edit === true) {
    return <EditProfileOrg setEdit={setEdit} />;
  } else {
    return (
      <div className={styles.formBG}>
        <div className={styles.formContainer}>
          <Card bg="light" text="dark" style={{ width: "23rem" }}>
            <Card.Header as="h6">Your organization profile</Card.Header>
            <Card.Body>
              <Form onSubmit={(event) => setEdit(true)}>
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
                    placeholder="pull pocName from database"
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formpocNum">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    placeholder="pull pocNum from database"
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Button
                  // disabled={loading}
                  variant="primary"
                  type="submit"
                >
                  Edit profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
};

export default YourProfileOrg;

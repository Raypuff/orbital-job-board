import EditProfileOrg from "../EditProfileOrg";
import { Card, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./YourProfileOrg.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const YourProfileOrg = () => {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/organization-accounts/" +
        currentUser.email,
      {}
    );
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  useEffect(() => {
    getUser();
  }, [edit]);

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
                <Form.Group controlId="formType">
                  <Form.Label>Organization type</Form.Label>{" "}
                  <Form.Control
                    placeholder={userData !== null ? userData.type : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Organization name</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.name : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formUen">
                  <Form.Label>
                    Organization UEN, Charity registration number or Society
                    registration number
                    <Form.Text className="text-muted">
                      Only applicable for Non-NUS Organizations
                    </Form.Text>
                  </Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.uen : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address of organization</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocName : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPocNo">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocNo : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPocEmail">
                  <Form.Label>Email address of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocEmail : ""}
                    readOnly
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
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

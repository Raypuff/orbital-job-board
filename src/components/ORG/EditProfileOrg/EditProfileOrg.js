import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useStore } from "../../../contexts/StoreContext";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./EditProfileOrg.module.css";
import { store } from "../../../firebase";

const EditProfileOrg = ({ setEdit }) => {
  const { currentUser } = useAuth();
  const { editItem } = useStore();
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  //initializing refs for submit function
  const orgtyperef = useRef();
  const orgnameref = useRef();
  const orguenref = useRef();
  const orgemailref = useRef();
  const pocnameref = useRef();
  const pocmobileref = useRef();

  const getUser = async () => {
    store
      .collection("organization_accounts")
      .doc(currentUser.email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAccountInfo = {
      organizationType:
        orgtyperef.current.value.trim() !== ""
          ? orgtyperef.current.value
          : userData.organizationType,
      organizationName:
        orgnameref.current.value.trim() !== ""
          ? orgnameref.current.value
          : userData.organizationName,
      organizationUEN:
        orguenref.current.value.trim() !== ""
          ? orguenref.current.value
          : userData.organizationUEN,
      organizationEmail:
        orgemailref.current.value.trim() !== ""
          ? orgemailref.current.value
          : userData.organizationEmail,
      nameOfContactPerson:
        pocnameref.current.value.trim() !== ""
          ? pocnameref.current.value
          : userData.nameOfContactPerson,
      mobileOfContactPerson:
        pocmobileref.current.value.trim() !== ""
          ? pocmobileref.current.value
          : userData.mobileOfContactPerson,
    };

    console.log(newAccountInfo);

    try {
      setSuccessful(false);
      setMessage("");
      setError("");
      setLoading(true);

      editItem(newAccountInfo, currentUser.email, "organization_accounts");
      setSuccessful(true);
      setMessage("User profile updated successfully!");
    } catch (err) {
      setError("Failed to update user info");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.formBG}>
        <div className={styles.formContainer}>
          <Card bg="light" text="dark" style={{ width: "23rem" }}>
            <Card.Header as="h6">Edit your organization profile</Card.Header>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && (
              <Alert variant="primary">Updating your profile...</Alert>
            )}
            {successful && <Alert variant="success">{message}</Alert>}
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOrgType">
                  <Form.Label>Organization type</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationType : ""
                    }
                    ref={orgtyperef}
                  />
                </Form.Group>
                <Form.Group controlId="formOrgName">
                  <Form.Label>Organization name</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationName : ""
                    }
                    ref={orgnameref}
                  />
                </Form.Group>
                <Form.Group controlId="formuen">
                  <Form.Label>Organization UEN</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationUEN : ""
                    }
                    ref={orguenref}
                  />
                </Form.Group>
                <Form.Group controlId="formorgEmail">
                  <Form.Label>Email address of organization</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationEmail : ""
                    }
                    ref={orgemailref}
                  />
                </Form.Group>
                <Form.Group controlId="formpocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.nameOfContactPerson : ""
                    }
                    ref={pocnameref}
                  />
                </Form.Group>
                <Form.Group controlId="formpocNum">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.mobileOfContactPerson : ""
                    }
                    ref={pocmobileref}
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
                  disabled={successful}
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
    </>
  );
};

export default EditProfileOrg;

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./EditProfileOrg.module.css";

const EditProfileOrg = ({ setEdit }) => {
  const [leftButton, setLeftButton] = useState("Cancel");
  const [leftButtonVar, setLeftButtonVar] = useState("light");
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  //initializing refs for submit function
  const typeRef = useRef();
  const nameRef = useRef();
  const uenRef = useRef();
  const emailRef = useRef();
  const pocNameRef = useRef();
  const pocNoRef = useRef();
  const pocEmailRef = useRef();

  const getUser = async () => {
    const response = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.com/organization_accounts/" +
        currentUser.email,
      {}
    );
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    //prevent page refresh
    event.preventDefault();

    //resetting submit states
    setSuccessful(false);
    setMessage("");
    setError("");

    //creating new object to send to backend
    const newAccountInfo = {
      type:
        typeRef.current.value.trim() !== ""
          ? typeRef.current.value
          : userData.type,
      name:
        nameRef.current.value.trim() !== ""
          ? nameRef.current.value
          : userData.name,
      uen:
        uenRef.current.value.trim() !== ""
          ? uenRef.current.value
          : userData.uen,
      pocName:
        pocNameRef.current.value.trim() !== ""
          ? pocNameRef.current.value
          : userData.pocName,
      pocNo:
        pocNoRef.current.value.trim() !== ""
          ? pocNoRef.current.value
          : userData.pocNo,
      pocEmail:
        pocEmailRef.current.value.trim() !== ""
          ? pocEmailRef.current.value
          : userData.pocEmail,
    };

    try {
      //signify start of update process
      setLoading(true);

      const response = await fetch(
        "https://volunteer-ccsgp-backend.herokuapp.com/organization_accounts/" +
          currentUser.email,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccountInfo),
        }
      );

      //set success usestate to true
      setSuccessful(true);
      setMessage("Organization profile updated successfully!");
      setLeftButton("Back");
      setLeftButtonVar("secondary");
    } catch (err) {
      setError("Failed to update user info");
      console.log(err);
    }

    //no longer loading as update process has ended
    setLoading(false);
  };

  return (
    <>
      <div className={styles.formBG}>
        <div className={styles.formContainer}>
          <Card bg="light" text="dark" style={{ width: "23rem" }}>
            <Card.Header as="h6">Edit your organization profile</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOrgType">
                  <Form.Label>Organization type</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={userData !== null ? userData.type : ""}
                    ref={typeRef}
                  >
                    <option>NUS Organization</option>
                    <option>Non-NUS Organization</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formOrgName">
                  <Form.Label>Organization name</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.name : ""}
                    ref={nameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formuen">
                  <Form.Label>
                    Organization UEN, Charity Registration No. or Society
                    Registration No.
                  </Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.uen : ""}
                    ref={uenRef}
                  />
                  <Form.Text className="text-muted">
                    Only applicable for Non-NUS Organizations
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address of organization</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    ref={emailRef}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formPocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocName : ""}
                    ref={pocNameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPocNum">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocNo : ""}
                    ref={pocNoRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPocEmail">
                  <Form.Label>Email address of contact person</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.pocEmail : ""}
                    ref={pocEmailRef}
                  />
                </Form.Group>

                <div className={styles.buttonContainer}>
                  <div>
                    <Button
                      variant={leftButtonVar}
                      onClick={(event) => setEdit(false)}
                    >
                      {leftButton}
                    </Button>
                  </div>
                  <div className={styles.rightButton}>
                    <Button
                      disabled={successful}
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>

                <Card.Text />
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && (
                  <Alert variant="primary">Updating your profile...</Alert>
                )}
                {successful && <Alert variant="success">{message}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProfileOrg;

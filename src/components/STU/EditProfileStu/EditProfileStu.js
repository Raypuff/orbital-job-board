import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./EditProfileStu.module.css";

const EditProfileStu = ({ setEdit }) => {
  const [leftButton, setLeftButton] = useState("Cancel");
  const [leftButtonVar, setLeftButtonVar] = useState("light");
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  //initializing refs for submit function
  const nameRef = useRef();
  const dobRef = useRef();
  const emailRef = useRef();
  const contactNoRef = useRef();
  const courseRef = useRef();
  const yearRef = useRef();

  const getUser = async () => {
    const response = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.com/student_accounts/" +
        currentUser.email
    );
    const jsonData = await response.json();
    setUserData(jsonData);
    setUserLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //resetting submit states
    setSuccessful(false);
    setMessage("");
    setError("");

    const newAccountInfo = {
      name:
        nameRef.current.value.trim() !== ""
          ? nameRef.current.value
          : userData.type,
      dob:
        dobRef.current.value.trim() !== ""
          ? dobRef.current.value
          : userData.name,
      contactNo:
        contactNoRef.current.value.trim() !== ""
          ? contactNoRef.current.value
          : userData.pocName,
      course:
        courseRef.current.value.trim() !== ""
          ? courseRef.current.value
          : userData.pocNo,
      year:
        yearRef.current.value.trim() !== ""
          ? yearRef.current.value
          : userData.pocEmail,
    };

    try {
      //signify start of update process
      setLoading(true);

      const response = await fetch(
        "https://volunteer-ccsgp-backend.herokuapp.com/student_accounts/" +
          currentUser.email,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccountInfo),
        }
      );

      setSuccessful(true);
      setMessage("User profile updated successfully!");
      setLeftButton("Back");
      setLeftButtonVar("secondary");
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
            <Card.Header as="h6">Edit your profile</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name as in NRIC</Form.Label>{" "}
                  <Form.Control
                    placeholder={userData !== null ? userData.name : ""}
                    ref={nameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formDob">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder={userData !== null ? userData.dob : ""}
                    ref={dobRef}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    ref={emailRef}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formContactNo">
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.contactNo : ""}
                    ref={contactNoRef}
                  />
                </Form.Group>
                <Form.Group controlId="formCourse">
                  <Form.Label>Course of study</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.course : ""}
                    ref={courseRef}
                  />
                </Form.Group>
                <Form.Group controlId="formYear">
                  <Form.Label>Year of study</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={userData !== null ? userData.year : ""}
                    ref={yearRef}
                  >
                    <option>Year 1</option>
                    <option>Year 2</option>
                    <option>Year 3</option>
                    <option>Year 4</option>
                    <option>Year 5</option>
                    <option>Alumni</option>
                  </Form.Control>
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

export default EditProfileStu;

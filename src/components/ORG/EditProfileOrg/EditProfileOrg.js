import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useStore } from "../../../contexts/StoreContext";
import { Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./EditProfileOrg.module.css";
import { store } from "../../../firebase";

const EditProfileOrg = ({ setEdit }) => {
  const [leftButton, setLeftButton] = useState("Cancel");
  const [leftButtonVar, setLeftButtonVar] = useState("light");
  const { currentUser } = useAuth();
  const { editItem } = useStore();
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

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
      email:
        emailRef.current.value.trim() !== ""
          ? emailRef.current.value
          : userData.email,
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

    console.log(newAccountInfo);

    try {
      setSuccessful(false);
      setMessage("");
      setError("");
      setLoading(true);

      editItem(newAccountInfo, currentUser.email, "organization_accounts");
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
                    placeholder={userData !== null ? userData.email : ""}
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

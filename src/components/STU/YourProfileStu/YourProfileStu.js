import EditProfileStu from "../EditProfileStu";
import { Card, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./YourProfileStu.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { store } from "../../../firebase";

const YourProfileStu = () => {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await store
      .collection("student_accounts")
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
  }, [edit]);

  if (edit === true) {
    return <EditProfileStu setEdit={setEdit} />;
  } else {
    return (
      <div className={styles.formBG}>
        <div className={styles.formContainer}>
          <Card bg="light" text="dark" style={{ width: "23rem" }}>
            <Card.Header as="h6">Your profile</Card.Header>
            <Card.Body>
              <Form onSubmit={(event) => setEdit(true)}>
                <Form.Group controlId="formName">
                  <Form.Label>Name as in NRIC</Form.Label>{" "}
                  <Form.Control
                    placeholder={userData !== null ? userData.name : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formDob">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.dob : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formContactNo">
                  <Form.Label>Mobile number</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.contactNo : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formCourse">
                  <Form.Label>Course of study</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.course : ""}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formYear">
                  <Form.Label>Year of study</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.year : ""}
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

export default YourProfileStu;

import EditProfileOrg from "../EditProfileOrg";
import { Card, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./YourProfileOrg.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { store } from "../../../firebase";

const YourProfileOrg = () => {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await store
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
                    placeholder={
                      userData !== null ? userData.organizationType : ""
                    }
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formOrgName">
                  <Form.Label>Organization name</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationName : ""
                    }
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formuen">
                  <Form.Label>Organization UEN</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationUEN : ""
                    }
                    // ref={???}
                    readOnly
                  />
                  <Form.Text className="text-muted">
                    Only applicable for Non-NUS Organizations
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formorgEmail">
                  <Form.Label>Email address of organization</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.organizationEmail : ""
                    }
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formpocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.nameOfContactPerson : ""
                    }
                    // ref={???}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formpocNum">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    placeholder={
                      userData !== null ? userData.mobileOfContactPerson : ""
                    }
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

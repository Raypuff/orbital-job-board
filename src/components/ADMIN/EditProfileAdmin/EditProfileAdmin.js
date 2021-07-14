//IMPORTS
//React Hooks
import React, { useEffect, useState } from "react";
//Bootstrap
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
//Components
import { Loading } from "../../EmptyStates/EmptyStates";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
//Inline form validation
import { Formik } from "formik";
import * as Yup from "yup";
//CSS Modules
import styles from "./EditProfileAdmin.module.css";

const EditProfileAdmin = ({
  setEdit,
  mobileActiveView,
  setMobileActiveView,
  width,
}) => {
  //USESTATES
  //Before submitting, left button says cancel; After submitting, it says cancel
  const [leftButton, setLeftButton] = useState("Cancel");
  const [leftButtonVar, setLeftButtonVar] = useState("light");
  //Storing user data and whether it's loading
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  //Success and error messages and if the edits are successful
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState(false);
  //For uploading images
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  //CUSTOM HOOKS
  const { currentUser } = useAuth();

  //USEEFFECTS
  //Retrieving user data
  useEffect(() => {
    const getUser = async () => {
      //   const response = await fetch(
      //     process.env.REACT_APP_BACKEND_URL +
      //       "/organization-accounts/" +
      //       currentUser.email,
      //     {}
      //   );
      //   const jsonData = await response.json();
      const jsonData = {
        avatar:
          "https://www.thesun.co.uk/wp-content/uploads/2020/08/NINTCHDBPICT000600110174.jpg",
        id: "ccsgpadmin@gmail.com",
        name: "Mr Admin",
        email: "ccsgpadmin@gmail.com",
        type: "Master",
      };

      setUserData(jsonData);
      setUserLoading(false);
    };
    getUser();
  }, []);

  //FUNCTIONS
  //Submitting edit profile details
  const mySubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    handleSubmit(values);

    async function handleSubmit(values) {
      //Resetting submit states
      setSuccessful(false);
      setMessage("");
      setError("");

      //Creating new object to send to backend
      const newAccountInfo = {
        avatar: imageUrl,

        name: values.name,
      };

      try {
        //Signify start of update process
        await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/organization-accounts/" +
            currentUser.email,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAccountInfo),
          }
        );

        //Set success usestate to true
        setSuccessful(true);
        setMessage("Admin profile updated successfully!");
        setLeftButton("Back");
        setLeftButtonVar("secondary");
        resetForm();
        setSubmitting(false);
      } catch (err) {
        setError("Failed to update user info");
        console.log(err);
      }
    }
  };
  //Uploading image to cloudinary
  const uploadImage = async (event) => {
    setImageLoading(true);
    try {
      const files = event.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "volunteer-ccsgp-images");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/volunteer-ccsgp-job-board/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImage(file.secure_url);
      setImageUrl(file.secure_url);
    } catch (err) {
      console.log(err);
    }
    setImageLoading(false);
  };

  //LOADING
  if (userLoading) {
    return <Loading>Loading edit profile...</Loading>;
  }

  return (
    <>
      <Card bg="light" text="dark">
        <Card.Header as="h5" className="d-flex align-items-center">
          {mobileActiveView && width < 576 && (
            <ArrowLeft
              style={{ marginRight: "1rem" }}
              onClick={() => setMobileActiveView(false)}
            />
          )}
          Edit admin profile
        </Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={{
              name: userData !== null ? userData.name : "",
            }}
            validationSchema={validationSchema}
            onSubmit={mySubmit}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAvatar">
                  <Form.Label>Avatar</Form.Label>
                  <div className={styles.imageContainer}>
                    {userData &&
                    userData.avatar &&
                    !image &&
                    !imageUrl &&
                    !imageLoading ? (
                      <img
                        src={userData.avatar}
                        className={styles.image}
                        alt="student avatar"
                      />
                    ) : imageLoading ? (
                      <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                      >
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    ) : image ? (
                      <img
                        src={image}
                        className={styles.image}
                        alt="student avatar"
                      />
                    ) : null}
                  </div>
                  <Form.Control
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.name}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && errors.name}
                    placeholder={values.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    disabled
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
                      disabled={isSubmitting || successful}
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <Card.Text />
                {error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : isSubmitting ? (
                  <Alert variant="primary">Updating your profile...</Alert>
                ) : successful ? (
                  <Alert variant="success">{message}</Alert>
                ) : (
                  <Alert variant="warning">
                    You can leave the fields you do not want to edit as blank
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditProfileAdmin;

//VALIDATION SCHEMA FOR INLINE FORM VALIDATION
const validationSchema = Yup.object().shape({
  name: Yup.string("Please enter your name")
    .required("Please enter your name")
    .nullable(),
});

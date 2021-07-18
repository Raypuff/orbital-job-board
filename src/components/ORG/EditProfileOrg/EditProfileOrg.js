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
import styles from "./EditProfileOrg.module.css";

const EditProfileOrg = ({
  setEdit,
  mobileActiveView,
  setMobileActiveView,
  width,
}) => {
  //CUSTOM HOOKS
  const { currentUser, updateProfilePic } = useAuth();

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

  //USEEFFECTS
  //Retrieving user data
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/organization-accounts/" +
          currentUser.email,
        {}
      );
      const jsonData = await response.json();
      setUserData(jsonData);
      setUserLoading(false);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        type: values.type,
        name: values.name,
        uen: values.uen,
        pocName: values.pocName,
        pocNo: values.pocNo,
        pocEmail: values.pocEmail,
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
        setMessage("Organization profile updated successfully!");
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

      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/avatar/${currentUser.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoURL: file.secure_url }),
        }
      );
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
          Edit organization profile
        </Card.Header>
        <Card.Body>
          <Formik
            enableReinitialize
            initialValues={{
              type: userData !== null ? userData.type : "",
              name: userData !== null ? userData.name : "",
              uen: userData !== null ? userData.uen : "",
              pocName: userData !== null ? userData.pocName : "",
              pocNo: userData !== null ? userData.pocNo : "",
              pocEmail: userData !== null ? userData.pocEmail : "",
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

                <Form.Group controlId="formOrgType">
                  <Form.Label>Organization type</Form.Label>
                  <Form.Control
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.type}
                    isValid={touched.type && !errors.type}
                    isInvalid={touched.type && errors.type}
                    as="select"
                    placeholder={values.type}
                  >
                    <option disabled selected value=""></option>
                    <option>NUS Organization</option>
                    <option>Non-NUS Organization</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.type}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formOrgName">
                  <Form.Label>Organization name</Form.Label>
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
                <div
                  className={
                    values.type === "Non-NUS Organization"
                      ? styles.display
                      : styles.displayNone
                  }
                >
                  <Form.Group controlId="formuen">
                    <Form.Label>
                      Organization UEN, Charity registration number or Society
                      registration number
                      <Form.Text className="text-muted">
                        Only applicable for Non-NUS Organizations
                      </Form.Text>
                    </Form.Label>

                    <Form.Control
                      name="uen"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.uen}
                      isValid={touched.uen && !errors.uen}
                      isInvalid={touched.uen && errors.uen}
                      disabled={values.type === "NUS Organization"}
                      placeholder={values.uen}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.uen}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email address of organization</Form.Label>
                  <Form.Control
                    placeholder={userData !== null ? userData.id : ""}
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="formPocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    name="pocName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.pocName}
                    isValid={touched.pocName && !errors.pocName}
                    isInvalid={touched.pocName && errors.pocName}
                    placeholder={values.pocName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pocName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPocNum">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    name="pocNo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.pocNo}
                    isValid={touched.pocNo && !errors.pocNo}
                    isInvalid={touched.pocNo && errors.pocNo}
                    placeholder={values.pocNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pocNo}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPocEmail">
                  <Form.Label>Email address of contact person</Form.Label>
                  <Form.Control
                    name="pocEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.pocEmail}
                    isValid={touched.pocEmail && !errors.pocEmail}
                    isInvalid={touched.pocEmail && errors.pocEmail}
                    placeholder={values.pocEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pocEmail}
                  </Form.Control.Feedback>
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

export default EditProfileOrg;

//VALIDATION SCHEMA FOR INLINE FORM VALIDATION
const validationSchema = Yup.object().shape({
  type: Yup.string("Please indicate your organization type")
    .required("Please indicate your organization type")
    .nullable(),
  name: Yup.string("Please enter your organization name")
    .required("Please enter your organization name")
    .nullable(),
  uen: Yup.string(
    "Please enter your organization's UEN, Charity Registration Number or Society Registration Number"
  )
    .when("type", {
      is: "Non-NUS Organization",
      then: Yup.string(
        "Please enter your organization's UEN, Charity Registration Number or Society Registration Number"
      )
        .required(
          "Please enter your organization's UEN, Charity Registration Number or Society Registration Number"
        )
        .nullable(),
    })
    .nullable(),
  pocName: Yup.string("Please enter the name of contact person")
    .required("Please enter the name of contact person")
    .nullable(),
  pocNo: Yup.string("Please enter the mobile number of contact person")
    .matches(/^[0-9]+$/, "Please enter a 8 digit number")
    .min(8, "Please enter a 8 digit number")
    .max(8, "Please enter a 8 digit number")
    .required("Please enter the mobile number of contact person")
    .nullable(),
  pocEmail: Yup.string("Please enter the email address of contact person")
    .email("Please enter a valid email address")
    .required("Please enter the email address of contact person")
    .nullable(),
});

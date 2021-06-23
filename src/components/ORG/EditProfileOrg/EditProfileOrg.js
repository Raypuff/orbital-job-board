import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./EditProfileOrg.module.css";

const EditProfileOrg = ({ setEdit }) => {
  const [leftButton, setLeftButton] = useState("Cancel");
  const [leftButtonVar, setLeftButtonVar] = useState("light");
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  const getUser = async () => {
    const response = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.comorganization-accounts/" +
        currentUser.email,
      {}
    );
    const jsonData = await response.json();
    setUserData(jsonData);
    setUserLoading(false);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mySubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    handleSubmit(values);

    async function handleSubmit(values) {
      //resetting submit states
      setSuccessful(false);
      setMessage("");
      setError("");

      //creating new object to send to backend
      const newAccountInfo = {
        type: values.type,
        name: values.name,
        uen: values.uen,
        pocName: values.pocName,
        pocNo: values.pocNo,
        pocEmail: values.pocEmail,
      };

      try {
        //signify start of update process

        await fetch(
          "https://volunteer-ccsgp-backend.herokuapp.comorganization-accounts/" +
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
        resetForm();
        setSubmitting(false);
      } catch (err) {
        setError("Failed to update user info");
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={styles.formBG}>
        <div className={styles.formContainer}>
          <Card bg="light" text="dark" style={{ width: "23rem" }}>
            <Card.Header as="h6">Edit your organization profile</Card.Header>
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
                        readOnly={values.type === "NUS Organization"}
                        placeholder={values.uen}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.uen}
                      </Form.Control.Feedback>
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
                        You can leave the fields you do not want to edit as
                        blank
                      </Alert>
                    )}
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProfileOrg;

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Please indicate your organization type"),
  name: Yup.string().required("Please enter your organization name"),
  uen: Yup.string().when("type", {
    is: "Non-NUS Organization",
    then: Yup.string().required(
      "Please enter your organization's UEN, Charity Registration Number or Society Registration Number"
    ),
  }),
  pocName: Yup.string().required("Please enter the name of contact person"),
  pocNo: Yup.string()
    .matches(/^[0-9]+$/, "Please enter a 8 digit number")
    .min(8, "Please enter a 8 digit number")
    .max(8, "Please enter a 8 digit number")
    .required("Please enter the mobile number of contact person"),
  pocEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter the email address of contact person"),
});

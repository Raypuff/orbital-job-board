//IMPORTS
//React Hooks
import { useEffect, useState } from "react";
//Bootstrap
import { Card, Form, Button, Tab, Nav, Row, Col, Alert } from "react-bootstrap";
import { ArrowLeft, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//Images
import noAvatar from "../../../assets/emptyStates/noAvatar.png";
//Components
import EditProfileOrg from "../EditProfileOrg";
import { Loading } from "../../EmptyStates/EmptyStates";
//Inline Form Validation
import * as Yup from "yup";
import { Formik } from "formik";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
//CSS Modules
import styles from "./YourProfileOrg.module.css";

const YourProfileOrg = () => {
  //USESTATES
  //Edit mode
  const [edit, setEdit] = useState(false);
  //If still loading user data
  const [loading, setLoading] = useState(true);
  //User data
  const [userData, setUserData] = useState(null);
  //Only for mobile - View left pane and right pane separately
  const [mobileActiveView, setMobileActiveView] = useState(false);
  //Success and error message for changing password
  const [successPassword, setSuccessPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  //Toggle view of passwords
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showCfmPw, setShowCfmPw] = useState(false);
  //Timer for resending verification email
  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(60);

  //CUSTOM HOOKS
  //Retrieve functions for user data
  const {
    currentUser,
    changePassword,
    reauthenticate,
    userVerified,
    sendEmailVerification,
  } = useAuth();
  //To retrieve the window width
  const { width } = useWindowDimensions();

  //USEEFFECTS
  //To retrieve user data
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
      setLoading(false);
    };
    getUser();
  }, [edit]);
  //For countdown for resend verification email
  useEffect(() => {
    if (startTimer && timer > 0) {
      console.log(timer);
      setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setTimer(60);
      setStartTimer(false);
    }
  }, [timer]);

  //FUNCTIONS
  //Turn on edit mode
  function onEdit() {
    setEdit(true);
  }
  //Submit password change form
  const changePasswordSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    handleSubmit(values);

    async function handleSubmit(values) {
      setSuccessPassword("");
      setErrorPassword("");

      try {
        await reauthenticate(values.passwordOld);

        await changePassword(values.passwordNew);
        setSuccessPassword("Password changed successfully!");
        resetForm();
      } catch (err) {
        if (err.message === "auth/wrong-password") {
          setErrorPassword("Your old password is incorrect");
        } else {
          setErrorPassword(
            "Failed to update your password due to internal error"
          );
        }
      }
      setSubmitting(false);
      console.log(errorPassword);
    }
  };
  //Resend verification email
  const resendVerification = () => {
    setStartTimer(true);
    sendEmailVerification();
    console.log("sent");
    setTimer(timer - 1);
  };

  //LOADING
  if (loading) {
    return <Loading>Loading your organization profile...</Loading>;
  }

  return (
    <div className={styles.container}>
      <Tab.Container defaultActiveKey={width < 576 ? "" : "first"}>
        <Row>
          <Col sm={3} className={mobileActiveView ? styles.displayNone : ""}>
            <Nav variant="pills" className={styles.pillsContainer}>
              <Nav.Item>
                <Nav.Link
                  eventKey="first"
                  className={styles.navLink}
                  active={width < 576 ? false : null}
                  onClick={() => {
                    if (width < 576) {
                      setMobileActiveView(true);
                    }
                  }}
                >
                  Profile details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className={styles.navLink}
                  active={width < 576 ? false : null}
                  onClick={() => {
                    if (width < 576) {
                      setMobileActiveView(true);
                    }
                  }}
                >
                  Change password
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          {(width > 577 || (mobileActiveView && width < 576)) && (
            <Col sm={9}>
              <Tab.Content>
                {/* Profile Details */}
                <Tab.Pane eventKey="first">
                  {edit ? (
                    <EditProfileOrg
                      setEdit={setEdit}
                      mobileActiveView={mobileActiveView}
                      setMobileActiveView={setMobileActiveView}
                      width={width}
                    />
                  ) : (
                    <>
                      <Card bg="light" text="dark">
                        <Card.Header as="h5" className={styles.cardHeader}>
                          {mobileActiveView && width < 576 && (
                            <ArrowLeft
                              style={{
                                marginRight: "1rem",
                              }}
                              onClick={() => setMobileActiveView(false)}
                            />
                          )}
                          Your organization profile
                        </Card.Header>
                        <Card.Body>
                          <Form onSubmit={onEdit}>
                            <Form.Group controlId="formAvatar">
                              <Form.Label>Avatar</Form.Label>
                              <div className={styles.imageContainer}>
                                <img
                                  src={
                                    userData && userData.avatar
                                      ? userData.avatar
                                      : noAvatar
                                  }
                                  className={styles.image}
                                  alt="organization avatar"
                                />
                              </div>
                            </Form.Group>
                            <Form.Group controlId="formType">
                              <Form.Label>Organization type:</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.type : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formName">
                              <Form.Label>Organization name</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.name : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <div
                              className={
                                userData &&
                                userData.type === "Non-NUS Organization"
                                  ? styles.display
                                  : styles.displayNone
                              }
                            >
                              <Form.Group controlId="formUen">
                                <Form.Label>
                                  Organization UEN, Charity registration number
                                  or Society registration number
                                  <Form.Text className="text-muted">
                                    Only applicable for Non-NUS Organizations
                                  </Form.Text>
                                </Form.Label>
                                <Form.Control
                                  placeholder={
                                    userData !== null ? userData.uen : ""
                                  }
                                  readOnly
                                  onClick={onEdit}
                                />
                              </Form.Group>
                            </div>
                            <Form.Group controlId="formEmail">
                              <Form.Label>
                                Email address of organization
                              </Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.id : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formPocName">
                              <Form.Label>Name of contact person</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.pocName : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formPocNo">
                              <Form.Label>
                                Mobile number of contact person
                              </Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.pocNo : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formPocEmail">
                              <Form.Label>
                                Email address of contact person
                              </Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.pocEmail : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                              Edit profile
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                      <Card className={styles.cardTop}>
                        <Card.Header as="h5" className={styles.cardHeader}>
                          {mobileActiveView && width < 576 && (
                            <ArrowLeft
                              style={{ marginRight: "1rem" }}
                              onClick={() => setMobileActiveView(false)}
                            />
                          )}
                          Additional Information
                        </Card.Header>
                        <Card.Body>
                          Verification status:{" "}
                          <span style={{ fontWeight: 600 }}>
                            {userVerified ? "Verified" : "Unverified"}
                          </span>
                          {!startTimer && !userVerified && (
                            <div
                              style={{
                                textDecoration: "underline",
                                color: "#193f76",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                resendVerification();
                                console.log("Email sent");
                              }}
                            >
                              Click here to resend a verification email
                            </div>
                          )}
                          {startTimer && (
                            <div className="text-muted">
                              Email sent. Please check your inbox for the
                              verification email.
                              <br />
                              You can resend another verification email after{" "}
                              {timer} seconds.
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </>
                  )}
                </Tab.Pane>
                {/* Change password */}
                <Tab.Pane eventKey="second">
                  <div className={styles.tabContainer}>
                    <Card
                      bg="light"
                      text="dark"
                      className={styles.cardContainer}
                    >
                      <Card.Header as="h5" className={styles.cardHeader}>
                        {mobileActiveView && width < 576 && (
                          <ArrowLeft
                            style={{
                              marginRight: "1rem",
                            }}
                            onClick={() => setMobileActiveView(false)}
                          />
                        )}
                        Change password
                      </Card.Header>
                      <Card.Body>
                        <Formik
                          initialValues={{
                            passwordOld: "",
                            passwordNew: "",
                            passwordConfirm: "",
                          }}
                          validationSchema={validationSchema}
                          onSubmit={changePasswordSubmit}
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
                              <Form.Group>
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                  name="passwordOld"
                                  type={showOldPw ? "text" : "password"}
                                  value={values.passwordOld}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isValid={
                                    touched.passwordOld && !errors.passwordOld
                                  }
                                  isInvalid={
                                    touched.passwordOld && errors.passwordOld
                                  }
                                />
                                <div
                                  className={
                                    touched.passwordOld
                                      ? styles.eyeError
                                      : styles.eye
                                  }
                                  onClick={() => setShowOldPw(!showOldPw)}
                                >
                                  {showOldPw ? <EyeSlashFill /> : <EyeFill />}
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.passwordOld}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                  name="passwordNew"
                                  type={showNewPw ? "text" : "password"}
                                  value={values.passwordNew}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isValid={
                                    touched.passwordNew && !errors.passwordNew
                                  }
                                  isInvalid={
                                    touched.passwordNew && errors.passwordNew
                                  }
                                />
                                <div
                                  className={
                                    touched.passwordNew
                                      ? styles.eyeError
                                      : styles.eye
                                  }
                                  onClick={() => setShowNewPw(!showNewPw)}
                                >
                                  {showNewPw ? <EyeSlashFill /> : <EyeFill />}
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.passwordNew}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                  name="passwordConfirm"
                                  type={showCfmPw ? "text" : "password"}
                                  value={values.passwordConfirm}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isValid={
                                    touched.passwordConfirm &&
                                    !errors.passwordConfirm
                                  }
                                  isInvalid={
                                    touched.passwordConfirm &&
                                    errors.passwordConfirm
                                  }
                                />
                                <div
                                  className={
                                    touched.passwordConfirm
                                      ? styles.eyeError
                                      : styles.eye
                                  }
                                  onClick={() => setShowCfmPw(!showCfmPw)}
                                >
                                  {showCfmPw ? <EyeSlashFill /> : <EyeFill />}
                                </div>

                                <Form.Control.Feedback type="invalid">
                                  {errors.passwordConfirm}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <div className={styles.tabContainer}>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  disabled={isSubmitting || successPassword}
                                >
                                  {isSubmitting
                                    ? "Submitting..."
                                    : successPassword
                                    ? "Password changed"
                                    : "Change password"}
                                </Button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                        {errorPassword && (
                          <>
                            <Card.Text />
                            <Alert variant="danger">{errorPassword}</Alert>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          )}
        </Row>
      </Tab.Container>
    </div>
  );
};

export default YourProfileOrg;

//TO GET WINDOW SIZE
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

//VALIDATION SCHEMA
const validationSchema = Yup.object().shape({
  passwordOld: Yup.string().required("Please enter your old password"),
  passwordNew: Yup.string()
    .required("Please enter your new password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special case character"
    ),
  passwordConfirm: Yup.string()
    .required("Please confirm your new password")
    .when("passwordNew", {
      is: (password) => password && password.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref("passwordNew")],
        "Your passwords do not match"
      ),
    }),
});

//IMPORTS
//React Hooks
import { useEffect, useState } from "react";
//Bootstrap
import { Card, Form, Button, Tab, Nav, Row, Col, Alert } from "react-bootstrap";
import { ArrowLeft, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//Components
import EditProfileStu from "../EditProfileStu";
import { Loading } from "../../EmptyStates/EmptyStates";
//Image
import noAvatar from "../../../assets/emptyStates/noAvatar.png";
//Constants
import { BeneficiaryTags, SkillTags } from "../../../Constants";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
import { useStu } from "../../../contexts/StuContext";
//Inline Form Validation
import { Formik } from "formik";
import * as Yup from "yup";
//CSS Modules
import styles from "./YourProfileStu.module.css";

const YourProfileStu = () => {
  //USESTATES
  //Whether to render editprofile or not
  const [edit, setEdit] = useState(false);
  //If still retrieving user details
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  //Mobile view for profile, true shows right side details, false shows left side tabs
  const [mobileActiveView, setMobileActiveView] = useState(false);
  //Success and error messages upon changing password
  const [successPassword, setSuccessPassword] = useState();
  const [errorPassword, setErrorPassword] = useState();
  //Toggle for showing passwords as text
  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showCfmPw, setShowCfmPw] = useState(false);
  //Timer for resending verification emails
  const [timer, setTimer] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  //Which subscriptions have been selected
  const [subscriptions, setSubscriptions] = useState({});
  //Success and error messages upon submitting subscriptions
  const [successSubscriptions, setSuccessSubscriptions] = useState();
  const [errorSubscriptions, setErrorSubscriptions] = useState();

  //CUSTOM HOOKS
  //Retrieving functions from auth context
  const {
    currentUser,
    changePassword,
    reauthenticate,
    userVerified,
    sendEmailVerification,
  } = useAuth();
  const { getStudent, getSubscriptions, updateSubscriptions } = useStu();
  const { width } = useWindowDimensions();

  async function getStudentData() {
    const userTest = await getStudent(currentUser.email);
    const subscriptionTest = await getSubscriptions(currentUser.email);
    setUserData(userTest);
    setSubscriptions(subscriptionTest);
    setLoading(false);
  }

  //USEEFFECTS
  //Retrieve User Details
  useEffect(() => {
    getStudentData();
  }, [edit]);

  //Set timer for resending verification email
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
  //Submit password change
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
  //Resend email verification
  const resendVerification = () => {
    setStartTimer(true);
    sendEmailVerification();
    console.log("sent");
    setTimer(timer - 1);
  };
  //Save subscriptions
  const saveSubscriptions = (values, { setSubmitting }) => {
    setSubmitting(true);
    handleSubmit(values);

    async function handleSubmit(values) {
      setSuccessSubscriptions("");
      setErrorSubscriptions("");
      const subscribed = [];
      const unsubscribed = [];
      for (const value in values) {
        if (values[value]) {
          subscribed.push(value);
        } else if (!values[value]) {
          unsubscribed.push(value);
        }
      }
      console.log(subscribed);
      console.log(unsubscribed);
      try {
        const updateRequest = await updateSubscriptions(
          currentUser.email,
          subscribed,
          unsubscribed
        );
        setSuccessSubscriptions("Subscriptions updated successfully!");
        setSubmitting(false);
      } catch (err) {
        setErrorSubscriptions(err);
        setSubmitting(false);
      }
    }
  };

  //LOADING
  if (loading) {
    return <Loading>Loading your profile...</Loading>;
  }

  return (
    <div className={styles.container}>
      <Tab.Container defaultActiveKey={width < 576 ? "" : "first"}>
        <Row>
          {/* Left columns to select view */}
          <Col sm={3} className={mobileActiveView ? styles.displayNone : ""}>
            <Nav variant="pills" className="flex-column">
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
              <Nav.Item>
                <Nav.Link
                  eventKey="third"
                  className={styles.navLink}
                  active={width < 576 ? false : null}
                  onClick={() => {
                    if (width < 576) {
                      setMobileActiveView(true);
                    }
                  }}
                >
                  Email subscriptions
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          {/* Right columns to show details */}
          {(width > 577 || (mobileActiveView && width < 576)) && (
            <Col sm={9}>
              <Tab.Content>
                {/* Profile details */}
                <Tab.Pane eventKey="first">
                  {edit ? (
                    // Edit mode
                    <EditProfileStu
                      setEdit={setEdit}
                      mobileActiveView={mobileActiveView}
                      setMobileActiveView={setMobileActiveView}
                      width={width}
                    />
                  ) : (
                    //Non-edit mode
                    <>
                      <Card bg="light" text="dark">
                        <Card.Header
                          as="h5"
                          className="d-flex align-items-center"
                        >
                          {mobileActiveView && width < 576 && (
                            <ArrowLeft
                              style={{
                                marginRight: "1rem",
                              }}
                              onClick={() => setMobileActiveView(false)}
                            />
                          )}
                          Your profile
                        </Card.Header>
                        <Card.Body>
                          <Form onSubmit={onEdit}>
                            <Form.Group controlId="formAvatar">
                              <Form.Label>Avatar</Form.Label>
                              <div className={styles.imageContainer}>
                                <img
                                  src={
                                    userData.avatar ? userData.avatar : noAvatar
                                  }
                                  className={styles.image}
                                  alt="student avatar"
                                />
                              </div>
                            </Form.Group>
                            <Form.Group controlId="formName">
                              <Form.Label>Name as in NRIC</Form.Label>{" "}
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.name : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formDob">
                              <Form.Label>Date of birth</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.dob : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.id : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formContactNo">
                              <Form.Label>Mobile number</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.contactNo : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formCourse">
                              <Form.Label>Course of study</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.course : ""
                                }
                                readOnly
                                onClick={onEdit}
                              />
                            </Form.Group>
                            <Form.Group controlId="formYear">
                              <Form.Label>Year of study</Form.Label>
                              <Form.Control
                                placeholder={
                                  userData !== null ? userData.year : ""
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
                      <Card className="mt-4">
                        <Card.Header
                          as="h5"
                          className="d-flex align-items-center"
                        >
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
                  <div className="d-flex justify-content-center align-items-center">
                    <Card bg="light" text="dark" style={{ width: "23rem" }}>
                      <Card.Header
                        as="h5"
                        className="d-flex align-items-center"
                      >
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
                                <div className={styles.eyeContainer}>
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
                                <div className={styles.eyeContainer}>
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
                                <div className={styles.eyeContainer}>
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
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors.passwordConfirm}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <div className="d-flex justify-content-center align-items-center">
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
                {/* Subscriptions tab */}
                <Tab.Pane eventKey="third">
                  <>
                    <Card bg="light" text="dark">
                      <Card.Header
                        as="h5"
                        className="d-flex align-items-center"
                      >
                        {mobileActiveView && width < 576 && (
                          <ArrowLeft
                            style={{
                              marginRight: "1rem",
                            }}
                            onClick={() => setMobileActiveView(false)}
                          />
                        )}
                        Email subscriptions
                      </Card.Header>
                      <Card.Body>
                        <p>
                          Want to get notified when new jobs are posted?
                          Customize your preferences such that you are only
                          notified by new job postings that contain the
                          beneficiaries and skills that you are interested in.
                          Don't forget to save your changes at the bottom!
                        </p>
                        <Formik
                          initialValues={subscriptions}
                          onSubmit={saveSubscriptions}
                        >
                          {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                              {setSubscriptions(values)}
                              <div className={styles.subHeader}>
                                Beneficiaries
                              </div>
                              <div className={styles.subBody}>
                                {BeneficiaryTags.map((beneficiary) => {
                                  return (
                                    <Form.Group
                                      key={beneficiary}
                                      controlId={`form${beneficiary}`}
                                      className={styles.subGroup}
                                    >
                                      <Form.Check
                                        key={beneficiary}
                                        label={beneficiary}
                                        name={beneficiary}
                                        checked={values[beneficiary]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Form.Group>
                                  );
                                })}
                              </div>
                              <div className={styles.subHeader}>Skills</div>
                              <div className={styles.subBody}>
                                {SkillTags.map((skill) => {
                                  return (
                                    <Form.Group
                                      key={skill}
                                      controlId={`form${skill}`}
                                      className={styles.subGroup}
                                    >
                                      <Form.Check
                                        key={skill}
                                        label={skill}
                                        name={skill}
                                        checked={values[skill]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </Form.Group>
                                  );
                                })}
                              </div>
                              <Card.Text />
                              <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Save changes
                              </Button>
                              <Card.Text />
                              {successSubscriptions && (
                                <Alert variant="success">
                                  {successSubscriptions}
                                </Alert>
                              )}
                              {errorSubscriptions && (
                                <Alert variant="danger">
                                  {errorSubscriptions}
                                </Alert>
                              )}
                            </Form>
                          )}
                        </Formik>
                      </Card.Body>
                    </Card>
                  </>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          )}
        </Row>
      </Tab.Container>
    </div>
  );
};

export default YourProfileStu;

//FOR RETRIEVING WINDOW SIZE
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

//VALIDATION SCHEMA FOR INLINE FORM VALIDATION
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

//IMPORTS
//React Hooks
import { useEffect, useState } from "react";
//Bootstrap
import {
  Card,
  Form,
  Button,
  Tab,
  Nav,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { ArrowLeft, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//Components
import ConfirmModal from "./ConfirmModal";
import { Loading } from "../../EmptyStates/EmptyStates";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
import { useAdmin } from "../../../contexts/AdminContext";
//Inline Form Validation
import * as Yup from "yup";
import { Formik } from "formik";
//CSS Modules
import styles from "./ManageAdmins.module.css";

const ManageAdmins = () => {
  //USESTATES
  //Current User Data
  const [userData, setUserData] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  //Storing all admins
  const [admins, setAdmins] = useState([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  //Only for mobile - View left pane and right pane separately
  const [mobileActiveView, setMobileActiveView] = useState(false);
  //Success and error message for creating new admin
  const [successNewAdmin, setSuccessNewAdmin] = useState();
  const [errorNewAdmin, setErrorNewAdmin] = useState();
  //Toggle view of passwords
  const [showPw, setShowPw] = useState(false);
  //Show modal for confirmation and admin details
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

  //CUSTOM HOOKS
  //To retrieve the window width
  const { currentUser } = useAuth();
  const { getAllAdmins, getCurrentAdmin, postNewAdmin } = useAdmin();
  const { width } = useWindowDimensions();

  const fetchAdminData = async () => {
    setUserData(await getCurrentAdmin(currentUser.email));
    setAdmins(await getAllAdmins());
  };

  useEffect(() => {
    fetchAdminData();
    setAdminsLoading(false);
    setUserLoading(false);
  }, [showModal]);

  //FUNCTIONS
  //Create new admin
  const createNewAdmin = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    handleSubmit(values);
    async function handleSubmit(values) {
      setSuccessNewAdmin("");
      setErrorNewAdmin("");
      const email = values.email;
      const password = values.password;
      const type = values.type;
      try {
        await postNewAdmin(email, password, type);
        setSuccessNewAdmin("Created new admin!");
        //resetForm();
      } catch (err) {
        console.log(err);
        if (err.message === "account-already-exists") {
          setErrorNewAdmin("The account already exists");
        } else {
          setErrorNewAdmin("Unable to create admin due to internal error.");
        }
      }
      setSubmitting(false);
    }
  };

  //LOADING
  if (userLoading || adminsLoading) {
    return <Loading>Loading manage admins...</Loading>;
  }

  return (
    <>
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
                    All admins
                  </Nav.Link>
                </Nav.Item>
                {userData.type === "Master" && (
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
                      Add new admin
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            {(width > 577 || (mobileActiveView && width < 576)) && (
              <Col sm={9}>
                <Tab.Content>
                  {/* All Admins */}
                  <Tab.Pane eventKey="first">
                    <>
                      <Alert variant="primary">
                        Master admins have all the rights that regular admins
                        have and also the permissions to modify existing admins'
                        rights and add new admins
                      </Alert>
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
                          Master Admins
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.adminCol}>
                            {admins
                              .filter((admin) => admin.type === "Master")
                              //Place your own name at the top
                              .sort((admin1, admin2) => {
                                let x;
                                let y;
                                userData.email === admin1.id
                                  ? (x = 0)
                                  : (x = 1);
                                userData.email === admin2.id
                                  ? (y = 0)
                                  : (y = 1);
                                return x - y;
                              })
                              .map((admin) => {
                                return (
                                  <div
                                    key={admin.id}
                                    className={styles.adminRow}
                                  >
                                    <div className={styles.adminName}>
                                      {admin.name && admin.name.length > 0
                                        ? admin.name
                                        : "No name indicated"}{" "}
                                      ({admin.email})
                                    </div>
                                    {userData.email !== admin.id &&
                                      admins.filter(
                                        (admin) => admin.type === "Master"
                                      ).length > 1 &&
                                      userData.type === "Master" && (
                                        <div className={styles.buttonRow}>
                                          <Button
                                            variant="warning"
                                            className={styles.button}
                                            onClick={() => {
                                              setSelectedAdmin({
                                                id: admin.id,
                                                name: admin.name,
                                                action: "demote",
                                              });
                                              setShowModal(true);
                                            }}
                                          >
                                            Demote
                                          </Button>
                                          {/* <Button
                                            variant="danger"
                                            className={styles.button}
                                            onClick={() => {
                                              setSelectedAdmin({
                                                id: admin.id,
                                                name: admin.name,
                                                action: "remove",
                                              });
                                              setShowModal(true);
                                            }}
                                          >
                                            Remove as admin
                                          </Button> */}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                          </div>
                        </Card.Body>
                      </Card>
                      <Card.Text />
                      <Alert variant="primary">
                        Regular admins have the rights to approve jobs, reject
                        jobs, take down jobs and export platform statistics{" "}
                      </Alert>
                      <Card className={styles.cardTop}>
                        <Card.Header as="h5" className={styles.cardHeader}>
                          {mobileActiveView && width < 576 && (
                            <ArrowLeft
                              style={{ marginRight: "1rem" }}
                              onClick={() => setMobileActiveView(false)}
                            />
                          )}
                          Regular Admins
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.adminCol}>
                            {admins
                              .filter((admin) => admin.type === "Regular")
                              //Place your own name at the top
                              .sort((admin1, admin2) => {
                                let x;
                                let y;
                                userData.email === admin1.id
                                  ? (x = 0)
                                  : (x = 1);
                                userData.email === admin2.id
                                  ? (y = 0)
                                  : (y = 1);
                                return x - y;
                              })
                              .map((admin) => {
                                return (
                                  <div
                                    key={admin.id}
                                    className={styles.adminRow}
                                  >
                                    <div className={styles.adminName}>
                                      {admin.name && admin.name.length > 0
                                        ? admin.name
                                        : "No name indicated"}{" "}
                                      ({admin.email})
                                    </div>
                                    {userData.email !== admin.id &&
                                      userData.type === "Master" && (
                                        <div className={styles.buttonRow}>
                                          <Button
                                            variant="warning"
                                            className={styles.button}
                                            onClick={() => {
                                              setSelectedAdmin({
                                                id: admin.id,
                                                name: admin.name,
                                                action: "promote",
                                              });
                                              setShowModal(true);
                                            }}
                                          >
                                            Promote
                                          </Button>
                                          {/* <Button
                                            variant="danger"
                                            className={styles.button}
                                            onClick={() => {
                                              setSelectedAdmin({
                                                id: admin.id,
                                                name: admin.name,
                                                action: "remove",
                                              });
                                              setShowModal(true);
                                            }}
                                          >
                                            Remove as admin
                                          </Button> */}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                          </div>
                        </Card.Body>
                      </Card>
                    </>
                  </Tab.Pane>
                  {/* Add new admin */}
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
                          Add new admin
                        </Card.Header>
                        <Card.Body>
                          <Formik
                            initialValues={{
                              email: "",
                              password: "",
                              type: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={createNewAdmin}
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
                              <Form onSubmit={handleSubmit} autocomplete="off">
                                <Form.Group>
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && errors.email}
                                    autocomplete="off"
                                  />

                                  <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                    name="password"
                                    type={showPw ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={
                                      touched.password && !errors.password
                                    }
                                    isInvalid={
                                      touched.password && errors.password
                                    }
                                  />
                                  <div
                                    className={
                                      touched.password
                                        ? styles.eyeError
                                        : styles.eye
                                    }
                                    onClick={() => setShowPw(!showPw)}
                                  >
                                    {showPw ? <EyeSlashFill /> : <EyeFill />}
                                  </div>

                                  <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                  <Form.Label>Type</Form.Label>
                                  <Form.Control
                                    name="type"
                                    as="select"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.type && !errors.type}
                                    isInvalid={touched.type && errors.type}
                                  >
                                    <option disabed selected value="" />
                                    <option>Regular</option>
                                    <option>Master</option>
                                  </Form.Control>
                                  <Form.Control.Feedback type="invalid">
                                    {errors.type}
                                  </Form.Control.Feedback>
                                </Form.Group>
                                <div className={styles.tabContainer}>
                                  <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting || successNewAdmin}
                                  >
                                    {isSubmitting
                                      ? "Submitting..."
                                      : "Create admin"}
                                  </Button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                          <Card.Text />
                          {successNewAdmin && (
                            <Alert variant="success">{successNewAdmin}</Alert>
                          )}
                          {errorNewAdmin && (
                            <Alert variant="danger">{errorNewAdmin}</Alert>
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
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        adminID={selectedAdmin.id}
        adminName={
          selectedAdmin.name && selectedAdmin.name.length > 0
            ? selectedAdmin.name
            : selectedAdmin.id
        }
        action={selectedAdmin.action}
      />
    </>
  );
};

export default ManageAdmins;

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
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter the new admin's email"),
  password: Yup.string()
    .required("Please enter the new admin's password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special case character"
    ),
  type: Yup.string()
    .oneOf(["Regular", "Master"], "Please select the new admin's type")
    .required("Please select the new admin's type"),
});

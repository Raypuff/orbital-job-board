import { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Accordion,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import styles from "./PostAJob.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { store } from "../../../firebase";
import { useStore } from "../../../contexts/StoreContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { BeneficiaryTags, SkillTags } from "./Data";

var uniqid = require("uniqid");

const PostAJob = () => {
  // Database useStates
  const { addItem, editItem } = useStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  // Form useStates
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [skills, setSkills] = useState([]);
  // const [virtual, setVirtual] = useState(false);
  // const [multiLocation, setMultiLocation] = useState(false);
  // const [adHoc, setAdHoc] = useState(false);
  // const [shiftNumber, setShiftNumber] = useState(0);
  // const [flexibleDate, setFlexibleDate] = useState(false);
  // const [flexibleHours, setFlexibleHours] = useState(false);

  //finding currentUser that is logged in
  const { currentUser } = useAuth();

  //references to data in the form
  // job details
  // const titleRef = useRef();
  // // const beneficiaryRef = useRef();
  // // const skillsRef = useRef();
  // const purposeRef = useRef();
  // // platform location
  // const platformRef = useRef();
  // const multiLocationRef = useRef();
  // const locationRef = useRef();
  // const postalCodeRef = useRef();
  // // date time type
  // const typeRef = useRef();
  // const longStartDateRef = useRef();
  // const longEndDateRef = useRef();
  // const longHoursRef = useRef();
  // // adshift data
  // const shiftNumberRef = useRef();
  // const shift1DateRef = useRef();
  // const shift1StartRef = useRef();
  // const shift1EndRef = useRef();
  // const shift2DateRef = useRef();
  // const shift2StartRef = useRef();
  // const shift2EndRef = useRef();
  // const shift3DateRef = useRef();
  // const shift3StartRef = useRef();
  // const shift3EndRef = useRef();
  // const shift4DateRef = useRef();
  // const shift4StartRef = useRef();
  // const shift4EndRef = useRef();
  // const shift5DateRef = useRef();
  // const shift5StartRef = useRef();
  // const shift5EndRef = useRef();
  // const shift6DateRef = useRef();
  // const shift6StartRef = useRef();
  // const shift6EndRef = useRef();
  // const shift7DateRef = useRef();
  // const shift7StartRef = useRef();
  // const shift7EndRef = useRef();
  // const shift8DateRef = useRef();
  // const shift8StartRef = useRef();
  // const shift8EndRef = useRef();
  // const shift9DateRef = useRef();
  // const shift9StartRef = useRef();
  // const shift9EndRef = useRef();
  // const shift10DateRef = useRef();
  // const shift10StartRef = useRef();
  // const shift10EndRef = useRef();

  // const addInfoRef = useRef();
  // const imageUrlRef = useRef();
  // // contact details
  // const pocNameRef = useRef();
  // const pocNoRef = useRef();
  // const pocEmailRef = useRef();

  const [error, setError] = useState("");

  //to obtain currentUser data from database
  const [userData, setUserData] = useState(null);

  //retrieve user from database
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const jobID = uniqid();

    // processing the adShift into a list
    // const adShift = adShiftProcessor(
    //   shiftNumber,
    //   shift1DateRef,
    //   shift1StartRef,
    //   shift1EndRef,
    //   shift2DateRef,
    //   shift2StartRef,
    //   shift2EndRef,
    //   shift3DateRef,
    //   shift3StartRef,
    //   shift3EndRef,
    //   shift4DateRef,
    //   shift4StartRef,
    //   shift4EndRef,
    //   shift5DateRef,
    //   shift5StartRef,
    //   shift5EndRef,
    //   shift6DateRef,
    //   shift6StartRef,
    //   shift6EndRef,
    //   shift7DateRef,
    //   shift7StartRef,
    //   shift7EndRef,
    //   shift8DateRef,
    //   shift8StartRef,
    //   shift8EndRef,
    //   shift9DateRef,
    //   shift9StartRef,
    //   shift9EndRef,
    //   shift10DateRef,
    //   shift10StartRef,
    //   shift10EndRef
    // );

    //creating the job to be posted from the refs
    const newJob = {
      // id: jobID,
      // orgID: currentUser.email,
      // status: "Pending",
      // title: titleRef.current.value,
      // beneficiaries: beneficiaries,
      // skills: skills,
      // purpose: purposeRef.current.value,
      // platform: platformRef.current.value,
      // multiLocation: multiLocation,
      // location: locationRef.current.value,
      // postalCode: postalCodeRef.current.value,
      // type: typeRef.current.value,
      // flexiDate: flexibleDate,
      // longStartDate: new Date(longStartDateRef.current.value),
      // longEndDate: new Date(longEndDateRef.current.value),
      // flexiHour: flexibleHours,
      // longHours: longHoursRef.current.value,
      // adShift: adShift,
      // addInfo: addInfoRef.current.value,
      // imageUrl: imageUrlRef.current.value,
      // pocName:
      //   pocNameRef.current.value !== ""
      //     ? pocNameRef.current.value
      //     : userData.pocName,
      // pocNo:
      //   pocNoRef.current.value !== "" ? pocNoRef.current.value : userData.pocNo,
      // pocEmail:
      //   pocEmailRef.current.value !== ""
      //     ? pocEmailRef.current.value
      //     : userData.pocEmail,
      // applicants: [],
    };

    // console.log(newJob);

    //pushing job id to organization account
    const updatedJobsPosted = userData !== null ? userData.jobsPosted : "";
    updatedJobsPosted.push(jobID);
    const updatedOrgAccount = {
      jobsPosted: updatedJobsPosted,
    };

    try {
      setSuccessful(false);
      setMessage("");
      setSubmitted(true);
      setError("");
      setLoading(true);

      if (!currentUser.emailVerified) {
        setError(
          "User is not verified. Please verify your account before posting a job."
        );
      } else {
        //successful posting
        addItem(newJob, "jobs", jobID);
        //updating job array of account with new job posting
        editItem(updatedOrgAccount, currentUser.email, "organization_accounts");
        setSuccessful(true);
        setMessage("Job Posted. Thank you for using our service!");
      }
    } catch (err) {
      setError("Failed to post a job");
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          title: "",
          purpose: "",
          platform: "Physical",
          multiLocation: false,
          location: "",
          postalCode: 0,
          type: "Long term",
          flexiDate: false,
          longStartDate: "",
          longEndDate: "",
          flexiHours: false,
          longHours: 0,
          shiftNumber: 0,
          shift1Date: "",
          shift1Start: "",
          shift1End: "",
          shift2Date: "",
          shift2Start: "",
          shift2End: "",
          shift3Date: "",
          shift3Start: "",
          shift3End: "",
          shift4Date: "",
          shift4Start: "",
          shift4End: "",
          shift5Date: "",
          shift5Start: "",
          shift5End: "",
          shift6Date: "",
          shift6Start: "",
          shift6End: "",
          shift7Date: "",
          shift7Start: "",
          shift7End: "",
          shift8Date: "",
          shift8Start: "",
          shift8End: "",
          shift9Date: "",
          shift9Start: "",
          shift9End: "",
          shift10Date: "",
          shift10Start: "",
          shift10End: "",
          addInfo: "",
          imageUrl: "",
          pocName: "",
          pocNo: 0,
          pocEmail: "",
          terms: false,
        }}
        validationSchema={validationSchema}
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
          <Form onSubmit={handleSubmit} className={styles.formBox}>
            {console.log(values)}
            <Accordion defaultActiveKey="0">
              <Card>
                {/* Accordion 1: Organization Details (These details are not collected in this form) */}
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h5>Organization Details</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className={styles.accordionBox}>
                    <Form.Group controlId="formOrgType">
                      <Form.Label>Organization Type</Form.Label>
                      <Form.Control
                        required
                        placeholder={userData !== null ? userData.type : ""}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formOrgName">
                      <Form.Label>Name of Organization</Form.Label>
                      <Form.Control
                        required
                        placeholder={userData !== null ? userData.name : ""}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formOrgUen">
                      <Form.Label>
                        UEN, Charity registration number or Society registration
                        number
                      </Form.Label>
                      <Form.Control
                        required
                        placeholder={userData !== null ? userData.uen : ""}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formOrgEmail">
                      <Form.Label>Email address of Organization</Form.Label>
                      <Form.Control
                        required
                        placeholder={userData !== null ? userData.email : ""}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
                {/* Accordion 2: Job Details */}
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <h5>Job Details</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div className={styles.accordionBox}>
                    {/* About the job */}
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title of volunteer work</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Python instructor"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.title && !errors.title}
                        isInvalid={touched.title && errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBeneficiary">
                      <Form.Label>Target profile of beneficiary</Form.Label>
                      <DropdownMultiselect
                        placeholder="Select at least one beneficiary"
                        options={BeneficiaryTags}
                        name="beneficiaries"
                        handleOnChange={(selected) => {
                          setBeneficiaries(selected);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formSkills">
                      <Form.Label>Skills required</Form.Label>
                      <DropdownMultiselect
                        placeholder="Select at least one skill"
                        options={SkillTags}
                        name="skills"
                        handleOnChange={(selected) => {
                          setSkills(selected);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formPurpose">
                      <Form.Label>Purpose of volunteer work</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={2}
                        name="purpose"
                        placeholder={`Teach children basic programming skills
(Elaborate on how students can benefit from volunteering)`}
                        value={values.purpose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.purpose && !errors.purpose}
                        isInvalid={touched.purpose && errors.purpose}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.purpose}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* Platform and Location */}
                    <Form.Group controlId="formPlatform">
                      <Form.Label>Platform of volunteer work</Form.Label>
                      <Form.Control
                        name="platform"
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.platform && !errors.platform}
                        isInvalid={touched.platform && errors.platform}
                      >
                        <option>Physical</option>
                        <option>Virtual</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.platform}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div
                      className={
                        values.platform === "Virtual"
                          ? styles.typeDisplayNone
                          : styles.typeDisplay
                      }
                    >
                      <Row>
                        <Col md={8}>
                          <Form.Group controlId="formLocation">
                            <Form.Label>Location of volunteer work</Form.Label>

                            <Form.Control
                              type="text"
                              readOnly={
                                values.multiLocation ||
                                values.platform === "Virtual"
                              }
                              name="location"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder={
                                values.multiLocation ||
                                values.platform === "Virtual"
                                  ? null
                                  : "Bukit Timah Plaza"
                              }
                              isValid={touched.location && !errors.location}
                              isInvalid={touched.location && errors.location}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.location}
                            </Form.Control.Feedback>
                            <Form.Text>
                              <Form.Group controlId="formMultiLocation">
                                <Form.Check
                                  name="multiLocation"
                                  label="Multiple locations"
                                  disabled={values.platform === "Virtual"}
                                  checked={
                                    values.platform === "Virtual"
                                      ? false
                                      : values.multiLocation
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  // isValid={
                                  //   touched.multiLocation &&
                                  //   !errors.multiLocation
                                  // }
                                  // isInvalid={
                                  //   touched.multiLocation &&
                                  //   errors.multiLocation
                                  // }
                                  feedback={errors.multiLocation}
                                />
                              </Form.Group>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="formPostalCode">
                            <Form.Label>Postal code of location</Form.Label>
                            <Form.Control
                              type="text"
                              name="postalCode"
                              value={values.postalCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={
                                values.multiLocation ||
                                values.platform === "Virtual"
                              }
                              placeholder={
                                values.multiLocation ||
                                values.platform === "Virtual"
                                  ? null
                                  : 588996
                              }
                              isValid={touched.postalCode && !errors.postalCode}
                              isInvalid={
                                touched.postalCode && errors.postalCode
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.postalCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                    {/* Date and Time */}
                    <Form.Group controlId="formType">
                      <Form.Label>
                        Type of volunteer commitment level
                      </Form.Label>
                      <Form.Control
                        name="type"
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.type}
                        isValid={touched.type && !errors.type}
                        isInvalid={touched.type && errors.type}
                      >
                        <option>Long term</option>
                        <option>Ad hoc</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.type}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* Long term */}
                    <div
                      className={
                        values.type !== "Long term"
                          ? styles.typeDisplayNone
                          : styles.typeDisplay
                      }
                    >
                      <Row>
                        <Col>
                          <Form.Group controlId="formLongStartDate">
                            <Form.Label>
                              Long term - Start date of volunteer work
                            </Form.Label>
                            <Form.Control
                              name="longStartDate"
                              readOnly={
                                values.type !== "Long term" || values.flexiDate
                              }
                              type="date"
                              value={values.longStartDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.longStartDate && !errors.longStartDate
                              }
                              isInvalid={
                                touched.longStartDate && errors.longStartDate
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.longStartDate}
                            </Form.Control.Feedback>
                            <Form.Text>
                              <Form>
                                <Form.Group>
                                  <Form.Check
                                    name="flexiDate"
                                    label="Start and end dates are flexible"
                                    checked={
                                      values.type !== "Long term"
                                        ? false
                                        : values.flexiDate
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // isValid={
                                    //   touched.flexiDate && !errors.flexiDate
                                    // }
                                    // isInvalid={
                                    //   touched.flexiDate && errors.flexiDate
                                    // }
                                    feedback={errors.flexiDate}
                                  />
                                </Form.Group>
                              </Form>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formLongEndDate">
                            <Form.Label>
                              Long term - End date of volunteer work
                            </Form.Label>
                            <Form.Control
                              name="longEndDate"
                              type="date"
                              readOnly={
                                values.type !== "Long term" || values.flexiDate
                              }
                              value={values.longEndDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.longEndDate && !errors.longEndDate
                              }
                              isInvalid={
                                touched.longEndDate && errors.longEndDate
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.longEndDate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="formLongHours">
                        <Form.Label>
                          Long term - Number of hours to commit
                        </Form.Label>
                        <Form.Control
                          name="longHours"
                          readOnly={
                            values.type !== "Long term" || values.flexiHours
                          }
                          placeholder={
                            values.type !== "Long term" || values.flexiHours
                              ? null
                              : 40
                          }
                          value={values.longHours}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.longHours && !errors.longHours}
                          isInvalid={touched.longHours && errors.longHours}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.longHours}
                        </Form.Control.Feedback>
                        <Form.Text>
                          <Form>
                            <Form.Group>
                              <Form.Check
                                name="flexiHours"
                                label="Number of hours to commit is flexible"
                                checked={
                                  values.type !== "Long term"
                                    ? false
                                    : values.flexiHours
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // isValid={
                                //   touched.flexiHours && !errors.flexiHours
                                // }
                                // isInvalid={
                                //   touched.flexiHours && errors.flexiHours
                                // }
                                feedback={errors.flexiHours}
                              />
                            </Form.Group>
                          </Form>
                        </Form.Text>
                      </Form.Group>
                    </div>
                    {/* Ad hoc */}
                    <div
                      className={
                        values.type === "Ad hoc"
                          ? styles.typeDisplay
                          : styles.typeDisplayNone
                      }
                    >
                      <Form.Group controlId="formShiftNumber">
                        <Form.Label>Ad hoc - Number of shifts</Form.Label>
                        <Form.Control
                          name="shiftNumber"
                          disabled={values.type !== "Ad hoc"}
                          placeholder={
                            values.type !== "Ad hoc" ? null : values.shiftNumber
                          }
                          type="number"
                          min="0"
                          max="10"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.shiftNumber && !errors.shiftNumber}
                          isInvalid={touched.shiftNumber && errors.shiftNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.shiftNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    {/* Shifts display (I'm not proud of this) */}
                    {/* <Shifts
                      // adHoc={adHoc}
                      // shiftNumber={shiftNumber}
                      // shift1DateRef={shift1DateRef}
                      // shift1StartRef={shift1StartRef}
                      // shift1EndRef={shift1EndRef}
                      // shift2DateRef={shift2DateRef}
                      // shift2StartRef={shift2StartRef}
                      // shift2EndRef={shift2EndRef}
                      // shift3DateRef={shift3DateRef}
                      // shift3StartRef={shift3StartRef}
                      // shift3EndRef={shift3EndRef}
                      // shift4DateRef={shift4DateRef}
                      // shift4StartRef={shift4StartRef}
                      // shift4EndRef={shift4EndRef}
                      // shift5DateRef={shift5DateRef}
                      // shift5StartRef={shift5StartRef}
                      // shift5EndRef={shift5EndRef}
                      // shift6DateRef={shift6DateRef}
                      // shift6StartRef={shift6StartRef}
                      // shift6EndRef={shift6EndRef}
                      // shift7DateRef={shift7DateRef}
                      // shift7StartRef={shift7StartRef}
                      // shift7EndRef={shift7EndRef}
                      // shift8DateRef={shift8DateRef}
                      // shift8StartRef={shift8StartRef}
                      // shift8EndRef={shift8EndRef}
                      // shift9DateRef={shift9DateRef}
                      // shift9StartRef={shift9StartRef}
                      // shift9EndRef={shift9EndRef}
                      // shift10DateRef={shift10DateRef}
                      // shift10StartRef={shift10StartRef}
                      // shift10EndRef={shift10EndRef}
                    /> */}

                    {/* Remaining details */}
                    <Form.Group controlId="formAddInfo">
                      <Form.Label>Additional information</Form.Label>
                      <Form.Control
                        name="addInfo"
                        type="text"
                        as="textarea"
                        rows={2}
                        value={values.addInfo}
                        placeholder="Minimum commitment is 2 months"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.addInfo && !errors.addInfo}
                        isInvalid={touched.addInfo && errors.addInfo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.addInfo}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formImageUrl">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        name="imageUrl"
                        type="text"
                        placeholder="Direct Imgur link to image"
                        value={values.imageUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.imageUrl && !errors.imageUrl}
                        isInvalid={touched.imageUrl && errors.imageUrl}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.imageUrl}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <h5>Contact Details</h5>
                  <Form.Text className="muted-text">
                    (Leave Blank if Unchanged)
                  </Form.Text>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div className={styles.accordionBox}>
                    <Form.Group controlId="formPocName">
                      <Form.Label>Name of contact person</Form.Label>
                      <Form.Control
                        name="pocName"
                        type="text"
                        placeholder={userData !== null ? userData.pocName : ""}
                        value={values.pocName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocName && !errors.pocName}
                        isInvalid={touched.pocName && errors.pocName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPocNo">
                      <Form.Label>Mobile number of contact person</Form.Label>
                      <Form.Control
                        name="pocNo"
                        type="text"
                        placeholder={userData !== null ? userData.pocNo : ""}
                        value={values.pocNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocNo && !errors.pocNo}
                        isInvalid={touched.poNo && errors.pocNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPocEmail">
                      <Form.Label>Email address of contact person</Form.Label>
                      <Form.Control
                        name="pocEmail"
                        type="email"
                        placeholder={userData !== null ? userData.pocEmail : ""}
                        value={values.pocEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocEmail && !errors.pocEmail}
                        isInvalid={touched.pocEmail && errors.pocEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocEmail}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  <h5>Terms and Conditions of Use</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <div className={styles.accordionBox}>
                    <TermsAndConditions />
                    <Form.Group controlId="formTerms">
                      <Form.Check
                        name="terms"
                        label="I agree with the Terms and Conditions of Use"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.terms && !errors.terms}
                        isInvalid={touched.terms && errors.terms}
                        feedback={errors.terms}
                      />
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            <Card.Text />
            <Button disabled={submitted} variant="primary" type="submit">
              Post job
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Alert variant="primary">Posting your job...</Alert>}
            {successful && <Alert variant="success">{message}</Alert>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostAJob;

const Shifts = ({
  adHoc,
  shiftNumber,
  shift1DateRef,
  shift1StartRef,
  shift1EndRef,
  shift2DateRef,
  shift2StartRef,
  shift2EndRef,
  shift3DateRef,
  shift3StartRef,
  shift3EndRef,
  shift4DateRef,
  shift4StartRef,
  shift4EndRef,
  shift5DateRef,
  shift5StartRef,
  shift5EndRef,
  shift6DateRef,
  shift6StartRef,
  shift6EndRef,
  shift7DateRef,
  shift7StartRef,
  shift7EndRef,
  shift8DateRef,
  shift8StartRef,
  shift8EndRef,
  shift9DateRef,
  shift9StartRef,
  shift9EndRef,
  shift10DateRef,
  shift10StartRef,
  shift10EndRef,
}) => {
  return (
    <div className={adHoc ? styles.typeDisplay : styles.typeDisplayNone}>
      <div
        className={
          shiftNumber >= 1 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift1Date">
              <Form.Label>Shift 1 date</Form.Label>
              <Form.Control type="date" ref={shift1DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift1Start">
              <Form.Label>Shift 1 start time</Form.Label>
              <Form.Control type="time" ref={shift1StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift1End">
              <Form.Label>Shift 1 end Time</Form.Label>
              <Form.Control type="time" ref={shift1EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 2 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift2Date">
              <Form.Label>Shift 2 date</Form.Label>
              <Form.Control type="date" ref={shift2DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift2Start">
              <Form.Label>Shift 2 start time</Form.Label>
              <Form.Control type="time" ref={shift2StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift2End">
              <Form.Label>Shift 2 end Time</Form.Label>
              <Form.Control type="time" ref={shift2EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 3 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift3Date">
              <Form.Label>Shift 3 date</Form.Label>
              <Form.Control type="date" ref={shift3DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift3Start">
              <Form.Label>Shift 3 start time</Form.Label>
              <Form.Control type="time" ref={shift3StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift3End">
              <Form.Label>Shift 3 end Time</Form.Label>
              <Form.Control type="time" ref={shift3EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 4 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift4Date">
              <Form.Label>Shift 4 date</Form.Label>
              <Form.Control type="date" ref={shift4DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift4Start">
              <Form.Label>Shift 4 start time</Form.Label>
              <Form.Control type="time" ref={shift4StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift4End">
              <Form.Label>Shift 4 end Time</Form.Label>
              <Form.Control type="time" ref={shift4EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 5 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift5Date">
              <Form.Label>Shift 5 date</Form.Label>
              <Form.Control type="date" ref={shift5DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift5Start">
              <Form.Label>Shift 5 start time</Form.Label>
              <Form.Control type="time" ref={shift5StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift5End">
              <Form.Label>Shift 5 end Time</Form.Label>
              <Form.Control type="time" ref={shift5EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 6 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift6Date">
              <Form.Label>Shift 6 date</Form.Label>
              <Form.Control type="date" ref={shift6DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift6Start">
              <Form.Label>Shift 6 start time</Form.Label>
              <Form.Control type="time" ref={shift6StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift6End">
              <Form.Label>Shift 6 end Time</Form.Label>
              <Form.Control type="time" ref={shift6EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 7 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift7Date">
              <Form.Label>Shift 7 date</Form.Label>
              <Form.Control type="date" ref={shift7DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift7Start">
              <Form.Label>Shift 7 start time</Form.Label>
              <Form.Control type="time" ref={shift7StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift7End">
              <Form.Label>Shift 7 end Time</Form.Label>
              <Form.Control type="time" ref={shift7EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 8 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift8Date">
              <Form.Label>Shift 8 date</Form.Label>
              <Form.Control type="date" ref={shift8DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift8Start">
              <Form.Label>Shift 8 start time</Form.Label>
              <Form.Control type="time" ref={shift8StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift8End">
              <Form.Label>Shift 8 end Time</Form.Label>
              <Form.Control type="time" ref={shift8EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 9 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift9Date">
              <Form.Label>Shift 9 date</Form.Label>
              <Form.Control type="date" ref={shift9DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift9Start">
              <Form.Label>Shift 9 start time</Form.Label>
              <Form.Control type="time" ref={shift9StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift9End">
              <Form.Label>Shift 9 end Time</Form.Label>
              <Form.Control type="time" ref={shift9EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div
        className={
          shiftNumber >= 10 ? styles.typeDisplay : styles.typeDisplayNone
        }
      >
        <Row>
          <Col>
            <Form.Group controlId="formShift10Date">
              <Form.Label>Shift 10 date</Form.Label>
              <Form.Control type="date" ref={shift10DateRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift10Start">
              <Form.Label>Shift 10 start time</Form.Label>
              <Form.Control type="time" ref={shift10StartRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formShift10End">
              <Form.Label>Shift 10 end Time</Form.Label>
              <Form.Control type="time" ref={shift10EndRef} />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

function adShiftProcessor(
  shiftNumber,
  shift1Date,
  shift1Start,
  shift1End,
  shift2Date,
  shift2Start,
  shift2End,
  shift3Date,
  shift3Start,
  shift3End,
  shift4Date,
  shift4Start,
  shift4End,
  shift5Date,
  shift5Start,
  shift5End,
  shift6Date,
  shift6Start,
  shift6End,
  shift7Date,
  shift7Start,
  shift7End,
  shift8Date,
  shift8Start,
  shift8End,
  shift9Date,
  shift9Start,
  shift9End,
  shift10Date,
  shift10Start,
  shift10End
) {
  const temp = [
    [shift1Date, shift1Start, shift1End],
    [shift2Date, shift2Start, shift2End],
    [shift3Date, shift3Start, shift3End],
    [shift4Date, shift4Start, shift4End],
    [shift5Date, shift5Start, shift5End],
    [shift6Date, shift6Start, shift6End],
    [shift7Date, shift7Start, shift7End],
    [shift8Date, shift8Start, shift8End],
    [shift9Date, shift9Start, shift9End],
    [shift10Date, shift10Start, shift10End],
  ];

  const returnList = [];
  for (var i = 0; i < shiftNumber; i++) {
    var holder = { date: "", startTime: "", endTime: "" };
    holder.date = new Date(temp[i][0].current.value);
    holder.startTime = temp[i][1].current.value;
    holder.endTime = temp[i][2].current.value;
    returnList.push(holder);
  }
  return returnList;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  purpose: Yup.string().required(),
  platform: Yup.string().required(),
  multiLocation: Yup.bool(),
  location: Yup.string(),
  postalCode: Yup.number(),
  type: Yup.string().required(),
  flexiDate: Yup.bool(),
  longStartDate: Yup.date(),
  longEndDate: Yup.date(),
  flexiHours: Yup.bool(),
  longHours: Yup.number(),
  shiftNumber: Yup.number(),
  shift1Date: Yup.date(),
  shift1Start: Yup.string(),
  shift1End: Yup.string(),
  shift2Date: Yup.date(),
  shift2Start: Yup.string(),
  shift2End: Yup.string(),
  shift3Date: Yup.date(),
  shift3Start: Yup.string(),
  shift3End: Yup.string(),
  shift4Date: Yup.date(),
  shift4Start: Yup.string(),
  shift4End: Yup.string(),
  shift5Date: Yup.date(),
  shift5Start: Yup.string(),
  shift5End: Yup.string(),
  shift6Date: Yup.date(),
  shift6Start: Yup.string(),
  shift6End: Yup.string(),
  shift7Date: Yup.date(),
  shift7Start: Yup.string(),
  shift7End: Yup.string(),
  shift8Date: Yup.date(),
  shift8Start: Yup.string(),
  shift8End: Yup.string(),
  shift9Date: Yup.date(),
  shift9Start: Yup.string(),
  shift9End: Yup.string(),
  shift10Date: Yup.date(),
  shift10Start: Yup.string(),
  shift10End: Yup.string(),
  addInfo: Yup.string(),
  imageUrl: Yup.string().url(),
  pocName: Yup.string().required(),
  pocNo: Yup.number().required(),
  pocEmail: Yup.string().email().required(),
  terms: Yup.bool()
    .required()
    .oneOf(
      [true],
      "Terms and Conditions of Use must be accepted to post a Job"
    ),
});

const TermsAndConditions = () => {
  return (
    <ol className={styles.terms}>
      <li>Agreement To Terms</li>
      <p>
        All access of any area of "orbital-job-board.vercel.app" ("The Website")
        is governed by the terms and conditions below ("Terms"). If you do not
        accept any of these Terms, exit immediately. Continue only if you accept
        these Terms. In these Terms, the words "we", "our" and "us" refers to
        the Government of Singapore.
      </p>
      <li>Access To The Website</li>
      <p>
        The accessibility and operation of The Website relies on technologies
        outside our control. We do not guarantee continuous accessibility or
        uninterrupted operation of The Website.
      </p>
      <li>Relying On Information</li>
      <p>
        We provide The Website as a general information source only and we are
        not involved in giving professional advice here. The Website may not
        cover all information available on a particular issue. Before relying on
        the Website, you should do your own checks or obtain professional advice
        relevant to your particular circumstances.
      </p>
      <li>Security</li>
      <p>
        Where appropriate, we use available technology to protect the security
        of communications made through The Website. However, we do not accept
        liability for the security, authenticity, integrity or confidentiality
        of any transactions and other communications made through The Website.
      </p>
      <p>
        Internet communications may be susceptible to interference or
        interception by third parties. Despite our best efforts, we make no
        warranties that The Website is free of infection by computer viruses or
        other unauthorised software.
      </p>
      <p>
        You should take appropriate steps to keep your information, software and
        equipment secure. This includes clearing your Internet browser cookies
        and cache before and after using any services on The Website. You should
        keep your passwords confidential.
      </p>
      <li>Hyperlinks</li>
      <p>
        We are not responsible or liable for the availability or content of any
        other Internet site (not provided by us) linked to or from The Website.
        Access to any other Internet site is at your own risk. If you create a
        link or frame to The Website, you do so at your own risk.
      </p>
      <p>
        We reserve the right to object or disable any link or frame to or from
        The Website.
      </p>
      <p>We reserve the right to change the URL of The Website.</p>
      <li>Intellectual Property</li>
      <p>
        Materials, including source code, pages, documents and online graphics,
        audio and video in The Website are protected by law. The intellectual
        property rights in the materials is owned by or licensed to us. All
        rights reserved. (Government of Singapore © 2018).
      </p>
      <p>
        Apart from any fair dealings for the purposes of private study,
        research, criticism or review, as permitted in law, no part of The
        Website may be reproduced or reused for any commercial purposes
        whatsoever without our prior written permission.
      </p>
      <li>General Disclaimer And Limitation Of Liability</li>
      <p>
        We will not be liable for any loss or damage{" "}
        <ol>
          <li>
            That you may incur on account of using, visiting or relying on any
            statements, opinion, representation or information in The Website;
          </li>
          <li>
            Resulting from any delay in operation or transmission,
            communications failure, Internet access difficulties or malfunctions
            in equipment or software; or
          </li>
          <li>
            Resulting from the conduct or the views of any person who accesses
            or uses The Website.
          </li>
        </ol>
      </p>
      <li>Fees</li>
      <p>
        There are currently no fees for using any part of The Website. We
        reserve the right to introduce new fees from time to time. We are not
        responsible for any fees charged by any other Internet site (not
        provided by us).
      </p>
      <li>Applicable Laws</li>
      <p>
        Use of The Website and these Terms are governed by the laws of
        Singapore. Any claim relating to use of The Website shall be heard by
        Singapore Courts.
      </p>

      <li>Variation</li>
      <p>
        We may revise these Terms at any time by updating this page. You should
        visit this page from time to time and review the then current Terms
        because they are binding on you. We may modify or discontinue any
        information or features that form part of The Website at any time, with
        or without notice to you, and without liability.{" "}
      </p>
    </ol>
  );
};

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
var uniqid = require("uniqid");

const PostAJob = () => {
  const { addItem, editItem } = useStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [skills, setSkills] = useState([]);
  // checkboxes for flexible fields
  const [virtual, setVirtual] = useState(false);
  const [multiLocation, setMultiLocation] = useState(false);
  const [adHoc, setAdHoc] = useState(false);
  const [shiftNumber, setShiftNumber] = useState(0);
  const [flexibleDate, setFlexibleDate] = useState(false);
  const [flexibleHours, setFlexibleHours] = useState(false);

  //finding currentUser that is logged in
  const { currentUser } = useAuth();

  //references to data in the form
  // job details
  const titleRef = useRef();
  // const beneficiaryRef = useRef();
  // const skillsRef = useRef();
  const purposeRef = useRef();
  // platform location
  const platformRef = useRef();
  const multiLocationRef = useRef();
  const locationRef = useRef();
  const postalCodeRef = useRef();
  // date time type
  const typeRef = useRef();
  const longStartDateRef = useRef();
  const longEndDateRef = useRef();
  const longHoursRef = useRef();
  // adshift data
  const shiftNumberRef = useRef();
  const shift1DateRef = useRef();
  const shift1StartRef = useRef();
  const shift1EndRef = useRef();
  const shift2DateRef = useRef();
  const shift2StartRef = useRef();
  const shift2EndRef = useRef();
  const shift3DateRef = useRef();
  const shift3StartRef = useRef();
  const shift3EndRef = useRef();
  const shift4DateRef = useRef();
  const shift4StartRef = useRef();
  const shift4EndRef = useRef();
  const shift5DateRef = useRef();
  const shift5StartRef = useRef();
  const shift5EndRef = useRef();
  const shift6DateRef = useRef();
  const shift6StartRef = useRef();
  const shift6EndRef = useRef();
  const shift7DateRef = useRef();
  const shift7StartRef = useRef();
  const shift7EndRef = useRef();
  const shift8DateRef = useRef();
  const shift8StartRef = useRef();
  const shift8EndRef = useRef();
  const shift9DateRef = useRef();
  const shift9StartRef = useRef();
  const shift9EndRef = useRef();
  const shift10DateRef = useRef();
  const shift10StartRef = useRef();
  const shift10EndRef = useRef();

  const addInfoRef = useRef();
  const imageUrlRef = useRef();
  // contact details
  const pocNameRef = useRef();
  const pocNoRef = useRef();
  const pocEmailRef = useRef();

  const [error, setError] = useState("");

  //to obtain currentUser data from database
  const [userData, setUserData] = useState(null);

  const beneficiaryTags = [
    "Children",
    "Teens",
    "Youth",
    "Adults",
    "Elderly",
    "Others",
  ];
  const skillTags = ["Python", "React", "Javascript", "React Native", "Others"];

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
    const adShift = adShiftProcessor(
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
      shift10EndRef
    );

    //creating the job to be posted from the refs
    const newJob = {
      id: jobID,
      orgID: currentUser.email,
      status: "Pending",
      title: titleRef.current.value,
      beneficiaries: beneficiaries,
      skills: skills,
      purpose: purposeRef.current.value,

      platform: platformRef.current.value,
      multiLocation: multiLocation,
      location: locationRef.current.value,
      postalCode: postalCodeRef.current.value,

      type: typeRef.current.value,
      flexiDate: flexibleDate,
      longStartDate: new Date(longStartDateRef.current.value),
      longEndDate: new Date(longEndDateRef.current.value),
      flexiHour: flexibleHours,
      longHours: longHoursRef.current.value,
      adShift: adShift,

      addInfo: addInfoRef.current.value,
      imageUrl: imageUrlRef.current.value,
      pocName:
        pocNameRef.current.value !== ""
          ? pocNameRef.current.value
          : userData.pocName,
      pocNo:
        pocNoRef.current.value !== "" ? pocNoRef.current.value : userData.pocNo,
      pocEmail:
        pocEmailRef.current.value !== ""
          ? pocEmailRef.current.value
          : userData.pocEmail,
      applicants: [],
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
      <Form onSubmit={handleSubmit} className={styles.formBox}>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h5>Organization Details</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className={styles.accordionBox}>
                <Form.Group controlId="formType">
                  <Form.Label>Organization Type</Form.Label>
                  <Form.Control
                    required
                    placeholder={userData !== null ? userData.type : ""}
                    readOnly
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Name of Organization</Form.Label>
                  <Form.Control
                    required
                    placeholder={userData !== null ? userData.name : ""}
                    readOnly
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formUen">
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
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address of Organization</Form.Label>
                  <Form.Control
                    required
                    placeholder={userData !== null ? userData.email : ""}
                    readOnly
                  ></Form.Control>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h5>Job Details</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div className={styles.accordionBox}>
                {/* About the job */}
                <Form.Group controlId="formTitle">
                  <Form.Label>Title of volunteer work</Form.Label>
                  <Form.Control
                    required
                    placeholder="Python instructor"
                    ref={titleRef}
                  />
                </Form.Group>

                <Form.Group controlId="formBeneficiary">
                  <Form.Label>Target profile of beneficiary</Form.Label>
                  <DropdownMultiselect
                    placeholder="Select at least one beneficiary"
                    options={beneficiaryTags}
                    name="beneficiaries"
                    handleOnChange={(selected) => {
                      setBeneficiaries(selected);
                      console.log(beneficiaries);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formSkills">
                  <Form.Label>Skills required</Form.Label>
                  <DropdownMultiselect
                    placeholder="Select at least one skill"
                    options={skillTags}
                    name="skills"
                    handleOnChange={(selected) => {
                      setSkills(selected);
                      console.log(skills);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formPurpose">
                  <Form.Label>Purpose of volunteer work</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={2}
                    placeholder={`Teach children basic programming skills
(Elaborate on how students can benefit from volunteering)`}
                    ref={purposeRef}
                  />
                </Form.Group>
                {/* Platform and Location */}
                <Form.Group controlId="formPlatform">
                  <Form.Label>Platform of volunteer work</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={(event) => {
                      if (event.target.value === "Virtual") {
                        setVirtual(true);
                      } else if (event.target.value === "Physical") {
                        setVirtual(false);
                      }
                    }}
                    ref={platformRef}
                  >
                    <option>Physical</option>
                    <option>Virtual</option>
                  </Form.Control>
                </Form.Group>
                <div
                  className={
                    virtual ? styles.typeDisplayNone : styles.typeDisplay
                  }
                >
                  <Row>
                    <Col md={8}>
                      <Form.Group controlId="formLocation">
                        <Form.Label>Location of volunteer work</Form.Label>
                        <Form.Control
                          required={!multiLocation && !virtual}
                          readOnly={multiLocation || virtual}
                          placeholder={
                            multiLocation || virtual
                              ? null
                              : "Bukit Timah Plaza"
                          }
                          ref={locationRef}
                        />
                        <Form.Text>
                          <Form.Group>
                            <Form.Check
                              disabled={virtual}
                              checked={virtual ? false : multiLocation}
                              onClick={(event) =>
                                setMultiLocation(!multiLocation)
                              }
                              label="Multiple locations"
                              ref={multiLocationRef}
                            />
                          </Form.Group>
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formPostalCode">
                        <Form.Label>Postal code of location</Form.Label>
                        <Form.Control
                          required={!multiLocation && !virtual}
                          readOnly={multiLocation || virtual}
                          placeholder={multiLocation || virtual ? null : 588996}
                          ref={postalCodeRef}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                {/* Date and Time */}
                <Form.Group controlId="formType">
                  <Form.Label>Type of volunteer commitment level</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={(event) => {
                      if (event.target.value === "Long term") {
                        setAdHoc(false);
                      } else if (event.target.value === "Ad hoc") {
                        setAdHoc(true);
                      }
                    }}
                    ref={typeRef}
                  >
                    <option>Long term</option>
                    <option>Ad hoc</option>
                  </Form.Control>
                </Form.Group>
                {/* Long term */}
                <div
                  className={
                    adHoc ? styles.typeDisplayNone : styles.typeDisplay
                  }
                >
                  <Row>
                    <Col>
                      <Form.Group controlId="formLongStartDate">
                        <Form.Label>
                          Long term - Start date of volunteer work
                        </Form.Label>
                        <Form.Control
                          required={!adHoc && !flexibleDate}
                          readOnly={adHoc || flexibleDate}
                          type="date"
                          // value={adHoc || flexibleDate ? null : "1999-07-11"}
                          ref={longStartDateRef}
                        />
                        <Form.Text>
                          <Form>
                            <Form.Group>
                              <Form.Check
                                disabled={adHoc}
                                checked={adHoc ? false : flexibleDate}
                                onClick={(event) =>
                                  setFlexibleDate(!flexibleDate)
                                }
                                label="Start and end dates are flexible"
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
                          required={!adHoc && !flexibleDate}
                          readOnly={adHoc || flexibleDate}
                          type="date"
                          // value={adHoc || flexibleDate ? null:"" }
                          ref={longEndDateRef}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="formLongHours">
                    <Form.Label>
                      Long term - Number of hours to commit
                    </Form.Label>
                    <Form.Control
                      required={!adHoc && !flexibleHours}
                      readOnly={adHoc || flexibleHours}
                      placeholder={adHoc || flexibleHours ? null : 40}
                      ref={longHoursRef}
                    />
                    <Form.Text>
                      <Form>
                        <Form.Group>
                          <Form.Check
                            disabled={adHoc}
                            checked={adHoc ? false : flexibleHours}
                            onClick={(event) =>
                              setFlexibleHours(!flexibleHours)
                            }
                            label="Number of hours to commit is flexible"
                          />
                        </Form.Group>
                      </Form>
                    </Form.Text>
                  </Form.Group>
                </div>
                {/* Ad hoc */}
                <div
                  className={
                    adHoc ? styles.typeDisplay : styles.typeDisplayNone
                  }
                >
                  <Form.Group controlId="formShiftNumber">
                    <Form.Label>Ad hoc - Number of shifts</Form.Label>
                    <Form.Control
                      required={adHoc}
                      disabled={!adHoc}
                      placeholder={!adHoc ? null : shiftNumber}
                      type="number"
                      min="0"
                      max="10"
                      ref={shiftNumberRef}
                      onChange={(event) => {
                        setShiftNumber(event.target.value);
                      }}
                    />
                    {/* <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </Form.Control> */}
                  </Form.Group>
                </div>

                {/* Shifts display (I'm not proud of this) */}
                <Shifts
                  adHoc={adHoc}
                  shiftNumber={shiftNumber}
                  shift1DateRef={shift1DateRef}
                  shift1StartRef={shift1StartRef}
                  shift1EndRef={shift1EndRef}
                  shift2DateRef={shift2DateRef}
                  shift2StartRef={shift2StartRef}
                  shift2EndRef={shift2EndRef}
                  shift3DateRef={shift3DateRef}
                  shift3StartRef={shift3StartRef}
                  shift3EndRef={shift3EndRef}
                  shift4DateRef={shift4DateRef}
                  shift4StartRef={shift4StartRef}
                  shift4EndRef={shift4EndRef}
                  shift5DateRef={shift5DateRef}
                  shift5StartRef={shift5StartRef}
                  shift5EndRef={shift5EndRef}
                  shift6DateRef={shift6DateRef}
                  shift6StartRef={shift6StartRef}
                  shift6EndRef={shift6EndRef}
                  shift7DateRef={shift7DateRef}
                  shift7StartRef={shift7StartRef}
                  shift7EndRef={shift7EndRef}
                  shift8DateRef={shift8DateRef}
                  shift8StartRef={shift8StartRef}
                  shift8EndRef={shift8EndRef}
                  shift9DateRef={shift9DateRef}
                  shift9StartRef={shift9StartRef}
                  shift9EndRef={shift9EndRef}
                  shift10DateRef={shift10DateRef}
                  shift10StartRef={shift10StartRef}
                  shift10EndRef={shift10EndRef}
                />

                {/* Remaining details */}
                <Form.Group controlId="formAddInfo">
                  <Form.Label>Additional information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Minimum commitment is 2 months"
                    ref={addInfoRef}
                  />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    placeholder="Direct Imgur link to image"
                    ref={imageUrlRef}
                  />
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
                    placeholder={userData !== null ? userData.pocName : ""}
                    ref={pocNameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPocNo">
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
                    type="email"
                  />
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
                    required
                    type="checkbox"
                    label="I agree with the Terms and Conditions of Use"
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

  // const listShift = [
  //   { date: new Date(shift1Date), startTime: shift1Start, endTime: shift1End },
  //   { date: new Date(shift2Date), startTime: shift2Start, endTime: shift2End },
  //   { date: new Date(shift3Date), startTime: shift3Start, endTime: shift3End },
  //   { date: new Date(shift4Date), startTime: shift4Start, endTime: shift4End },
  //   { date: new Date(shift5Date), startTime: shift5Start, endTime: shift5End },
  //   { date: new Date(shift6Date), startTime: shift6Start, endTime: shift6End },
  //   { date: new Date(shift7Date), startTime: shift7Start, endTime: shift7End },
  //   { date: new Date(shift8Date), startTime: shift8Start, endTime: shift8End },
  //   { date: new Date(shift9Date), startTime: shift9Start, endTime: shift9End },
  //   {
  //     date: new Date(shift10Date),
  //     startTime: shift10Start,
  //     endTime: shift10End,
  //   },
  // ];
  // return listShift.slice(0, shiftNumber);
}

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

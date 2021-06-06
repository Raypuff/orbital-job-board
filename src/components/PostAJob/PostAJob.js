import { useState, useRef } from "react";
import {
  Row,
  Col,
  Accordion,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import styles from "./PostAJob.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";

const PostAJob = () => {
  const { addItem } = useStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  //finding currentUser that is logged in
  const { currentUser } = useAuth();

  //references to data in the form
  // job data
  const titleRef = useRef();
  const beneficiaryRef = useRef();
  const skillsRef = useRef();
  const purposeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const daysRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const platformRef = useRef();
  const locationRef = useRef();
  const postalCodeRef = useRef();
  const addInfoRef = useRef();
  const imageUrlRef = useRef();
  // contact details
  const pocNameRef = useRef();
  const pocNoRef = useRef();
  const pocEmailRef = useRef();

  const [error, setError] = useState("");
  //to show the terms and conditions modal

  const handleSubmit = (event) => {
    event.preventDefault();

    //creating the job to be posted from the refs
    const newJob = {
      id: "orgEmail + Date.now()",
      orgID: "retrieve org.id from database",
      status: "pending",
      title: titleRef.current.value,
      beneficiary: beneficiaryRef.current.value,
      skills: skillsRef.current.value,
      purpose: purposeRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      days: daysRef.current.value,
      startTime: startTimeRef.current.value,
      endTime: endTimeRef.current.value,
      platform: platformRef.current.value,
      location: locationRef.current.value,
      postalCode: postalCodeRef.current.value,
      addInfo: addInfoRef.current.value,
      imageUrl: imageUrlRef.current.value,
      pocName: pocNameRef.current.value,
      pocNo: pocNoRef.current.value,
      pocEmail: pocEmailRef.current.value,
      applicants: [],
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
        const jobID = "???"; //userEmail + Date.now(); zech u gotta do this part idk this
        addItem(newJob, "jobs", jobID);
        setSuccessful(true);
        setMessage("Job Posted. Thank you for using our service!");
      }
    } catch (err) {
      setError("Failed to post a job");
      console.log(err);
    }
    setLoading(false);
    setSubmitted(false);
  };

  return (
    <div className={styles.formContainer}>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Alert variant="primary">Posting your job...</Alert>}
      {successful && <Alert variant="success">{message}</Alert>}
      {}
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
                    placeholder="Retrieve type from database"
                    readOnly
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Name of Organization</Form.Label>
                  <Form.Control
                    required
                    placeholder="Retrieve name from database"
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
                    placeholder="Retrieve uen from database"
                    readOnly
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address of Organization</Form.Label>
                  <Form.Control
                    required
                    placeholder="Retrieve email from database"
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
                  <Form.Control
                    required
                    // placeholder="Children from disadvantaged backgrounds"
                    ref={beneficiaryRef}
                  />
                </Form.Group>
                <Form.Group controlId="formSkills">
                  <Form.Label>Skills required</Form.Label>
                  <Form.Control
                    required
                    // placeholder="Intermediate Python programming skills"
                    ref={skillsRef}
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
                <Row>
                  <Col>
                    <Form.Group controlId="formStartDate">
                      <Form.Label>Start date of volunteer work</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        // placeholder="2 months"
                        ref={startDateRef}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formEndDate">
                      <Form.Label>End date of volunteer work</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        // placeholder="2 months"
                        ref={endDateRef}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formDays">
                  <Form.Label>Days of the week of volunteer work</Form.Label>
                  <Form.Control
                    required
                    // placeholder="2 months"
                    ref={daysRef}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="formStartTime">
                      <Form.Label>Start time of volunteer work</Form.Label>
                      <Form.Control
                        required
                        // placeholder="2 months"
                        ref={startTimeRef}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group controlId="formEndTime">
                      <Form.Label>End time of volunteer work</Form.Label>
                      <Form.Control
                        required
                        // placeholder="2 months"
                        ref={endTimeRef}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formPlatform">
                      <Form.Label>Platform of volunteer work</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        // placeholder="2 months"
                        ref={platformRef}
                      >
                        <option>In person</option>
                        <option>Virtual</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPostalCode">
                      <Form.Label>Postal code of location</Form.Label>
                      <Form.Control
                        required
                        // placeholder="2 months"
                        ref={postalCodeRef}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formLocation">
                  <Form.Label>Location of volunteer work</Form.Label>
                  <Form.Control
                    required
                    // placeholder="2 months"
                    ref={locationRef}
                  />
                </Form.Group>
                <Form.Group controlId="formAddInfo">
                  <Form.Label>Additional information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    // required
                    // placeholder="2 months"
                    ref={addInfoRef}
                  />
                </Form.Group>
                <Form.Group controlId="formImageUrl">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    // required
                    // placeholder="2 months"
                    ref={imageUrlRef}
                  />
                </Form.Group>
              </div>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <h5>Contact Details</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div className={styles.accordionBox}>
                <Form.Group controlId="formPocName">
                  <Form.Label>Name of contact person</Form.Label>
                  <Form.Control
                    required
                    placeholder="Retrieve pocName from database"
                    ref={pocNameRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPocNo">
                  <Form.Label>Mobile number of contact person</Form.Label>
                  <Form.Control
                    required
                    placeholder="Retrieve pocNo from database"
                    ref={pocNoRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPocEmail">
                  <Form.Label>Email address of contact person</Form.Label>
                  <Form.Control
                    required
                    placeholder="Retrieve pocEmail from database"
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
                <ol>
                  <li>Agreement To Terms</li>
                  <p>
                    All access of any area of "orbital-job-board.vercel.app"
                    ("The Website") is governed by the terms and conditions
                    below ("Terms"). If you do not accept any of these Terms,
                    exit immediately. Continue only if you accept these Terms.
                    In these Terms, the words "we", "our" and "us" refers to the
                    Government of Singapore.
                  </p>
                  <li>Access To The Website</li>
                  <p>
                    The accessibility and operation of The Website relies on
                    technologies outside our control. We do not guarantee
                    continuous accessibility or uninterrupted operation of The
                    Website.
                  </p>
                  <li>Relying On Information</li>
                  <p>
                    We provide The Website as a general information source only
                    and we are not involved in giving professional advice here.
                    The Website may not cover all information available on a
                    particular issue. Before relying on the Website, you should
                    do your own checks or obtain professional advice relevant to
                    your particular circumstances.
                  </p>
                  <li>Security</li>
                  <p>
                    Where appropriate, we use available technology to protect
                    the security of communications made through The Website.
                    However, we do not accept liability for the security,
                    authenticity, integrity or confidentiality of any
                    transactions and other communications made through The
                    Website.
                  </p>
                  <p>
                    Internet communications may be susceptible to interference
                    or interception by third parties. Despite our best efforts,
                    we make no warranties that The Website is free of infection
                    by computer viruses or other unauthorised software.
                  </p>
                  <p>
                    You should take appropriate steps to keep your information,
                    software and equipment secure. This includes clearing your
                    Internet browser cookies and cache before and after using
                    any services on The Website. You should keep your passwords
                    confidential.
                  </p>
                  <li>Hyperlinks</li>
                  <p>
                    We are not responsible or liable for the availability or
                    content of any other Internet site (not provided by us)
                    linked to or from The Website. Access to any other Internet
                    site is at your own risk. If you create a link or frame to
                    The Website, you do so at your own risk.
                  </p>
                  <p>
                    We reserve the right to object or disable any link or frame
                    to or from The Website.
                  </p>
                  <p>We reserve the right to change the URL of The Website.</p>
                  <li>Intellectual Property</li>
                  <p>
                    Materials, including source code, pages, documents and
                    online graphics, audio and video in The Website are
                    protected by law. The intellectual property rights in the
                    materials is owned by or licensed to us. All rights
                    reserved. (Government of Singapore © 2018).
                  </p>
                  <p>
                    Apart from any fair dealings for the purposes of private
                    study, research, criticism or review, as permitted in law,
                    no part of The Website may be reproduced or reused for any
                    commercial purposes whatsoever without our prior written
                    permission.
                  </p>
                  <li>General Disclaimer And Limitation Of Liability</li>
                  <p>
                    We will not be liable for any loss or damage{" "}
                    <ul>
                      <li>
                        That you may incur on account of using, visiting or
                        relying on any statements, opinion, representation or
                        information in The Website;
                      </li>
                      <li>
                        Resulting from any delay in operation or transmission,
                        communications failure, Internet access difficulties or
                        malfunctions in equipment or software; or
                      </li>
                      <li>
                        Resulting from the conduct or the views of any person
                        who accesses or uses The Website.
                      </li>
                    </ul>
                  </p>
                  <li>Fees</li>
                  <p>
                    There are currently no fees for using any part of The
                    Website. We reserve the right to introduce new fees from
                    time to time. We are not responsible for any fees charged by
                    any other Internet site (not provided by us).
                  </p>
                  <li>Applicable Laws</li>
                  <p>
                    Use of The Website and these Terms are governed by the laws
                    of Singapore. Any claim relating to use of The Website shall
                    be heard by Singapore Courts.
                  </p>

                  <li>Variation</li>
                  <p>
                    We may revise these Terms at any time by updating this page.
                    You should visit this page from time to time and review the
                    then current Terms because they are binding on you. We may
                    modify or discontinue any information or features that form
                    part of The Website at any time, with or without notice to
                    you, and without liability.{" "}
                  </p>
                </ol>
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
      </Form>
    </div>
  );
};

export default PostAJob;

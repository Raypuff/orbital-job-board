import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Row, Col, Alert } from "react-bootstrap";
import { LoadingJobDetails, NotAvailable } from "./EmptyStates";
import noImage from "../../../assets/noImage.png";
import {
  JobDetailsApplyModal,
  ApplyButton,
  DisabledButton,
} from "../JobDetailsApplyModal/JobDetailsApplyModal";
import {
  JobDetailsAdminRejModal,
  AdminOpenRejModalButton,
  JobDetailsAdminAppModal,
  AdminOpenAppModalButton,
  JobDetailsAdminTDModal,
  AdminOpenTDModalButton,
} from "../JobDetailsAdminModal/JobDetailsAdminModal";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./JobDetails.module.css";
var uniqid = require("uniqid");

const JobDetails = ({ id }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAdminRejModal, setShowAdminRejModal] = useState(false);
  const [showAdminAppModal, setShowAdminAppModal] = useState(false);
  const [showAdminTDModal, setShowAdminTDModal] = useState(false);
  const [job, setJob] = useState();
  const [org, setOrg] = useState();
  const [applications, setApplications] = useState();
  const [orgLoading, setOrgLoading] = useState(true);
  const { currentUser, userType } = useAuth();
  const [imageSrc, setImageSrc] = useState("");
  const [loadingChatButton, setLoadingChatButton] = useState(true);
  const [buttonMakesNewChat, setButtonMakesNewChat] = useState(false);
  const history = useHistory();
  const [chatAlreadyExists, setAlreadyExists] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/" + id
      );
      const jsonData = await response.json();
      const response2 = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/organization-accounts/" +
          jsonData.orgID
      );
      const jsonData2 = await response2.json();
      setJob(jsonData);
      setOrg(jsonData2);
      setOrgLoading(false);
      setImageSrc(jsonData.imageUrl);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showApplyModal]);

  useEffect(() => {
    const getApplications = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/job-applications/job/" + id
      );

      const jsonData = await response.json();
      setApplications(jsonData);
    };

    getApplications();
  }, []);

  const createChats = async () => {
    const body = {
      id: uniqid(),
      stuAvatar: "",
      orgAvatar: "",
      alt: "avatar",
      stuID: currentUser.email,
      orgID: org.id,
    };
    await fetch(process.env.REACT_APP_BACKEND_URL + "/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const checkIfExists = async () => {
    const alreadyExistsData = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/chats/already-exists/" +
        currentUser.email +
        "&" +
        orgID
    );
    const alreadyExists = await alreadyExistsData.json();
    if (!alreadyExists) {
      setButtonMakesNewChat(true);
    }
    setLoadingChatButton(false);
  };
  const ChatNowButton = () => {
    checkIfExists();

    if (loadingChatButton) {
      return <div className={styles.button}>Loading...</div>;
    } else if (buttonMakesNewChat) {
      return (
        <div
          className={styles.button}
          onClick={() => {
            createChats();
            history.push("/");
            history.replace("/chat-student");
          }}
        >
          Chat now
        </div>
      );
    } else {
      return (
        <div
          className={styles.button}
          onClick={() => history.push("/chat-student")}
        >
          Go to existing chat
        </div>
      );
    }
  };

  if (orgLoading) {
    return <LoadingJobDetails />;
  }

  const {
    orgID,
    status,
    title,
    beneficiaries,
    skills,
    purpose,
    platform,
    multiLocation,
    location,
    postalCode,
    type,
    flexiDate,
    longStartDate,
    longEndDate,
    flexiHours,
    longHours,
    flexiShifts,
    adShift,
    addInfo,
    imageUrl,
    closingDate,
    noClosingDate,
    pocName,
    pocNo,
    pocEmail,
    dateCreated,
    datePosted,
    removalReason,
    applicants,
  } = job;
  const orgType = org.type;
  const orgName = org.name;
  const orgUen = org.uen;

  // For display diff displayStates
  //0: Signed out -> Apply button
  //16: Student haven't apply --> Apply button + Chat now
  //1: Student applied & Job Approved -> Disabled Apply button + Chat now
  //11: Student successfully applied & Job Taken down -> Disabled Apply Button + Alert at top that job is taken down + Chat now
  //12: Student successfully applied & Job Completd ->  Disabled Apply Button + Alert at top that job is completed + Chat now
  //2: Org Not Your Job -> No button
  //3: Org Job Pending -> Alert at top that job is still pending
  //4: Org Job Approved -> Alert at top that job is visible
  //5: Org Job Rejected -> Alert at top that job is rejected with reason
  //10: Org Job Completed -> Alert at top that job is completed
  //14: Org Job TakenDown --> Alert at top that job is taken down with reason
  //6: Admin Job Pending -> Reject or Approve job
  //7: Admin Job Approved -> Alert at the top that the job is approved and button below to takedown
  //8: Admin Job Rejected -> Alert at the top that the job is rejected with reason
  //13: Admin Job Completed -> Alert at the top that the job is completed
  //15: Admin Job TakenDown --> Alert at the top that job is taken down with reason
  //9: Not available

  var displayState;
  if (currentUser === null) {
    if (status === "Approved") {
      displayState = 0;
    } else {
      displayState = 9;
    }
  } else if (currentUser !== null && userType === "student") {
    if (status === "Approved") {
      if (applicants === null || !applicants.includes(currentUser.email)) {
        displayState = 16;
      } else if (
        applicants !== null &&
        applicants.includes(currentUser.email)
      ) {
        displayState = 1;
      }
    } else if (status === "TakenDown") {
      const myApp = applications.filter(
        (app) => app.stuID === currentUser.email
      );
      if (myApp && myApp[0].status === "Accepted") {
        displayState = 11;
      } else {
        displayState = 9;
      }
    } else if (status === "Completed") {
      const myApp = applications.filter(
        (app) => app.stuID === currentUser.email
      );
      if (myApp && myApp[0].status === "Accepted") {
        displayState = 12;
      } else {
        displayState = 9;
      }
    } else {
      displayState = 9;
    }
  } else if (currentUser !== null && userType === "organization") {
    if (orgID !== currentUser.email) {
      displayState = 2;
    } else if (status === "Pending") {
      displayState = 3;
    } else if (status === "Approved") {
      displayState = 4;
    } else if (status === "Rejected") {
      displayState = 5;
    } else if (status === "Completed") {
      displayState = 10;
    } else if (status === "TakenDown") {
      displayState = 14;
    } else {
      displayState = 9;
    }
  } else if (currentUser !== null && userType === "admin") {
    if (status === "Pending") {
      displayState = 6;
    } else if (status === "Approved") {
      console.log("yeet");
      displayState = 7;
    } else if (status === "Rejected") {
      displayState = 8;
    } else if (status === "Completed") {
      displayState = 13;
    } else if (status === "TakenDown") {
      displayState = 15;
    } else {
      displayState = 9;
    }
  } else {
    displayState = 9;
  }

  if (displayState === 9) {
    return <NotAvailable />;
  } else {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {displayState === 3 ? (
              <Alert variant="warning">
                Your job is still pending approval and is not publicly visible
              </Alert>
            ) : displayState === 4 ? (
              <Alert variant="success">
                Your job has been approved and is publicly visible
              </Alert>
            ) : displayState === 5 ? (
              <Alert variant="danger">
                Your job has been rejected and is not publicly visible
                <hr />
                Reason for rejection: {removalReason}
              </Alert>
            ) : displayState === 7 ? (
              <Alert variant="success">
                This job has been approved and is publicly visible
              </Alert>
            ) : displayState === 8 ? (
              <Alert variant="danger">
                This job has been rejected and is not publicly visible
                <hr />
                Reason for rejection: {removalReason}
              </Alert>
            ) : displayState === 10 ? (
              <Alert variant="primary">
                This job has been completed and is not publicly visible
              </Alert>
            ) : displayState === 11 ? (
              <Alert variant="danger">
                This job has been taken down and is not publicly visible. Please
                contact the organization if you have further queries.
              </Alert>
            ) : displayState === 12 ? (
              <Alert variant="primary">
                This job has been completed and is not publicly visible
              </Alert>
            ) : displayState === 13 ? (
              <Alert variant="primary">
                This job has been completed and is not publicly visible
              </Alert>
            ) : displayState === 14 ? (
              <Alert variant="danger">
                Your job has been taken down and is not publicly visible.
                <hr />
                Reason for takedown: {removalReason}
              </Alert>
            ) : displayState === 15 ? (
              <Alert variant="danger">
                This job has been taken down and is not publicly visible.
                <hr />
                Reason for takedown: {removalReason}
              </Alert>
            ) : null}
            <Row>
              <Col md={2}>
                <div className={styles.imageCol}>
                  <img
                    className={styles.image}
                    src={imageSrc}
                    onError={() => setImageSrc(noImage)}
                    alt="volunteer"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.detailCol}>
                  <div className={styles.detailContainer}>
                    <h4>{title}</h4>
                    <hr className={styles.divider} />
                    <h7>
                      {`Posted on: ${new Date(datePosted).toDateString()}`}
                      <br />
                    </h7>
                    <h7>
                      {noClosingDate
                        ? "No closing date for applications"
                        : `Applications close on: ${new Date(
                            closingDate
                          ).toDateString()}`}
                    </h7>
                    <hr />
                    <h5>About</h5>
                    <div className={styles.lineWrapper}>
                      <h7>
                        Beneficiaries:
                        <br />{" "}
                      </h7>
                      {beneficiaries.map((beneficiary, index) => {
                        if (index + 1 !== beneficiaries.length) {
                          return <h7 key={index}>{`${beneficiary}, `}</h7>;
                        } else {
                          return <h7 key={index}>{beneficiary}</h7>;
                        }
                      })}
                    </div>
                    <div className={styles.lineWrapper}>
                      <h7>
                        Skills:
                        <br />{" "}
                      </h7>
                      {skills.map((skill, index) => {
                        if (index + 1 !== skills.length) {
                          return <h7 key={index}>{`${skill}, `}</h7>;
                        } else {
                          return <h7 key={index}>{skill}</h7>;
                        }
                      })}
                    </div>
                    <h7>
                      Purpose:
                      <br />{" "}
                    </h7>
                    <h7>{purpose}</h7>
                  </div>
                  <div className={styles.detailContainer}>
                    <h5>Location</h5>
                    <h7>Platform: </h7>
                    <h7>
                      {platform}
                      <br />
                    </h7>
                    <div
                      className={
                        platform === "Physical"
                          ? styles.display
                          : styles.displayNone
                      }
                    >
                      <h7>Location: </h7>
                      <h7>
                        {platform !== "Physical" || multiLocation === true
                          ? "Multiple locations"
                          : location}
                      </h7>
                      <div
                        className={
                          multiLocation === true
                            ? styles.displayNone
                            : styles.display
                        }
                      >
                        <h7>Postal code: </h7>
                        <h7>{`S(${postalCode}) `}</h7>
                        <h7>
                          {platform !== "Physical" || multiLocation === true
                            ? ""
                            : `<Calculate distance from ${postalCode}`}
                          <br />
                        </h7>
                      </div>
                    </div>
                  </div>
                  <div className={styles.detailContainer}>
                    <h5>Commitment period</h5>
                    <h7>Commitment type: </h7>
                    <h7>
                      {type}
                      <br />
                    </h7>
                    <div
                      className={
                        type === "Long term"
                          ? styles.display
                          : styles.displayNone
                      }
                    >
                      <h7>Dates: </h7>
                      <h7>
                        {type === "Long term"
                          ? !flexiDate
                            ? `${new Date(
                                longStartDate
                              ).toDateString()} - ${new Date(
                                longEndDate
                              ).toDateString()}`
                            : "Flexible start and end date"
                          : ""}
                        <br />
                      </h7>
                      <h7>Required hours: </h7>
                      <h7>
                        {flexiHours === false
                          ? longHours
                          : "Flexible required hours"}
                        <br />
                      </h7>
                    </div>
                    <div
                      className={
                        type === "Ad hoc" ? styles.display : styles.displayNone
                      }
                    >
                      <div className={styles.shiftWrapper}>
                        <h7>
                          Shifts:
                          <br />
                        </h7>
                        <ol>
                          {type === "Ad hoc"
                            ? !flexiShifts
                              ? adShift && adShift.length > 0
                                ? adShift.map((shift, index) => {
                                    return (
                                      <li key={index}>
                                        <h7>
                                          {`${new Date(
                                            shift.date
                                          ).toDateString()} ${tConvert(
                                            shift.startTime
                                          )} - ${tConvert(shift.endTime)}`}
                                        </h7>
                                      </li>
                                    );
                                  })
                                : "No shifts indicated"
                              : "Flexible shifts"
                            : ""}
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Additional information</h5>
                    <h7>{addInfo}</h7>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className={styles.orgCol}>
                  <div className={styles.orgContainer}>
                    <h5>by {orgName}</h5>
                    <hr className={styles.divider} />
                    <h7>
                      {orgType}
                      <br />
                    </h7>
                    {(displayState === 6 ||
                      displayState === 7 ||
                      displayState === 8) &&
                      orgType === "Non-NUS Organization" && (
                        <h7 className="text-muted">
                          UEN: {orgUen}
                          <br />
                        </h7>
                      )}
                    <h7>
                      <a href={`mailto:${orgID}`}>{orgID}</a>
                    </h7>
                  </div>
                  <div className={styles.orgContainer}>
                    <h5>Contact us</h5>
                    <hr className={styles.divider} />
                    <h7>
                      {pocName}
                      <br />
                    </h7>
                    <h7>
                      {pocNo}
                      <br />
                    </h7>
                    <h7>
                      <a href={`mailto:${pocEmail}`}>{pocEmail}</a>
                    </h7>
                  </div>
                  {(displayState === 16 ||
                    displayState === 1 ||
                    displayState === 11 ||
                    displayState === 12) && (
                    <div className={styles.buttonRow}>
                      <ChatNowButton />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2} />
              <Col md={6}>
                <div className={styles.buttonRow}>
                  {displayState === 0 || displayState === 16 ? (
                    <ApplyButton handleClick={() => setShowApplyModal(true)} />
                  ) : displayState === 1 ||
                    displayState === 11 ||
                    displayState === 12 ? (
                    <DisabledButton />
                  ) : displayState === 6 ? (
                    <>
                      <AdminOpenRejModalButton
                        handleClick={() => setShowAdminRejModal(true)}
                      />
                      <AdminOpenAppModalButton
                        handleClick={() => setShowAdminAppModal(true)}
                      />
                    </>
                  ) : displayState === 7 ? (
                    <AdminOpenTDModalButton
                      handleClick={() => setShowAdminTDModal(true)}
                    />
                  ) : null}
                </div>
              </Col>
              <Col md={4} />
            </Row>
          </div>
        </div>
        {displayState === 0 || displayState === 16 ? (
          <JobDetailsApplyModal
            show={showApplyModal}
            onHide={() => setShowApplyModal(false)}
            id={id}
            orgType={orgType}
            orgName={orgName}
            orgEmail={orgID}
            status={status}
            title={title}
            beneficiaries={beneficiaries}
            skills={skills}
            purpose={purpose}
            platform={platform}
            multiLocation={multiLocation}
            location={location}
            postalCode={postalCode}
            type={type}
            flexiDate={flexiDate}
            longStartDate={longStartDate}
            longEndDate={longEndDate}
            flexiHours={flexiHours}
            longHours={longHours}
            adShift={adShift}
            addInfo={addInfo}
            imageUrl={imageUrl}
            pocName={pocName}
            pocNo={pocNo}
            pocEmail={pocEmail}
            applicants={applicants}
          />
        ) : displayState === 6 ? (
          <>
            <JobDetailsAdminRejModal
              show={showAdminRejModal}
              onHide={() => setShowAdminRejModal(false)}
              id={id}
              orgType={orgType}
              orgName={orgName}
              orgEmail={orgID}
              status={status}
              title={title}
              beneficiaries={beneficiaries}
              skills={skills}
              purpose={purpose}
              platform={platform}
              multiLocation={multiLocation}
              location={location}
              postalCode={postalCode}
              type={type}
              flexiDate={flexiDate}
              longStartDate={longStartDate}
              longEndDate={longEndDate}
              flexiHours={flexiHours}
              longHours={longHours}
              adShift={adShift}
              addInfo={addInfo}
              imageUrl={imageUrl}
              pocName={pocName}
              pocNo={pocNo}
              pocEmail={pocEmail}
              applicants={applicants}
            />
            <JobDetailsAdminAppModal
              show={showAdminAppModal}
              onHide={() => setShowAdminAppModal(false)}
              id={id}
              orgType={orgType}
              orgName={orgName}
              orgEmail={orgID}
              status={status}
              title={title}
              beneficiaries={beneficiaries}
              skills={skills}
              purpose={purpose}
              platform={platform}
              multiLocation={multiLocation}
              location={location}
              postalCode={postalCode}
              type={type}
              flexiDate={flexiDate}
              longStartDate={longStartDate}
              longEndDate={longEndDate}
              flexiHours={flexiHours}
              longHours={longHours}
              adShift={adShift}
              addInfo={addInfo}
              imageUrl={imageUrl}
              pocName={pocName}
              pocNo={pocNo}
              pocEmail={pocEmail}
              applicants={applicants}
            />
          </>
        ) : displayState === 7 ? (
          <JobDetailsAdminTDModal
            show={showAdminTDModal}
            onHide={() => setShowAdminTDModal(false)}
            id={id}
            orgType={orgType}
            orgName={orgName}
            orgEmail={orgID}
            status={status}
            title={title}
            beneficiaries={beneficiaries}
            skills={skills}
            purpose={purpose}
            platform={platform}
            multiLocation={multiLocation}
            location={location}
            postalCode={postalCode}
            type={type}
            flexiDate={flexiDate}
            longStartDate={longStartDate}
            longEndDate={longEndDate}
            flexiHours={flexiHours}
            longHours={longHours}
            adShift={adShift}
            addInfo={addInfo}
            imageUrl={imageUrl}
            pocName={pocName}
            pocNo={pocNo}
            pocEmail={pocEmail}
            applicants={applicants}
          />
        ) : null}
      </>
    );
  }
};

export default JobDetails;

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

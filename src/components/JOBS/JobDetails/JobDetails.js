import { useEffect, useState } from "react";
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
  JobDetailsAdminAppModal,
  AdminOpenRejModalButton,
  AdminOpenAppModalButton,
} from "../JobDetailsAdminModal/JobDetailsAdminModal";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./JobDetails.module.css";

const JobDetails = ({ id }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAdminRejModal, setShowAdminRejModal] = useState(false);
  const [showAdminAppModal, setShowAdminAppModal] = useState(false);
  const [job, setJob] = useState();
  const [org, setOrg] = useState();
  const [orgLoading, setOrgLoading] = useState(true);
  const { currentUser, userType } = useAuth();
  const [imageSrc, setImageSrc] = useState("");

  const getData = async () => {
    const response = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.com/jobs/" + id
    );
    const jsonData = await response.json();
    const response2 = await fetch(
      "https://volunteer-ccsgp-backend.herokuapp.com/organization-accounts/" +
        jsonData.orgID
    );
    const jsonData2 = await response2.json();
    setJob(jsonData);
    setOrg(jsonData2);
    setOrgLoading(false);
    setImageSrc(jsonData.imageUrl);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    adShift,
    addInfo,
    imageUrl,
    pocName,
    pocNo,
    pocEmail,
    dateCreated,
    datePosted,
    applicants,
  } = job;
  const orgType = org.type;
  const orgName = org.name;
  const orgUen = org.uen;

  // For display diff displayStates
  //0: Signed out OR Student haven't apply -> Apply button
  //1: Student applied -> Disabled Apply button
  //2: Org Not Your Job -> No button
  //3: Org Job Pending -> Alert at top that job is still pending
  //4: Org Job Approved -> Alert at top that job is visible
  //5: Org Job Rejected -> Alert at top that job is rejectd
  //6: Admin Job Pending -> Reject or Approve job
  //7: Admin Job Approved -> Alert at the top that the job is approved
  //8: Admin Job Rejected -> Alert at the top that the job is rejected
  //9: Not available

  var displayState;
  if (currentUser === null) {
    displayState = 0;
  } else if (currentUser !== null && userType === "student") {
    if (
      job.applicants === null ||
      !job.applicants.includes(currentUser.email)
    ) {
      displayState = 0;
    } else {
      displayState = 1;
    }
  } else if (currentUser !== null && userType === "organization") {
    if (job.orgID !== currentUser.email) {
      displayState = 2;
    } else if (status === "Pending") {
      displayState = 3;
    } else if (status === "Approved") {
      displayState = 4;
    } else if (status === "Rejected") {
      displayState = 5;
    }
  } else if (currentUser !== null && userType === "admin") {
    if (status === "Pending") {
      displayState = 6;
    } else if (status === "Approved") {
      displayState = 7;
    } else if (status === "Rejected") {
      displayState = 8;
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
              </Alert>
            ) : displayState === 7 ? (
              <Alert variant="success">
                This job has been approved and is publicly visible
              </Alert>
            ) : displayState === 8 ? (
              <Alert variant="danger">
                This job has been rejected and is not publicly visible
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
                          ? flexiDate === false
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
                      displayState === 8) && (
                      <h7>
                        {orgUen}
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
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={2} />
              <Col md={6}>
                <div className={styles.buttonRow}>
                  {displayState === 0 ? (
                    <ApplyButton handleClick={() => setShowApplyModal(true)} />
                  ) : displayState === 1 ? (
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
                  ) : null}
                </div>
              </Col>
              <Col md={4} />
            </Row>
          </div>
        </div>
        {displayState === 0 ? (
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

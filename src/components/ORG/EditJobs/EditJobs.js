//IMPORTS
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import { Row, Col, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
//React Router
import { Link, useHistory } from "react-router-dom";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
import { useJob } from "../../../contexts/JobContext";
import { useOrg } from "../../../contexts/OrgContext";
//Components
import EditJobsModal from "./EditJobsModal";
import ConfirmModal from "./ConfirmModal";
import { Loading, Empty } from "../../EmptyStates/EmptyStates";
//Images
import noImage from "../../../assets/emptyStates/noImage.png";
//CSS Modules
import styles from "./EditJobs.module.css";

const EditJobs = ({ id }) => {
  //USESTATES
  //Stores job details
  const [job, setJob] = useState({});
  //If the job is still being fetched
  const [loading, setLoading] = useState(true);
  //The image source - to be replaced by job.imageUrl but if there's error it'll be the placeholder image
  const [imageSrc, setImageSrc] = useState("");
  //Show the modal for editing each section of the job
  const [showEditModal, setShowEditModal] = useState(false);
  //Show the modal for confirming all the edits
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //Determines what the edit modal shows
  const [editMode, setEditMode] = useState("");

  //CUSTOM HOOKS
  //Retrieves the current user details
  const { currentUser } = useAuth();
  const { getJobDetails } = useJob();
  //Pushing to previous page
  const history = useHistory();

  async function getPageData() {
    const job = await getJobDetails(id);
    setJob(job);
    setImageSrc(job.imageUrl);
    setLoading(false);
  }

  //USEEFFECTS
  //Fetching job data
  useEffect(() => {
    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //DESTRUCTURING JOB INTO PROPERTIES
  const {
    orgID,
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
    closingDate,
    noClosingDate,
    pocName,
    pocNo,
    pocEmail,
    datePosted,
  } = job;

  //DICTIONARY TO BIND PROPERTY TO A TOOLTIP NAME
  const tooltipDict = {
    image: "image",
    title: "title",
    closingDate: "closing date",
    beneficiaries: "beneficiaries",
    skills: "skils",
    purpose: "purpose",
    location: "location",
    commitment: "commitment period",
    addInfo: "additional information",
    contact: "contact information",
  };

  //EDIT BUTTON COMPONENT WITH TOOLTIP THAT OPENS MODAL AND SETS EDIT MODE
  const EditButton = ({ mode }) => {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={(props) => (
          <Tooltip id="tooltip" {...props}>
            Edit {tooltipDict[mode]}
          </Tooltip>
        )}
      >
        <PencilSquare
          style={{
            fontSize: "1rem",
            color: "#193f76",
            cursor: "pointer",
            marginLeft: "auto",
          }}
          onClick={() => {
            setShowEditModal(true);
            setEditMode(mode);
          }}
        />
      </OverlayTrigger>
    );
  };

  //LOADIING
  if (loading) {
    return <Loading>Loading edit jobs...</Loading>;
  }
  //NOT YOUR JOB
  if (orgID !== currentUser.email) {
    return (
      <Empty
        title={
          "Sorry! It seems you have stumbled across a job that is not yours."
        }
        actions={[
          {
            tip: "To view your own jobs, proceed to",
            button: "Your Jobs",
            link: "/your-jobs",
          },
        ]}
      />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Alert variant="warning">
            Your edits will not be saved until you click "Confirm changes"
          </Alert>
          <Row>
            <Col md={2}>
              <div className={styles.imageCol}>
                <div className={styles.editImageContainer}>
                  <EditButton mode="image" />
                </div>
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
                  <h4 className={styles.checkboxContainer}>
                    {title}
                    <EditButton mode="title" />
                  </h4>
                  <hr className={styles.divider} />
                  {datePosted && (
                    <h7>
                      {`Posted on: ${new Date(datePosted).toDateString()}`}
                      <br />
                    </h7>
                  )}

                  <div className={styles.checkboxContainer}>
                    {noClosingDate
                      ? "No closing date for applications"
                      : `Applications close on: ${new Date(
                          closingDate
                        ).toDateString()}`}
                    <EditButton mode="closingDate" />
                  </div>
                  <hr />
                  <h5>About</h5>
                  <div className={styles.lineWrapper}>
                    <div className={styles.checkboxContainer}>
                      Beneficiaries:
                      <EditButton mode="beneficiaries" />
                      <br />{" "}
                    </div>
                    {beneficiaries.map((beneficiary, index) => {
                      if (index + 1 !== beneficiaries.length) {
                        return <h7 key={index}>{`${beneficiary}, `}</h7>;
                      } else {
                        return <h7 key={index}>{beneficiary}</h7>;
                      }
                    })}
                  </div>
                  <div className={styles.lineWrapper}>
                    <div className={styles.checkboxContainer}>
                      Skills:
                      <EditButton mode="skills" />
                      <br />{" "}
                    </div>
                    {skills.map((skill, index) => {
                      if (index + 1 !== skills.length) {
                        return <h7 key={index}>{`${skill}, `}</h7>;
                      } else {
                        return <h7 key={index}>{skill}</h7>;
                      }
                    })}
                  </div>
                  <div className={styles.editImageContainer}>
                    Purpose:
                    <EditButton mode="purpose" />
                    <br />{" "}
                  </div>
                  <h7>{purpose}</h7>
                </div>
                <div className={styles.detailContainer}>
                  <h5 className={styles.checkboxContainer}>
                    Location
                    <EditButton mode="location" />
                  </h5>
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
                    </div>
                  </div>
                </div>
                <div className={styles.detailContainer}>
                  <h5 className={styles.checkboxContainer}>
                    Commitment period
                    <EditButton mode="commitment" />
                  </h5>
                  <h7>Commitment type: </h7>
                  <h7>
                    {type}
                    <br />
                  </h7>
                  <div
                    className={
                      type === "Long term" ? styles.display : styles.displayNone
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
                      <h7>{`Shifts:${" "}`}</h7>
                      <span>
                        {type === "Ad hoc" ? (
                          !flexiShifts ? (
                            adShift && adShift.length > 0 ? (
                              <ol>
                                {adShift.map((shift, index) => (
                                  <li key={index}>
                                    <h7>
                                      {`${new Date(
                                        shift.date
                                      ).toDateString()} ${tConvert(
                                        shift.startTime
                                      )} - ${tConvert(shift.endTime)}`}
                                    </h7>
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              "No shifts indicated"
                            )
                          ) : (
                            "Flexible shifts"
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className={styles.checkboxContainer}>
                    Additional information
                    <EditButton mode="addInfo" />
                  </h5>
                  <h7>{addInfo}</h7>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className={styles.orgCol}>
                <div className={styles.orgContainer}>
                  <h5 className={styles.checkboxContainer}>
                    Contact us
                    <EditButton mode="contact" />
                  </h5>
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
                <div
                  className={styles.buttonBack}
                  onClick={() => history.goBack()}
                >
                  Back
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    setShowConfirmModal(true);
                  }}
                >
                  Confirm changes
                </div>
              </div>
            </Col>
            <Col md={4} />
          </Row>
        </div>
      </div>
      {/* Modals */}
      <EditJobsModal
        job={job}
        setJob={setJob}
        setImageSrc={setImageSrc}
        tooltipDict={tooltipDict}
        editMode={editMode}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
      />
      <ConfirmModal
        job={job}
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
      />
    </>
  );
};

export default EditJobs;

//FUNCTION FOR CONVERTING TIME FORMAT
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

import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import JobDetailsModal from "../JobDetailsModal";
import styles from "./JobDetails.module.css";

const JobDetails = ({ id }) => {
  const [showModal, setShowModal] = useState(false);

  const job = dummyData[id];
  const orgs = dummyOrgData;

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
    applicants,
  } = job;

  const orgType = orgs[orgID].type;
  const orgName = orgs[orgID].name;
  const orgEmail = orgs[orgID].email;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Row>
            <Col md={2}>
              <div className={styles.imageCol}>
                <img
                  className={styles.image}
                  src={imageUrl}
                  alt="volunteer"
                ></img>
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.detailCol}>
                <div className={styles.detailContainer}>
                  <h4>{title}</h4>
                  <hr className={styles.divider} />
                  <h5>About</h5>
                  <div className={styles.lineWrapper}>
                    <h7>Beneficiaries: </h7>
                    {beneficiaries.map((beneficiary, index) => {
                      if (index + 1 !== beneficiaries.length) {
                        return <h7 key={index}>{`${beneficiary}, `}</h7>;
                      } else {
                        return <h7 key={index}>{beneficiary}</h7>;
                      }
                    })}
                  </div>
                  <div className={styles.lineWrapper}>
                    <h7>Skills: </h7>
                    {skills.map((skill, index) => {
                      if (index + 1 !== skills.length) {
                        return <h7 key={index}>{`${skill}, `}</h7>;
                      } else {
                        return <h7 key={index}>{skill}</h7>;
                      }
                    })}
                  </div>
                  <h7>Purpose: </h7>
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
                      {multiLocation === true ? "Multiple locations" : location}
                    </h7>
                    <h7>
                      {multiLocation === true ? "" : "(Calc dist)"}
                      <br />
                    </h7>

                    <h7>Postal code: </h7>
                    <h7>{postalCode}</h7>
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
                      type === "Long term" ? styles.display : styles.displayNone
                    }
                  >
                    <h7>Dates: </h7>
                    <h7>
                      {type === "Long term"
                        ? flexiDate === false
                          ? `${longStartDate.toDateString()} - ${longEndDate.toDateString()}`
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
                                    {`${shift.date.toDateString()} ${tConvert(
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
                  <h7>
                    <a href={`mailto:${orgEmail}`}>{orgEmail}</a>
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
                <div
                  className={styles.button}
                  onClick={() => setShowModal(true)}
                >
                  Apply now
                </div>
              </div>
            </Col>
            <Col md={4} />
          </Row>
        </div>
      </div>
      <JobDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        id={id}
        orgType={orgType}
        orgName={orgName}
        orgEmail={orgEmail}
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
  );
};
export default JobDetails;

const dummyData = {
  // "random-key-0": {
  //     id: "random-key-0",
  //     orgID: "<org.id>",
  //     status: "pending | rejected | approved | completed",
  //     title: "<event title or volunteer title>",
  //     beneficiaries: ["<list of string beneficiaries>"],
  //     skills: ["<list of string skills>"],
  //     purpose: "<purpose of the entire event/role",
  //     platform: "Physical | Virtual",
  //     multiLocation: "(platform == "Physical" ? true | false : null)",
  //     location: "(platform == "Physical" && multiLocation == false ? "<location>" : null)",
  //     postalCode: "(platform == "Physical" && multiLocation == false ? "<postal code>" : null)",
  //     type: "Ad hoc | Long term",
  //     longStartDate: "(type == "Long term" ? "<dateTime object>" : null ,
  //     longEndDate: "(type == "Long term" ? "<dateTime object>": null)",
  //     longHours: "(type == "Long term" ? "<int hours required>": null)",
  //     adShift: "(type == "Ad hoc" ? "<list of {dateTime date, int starTime, int endTime}>" : null)",
  //     addInfo: "<additional information about the event/role>"
  //     imageUrl: "<url of image of event/role>",
  //     pocName: "<name of POC>",
  //     pocNo: "<number of POC>",
  //     pocEmail: "<email of POC>",
  //     applicants: [],
  //   },
  "random-key-1": {
    id: "random-key-1",
    orgID: "otakuneko23@gmail.com",
    status: "approved",
    title: "Python teacher",
    beneficiaries: ["Children", "Teens"],
    skills: ["Python", "Teaching"],
    purpose: "Teach students python",
    platform: "Physical",
    multiLocation: false,
    location: "Bukit Panjang Plaza",
    postalCode: 677743,
    type: "Ad hoc",
    flexiDate: false,
    longStartDate: null,
    longEndDate: null,
    flexiHours: false,
    longHours: null,
    adShift: [
      { date: new Date("2021-05-25"), startTime: "17:30", endTime: "19:30" },
      { date: new Date("2021-04-02"), startTime: "17:00", endTime: "19:00" },
    ],
    addInfo: "All teachers will be reimbursed at $20 an hour",
    imageUrl: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    pocName: "Rayner",
    pocNo: 98365567,
    pocEmail: "raynerljm@gmail.com",
    applicants: [],
  },
  "random-key-2": {
    id: "random-key-2",
    orgID: "peepeetime@gmail.com",
    status: "approved",
    title: "CS2100 Tutor",
    beneficiaries: ["Youths"],
    skills: ["C++"],
    purpose: "Teach students python",
    platform: "Virtual",
    multiLocation: null,
    location: null,
    postalCode: null,
    type: "Long term",
    flexiDate: false,
    longStartDate: new Date("2021-01-06"),
    longEndDate: new Date("2021-12-31"),
    flexiHours: false,
    longHours: 140,
    adShift: null,
    addInfo: "TAs will be paid $40 an hour -HAND",
    imageUrl: "https://www.comp.nus.edu.sg/stfphotos/tantc.jpg",
    pocName: "Zechary",
    pocNo: 91234567,
    pocEmail: "peepeetime@gmail.com",
    applicants: [],
  },
  "random-key-3": {
    id: "random-key-3",
    orgID: "testflexiDate@gmail.com",
    status: "approved",
    title: "FlexiDate Test",
    beneficiaries: ["Elderly"],
    skills: ["Smartphone"],
    purpose: "Teach elderly phone stuff",
    platform: "Physical",
    multiLocation: true,
    location: null,
    postalCode: null,
    type: "Long term",
    flexiDate: true,
    longStartDate: new Date("2021-01-06"),
    longEndDate: new Date("2021-12-31"),
    flexiHours: true,
    longHours: 140,
    adShift: null,
    addInfo: "Teachers will be paid $90 an hour",
    imageUrl: "http://www.mandysam.com/img/random.jpg",
    pocName: "MrKuku",
    pocNo: 88887777,
    pocEmail: "testflexiDate@gmail.com",
    applicants: [],
  },
};

const dummyOrgData = {
  "otakuneko23@gmail.com": {
    id: "otakuneko23@gmail.com",
    type: "NUS Organization",
    name: "NUS Hackers",
    uen: null,
    email: "otakuneko23@gmail.com",
    pocName: "Rayner",
    pocNo: 98365567,
    pocEmail: "raynerljm@gmail.com",
    dateCreated: new Date("Dec 28 1998"),
    jobsPosted: [],
  },
  "peepeetime@gmail.com": {
    id: "peepeetime@gmail.com",
    type: "Non-NUS Organization",
    name: "Zechary's Charities",
    uen: 6969123,
    email: "peepeetime@gmail.com",
    pocName: "Zechary Au",
    pocNo: 92345678,
    pocEmail: "peepeetime@gmail.com",
    dateCreated: new Date("Jul 11 2017"),
    jobsPosted: [],
  },
  "testflexiDate@gmail.com": {
    id: "testflexiDate@gmail.com",
    type: "Non-NUS Organization",
    name: "St Theresa's Home",
    uen: 888443,
    email: "testflexiDate@gmail.com",
    pocName: "Ng Wan Yu",
    pocNo: 91079192,
    pocEmail: "testflexiDate@gmail.com",
    dateCreated: new Date("February 23 2005"),
    jobsPosted: [],
  },
};

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

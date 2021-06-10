import React from "react";
import JobBoardCard from "../JobBoardCard";
import styles from "./JobBoard.module.css";
// import { useStore } from "../../../contexts/StoreContext";
// import { getDefaultNormalizer } from "@testing-library/dom";

const JobBoard = () => {
  // const { jobs, loading } = useStore();

  // if (loading) {
  //   return <h1>Loading.....</h1>;
  // }

  const jobs = Object.values(dummyData);
  const orgs = dummyOrgData;

  return (
    <div className={styles.container}>
      <div className={styles.jobContainer}>
        {jobs.map((job) => {
          const orgType = orgs[job.orgID].type;
          const orgName = orgs[job.orgID].name;
          const orgUen = orgs[job.orgID].uen;
          const orgEmail = orgs[job.orgID].email;

          /* const type = "find type with orgID";
          const name = "find name with orgID";
          const uen = "find uen with orgID";
          const email = "find email with orgID"; */

          return (
            <JobBoardCard
              key={job.id}
              id={job.id}
              orgType={orgType}
              orgName={orgName}
              orgUen={orgUen}
              orgEmail={orgEmail}
              status={job.status}
              title={job.title}
              beneficiaries={job.beneficiaries}
              skills={job.skills}
              purpose={job.purpose}
              platform={job.platform}
              multiLocation={job.multiLocation}
              location={job.location}
              postalCode={job.postalCode}
              type={job.type}
              flexiDate={job.flexiDate}
              longStartDate={job.longStartDate}
              longEndDate={job.longEndDate}
              flexiHours={job.flexiHours}
              longHours={job.longHours}
              adShift={job.adShift}
              addInfo={job.addInfo}
              imageUrl={job.imageUrl}
              pocName={job.pocName}
              pocNo={job.pocNo}
              pocEmail={job.pocEmail}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobBoard;

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

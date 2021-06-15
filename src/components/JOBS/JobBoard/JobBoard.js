import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import JobBoardFilter from "../JobBoardFilter";
import JobBoardCard from "../JobBoardCard";
import styles from "./JobBoard.module.css";
import { dummyJobs, dummyOrgs } from "../../DummyData";
import { BeneficiaryTags, SkillTags } from "../../ORG/PostAJob/Data";
import { Formik } from "formik";
// import { useStore } from "../../../contexts/StoreContext";
// import { getDefaultNormalizer } from "@testing-library/dom";

const JobBoard = () => {
  const [filterState, setFilterState] = useState({});

  const jobs = Object.values(dummyJobs);
  const orgs = dummyOrgs;

  // For Formik
  var initialValues = {
    sort: "mostRecent",
    longTerm: true,
    adHoc: true,
    physical: true,
    virtual: true,
  };
  for (var i = 0; i < BeneficiaryTags.length; i++) {
    initialValues[BeneficiaryTags[i]] = true;
  }
  for (var j = 0; j < SkillTags.length; j++) {
    initialValues[SkillTags[j]] = true;
  }

  // filtering

  return (
    <div className={styles.container}>
      <Row>
        <Col md={4} lg={3}>
          <div className={styles.filterContainer}>
            <Formik initialValues={initialValues}>
              {({ values, handleChange, handleBlur }) => (
                <JobBoardFilter
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  BeneficiaryTags={BeneficiaryTags}
                  SkillTags={SkillTags}
                  setFilterState={setFilterState}
                />
              )}
            </Formik>
          </div>
        </Col>
        <Col md={8} lg={9}>
          {jobs.map((job) => {
            const orgType = orgs[job.orgID].type;
            const orgName = orgs[job.orgID].name;
            const orgUen = orgs[job.orgID].uen;
            const orgEmail = orgs[job.orgID].email;

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
        </Col>
      </Row>
    </div>
  );
};

export default JobBoard;

// function getMyLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success);
//   } else {
//     alert("Geolocation not supported");
//   }
// }

// function success(pos) {
//   var crd = pos.coords;
//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   myLat = crd.latitude
//   myLong = crd.longitude
// }

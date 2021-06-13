import React from "react";
import { Row, Col } from "react-bootstrap";
import JobBoardCard from "../JobBoardCard";
import styles from "./JobBoard.module.css";
import { dummyJobs, dummyOrgs } from "../../DummyData";
// import { useStore } from "../../../contexts/StoreContext";
// import { getDefaultNormalizer } from "@testing-library/dom";

const JobBoard = () => {
  // const { jobs, loading } = useStore();

  // if (loading) {
  //   return <h1>Loading.....</h1>;
  // }

  const jobs = Object.values(dummyJobs);
  const orgs = dummyOrgs;

  return (
    <div className={styles.container}>
      <Row>
        <Col md={4} lg={3}>
          <div className={styles.filterContainer}>filter</div>
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

import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import YourJobsCard from "./YourJobsCard";
import YourJobsFilter from "./YourJobsFilter";
import { dummyJobs } from "../../DummyData";
import styles from "./YourJobs.module.css";
import { Formik } from "formik";

const YourJobs = () => {
  const [filterState, setFilterState] = useState({});

  const allJobs = dummyJobs;
  const yourOrgID = "otakuneko23@gmail.com";
  const yourJobs = Object.values(allJobs);
  // const yourJobs = [];

  //filter
  const filteredJobs = yourJobs
    .filter((job) => (!filterState.pending ? job.status !== "Pending" : true))
    .filter((job) => (!filterState.approved ? job.status !== "Approved" : true))
    .filter((job) =>
      !filterState.completed ? job.status !== "Completed" : true
    )
    .filter((job) => (!filterState.rejected ? job.status !== "Rejected" : true))
    .filter((job) =>
      !filterState.takenDown ? job.status !== "TakenDown" : true
    )
    .filter((job) => (!filterState.longTerm ? job.type !== "Long term" : true))
    .filter((job) => (!filterState.adHoc ? job.type !== "Ad hoc" : true))
    .filter((job) =>
      !filterState.physical ? job.platform !== "Physical" : true
    )
    .filter((job) =>
      !filterState.virtual ? job.platform !== "Virtual" : true
    );

  console.log(filterState);
  // for formik
  var initialValues = {
    pending: true,
    approved: true,
    completed: true,
    rejected: true,
    takenDown: true,
    longTerm: true,
    adHoc: true,
    physical: true,
    virtual: true,
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col md={3}>
          <div className={styles.filterContainer}>
            <Formik initialValues={initialValues}>
              {({ values, handleChange, handleBlur }) => (
                <YourJobsFilter
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFilterState={setFilterState}
                />
              )}
            </Formik>
          </div>
        </Col>
        <Col md={9}>
          {filteredJobs.length >= 1 ? (
            filteredJobs.map((job) => (
              <YourJobsCard
                key={job.id}
                id={job.id}
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
                datePosted={job.datePosted}
                applicants={job.applicants}
              />
            ))
          ) : (
            <div className={styles.noJobContainer}>
              <Link to="/post-a-job">
                <h3>Post some jobs</h3>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default YourJobs;

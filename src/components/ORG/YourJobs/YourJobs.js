import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import YourJobsCard from "./YourJobsCard";
import { dummyJobs } from "../../DummyData";
import styles from "./YourJobs.module.css";

const YourJobs = () => {
  const allJobs = dummyJobs;
  const yourOrgID = "otakuneko23@gmail.com";
  // const yourJobs = Object.values(allJobs).filter(
  //   (job) => job.orgID === yourOrgID
  // );
  const yourJobs = Object.values(allJobs);
  // const yourJobs = [];
  if (yourJobs.length >= 1) {
    return (
      <div className={styles.container}>
        <Row>
          <Col md={3}>
            <div className={styles.filter}>filter</div>
          </Col>
          <Col md={9}>
            {yourJobs.map((job) => (
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
            ))}
          </Col>
          {/* <Col lg={2}></Col> */}
        </Row>
      </div>
    );
  } else {
    return (
      <div className={styles.noJobContainer}>
        <Link to="/post-a-job">
          <h3>Post some jobs</h3>
        </Link>
      </div>
    );
  }
};

export default YourJobs;

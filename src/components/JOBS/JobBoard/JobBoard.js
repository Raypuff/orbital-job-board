import React from "react";
import JobBoardCard from "../JobBoardCard";
import styles from "./JobBoard.module.css";
import { useStore } from "../../../contexts/StoreContext";

const JobBoard = () => {
  const { jobs, loading } = useStore();

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.jobContainer}>
        {jobs.map((job) => {
          const type = "find type with orgID";
          const name = "find name with orgID";
          const uen = "find uen with orgID";
          const email = "find email with orgID";
          return (
            <JobBoardCard
              id={job.id}
              type={type}
              name={name}
              uen={uen}
              email={email}
              status={job.status}
              title={job.title}
              purpose={job.purpose}
              beneficiary={job.beneficiary}
              skillsReq={jobs.skillsReq}
              duration={jobs.duration}
              addInfo={jobs.addInfo}
              pocName={jobs.pocName}
              pocNo={jobs.pocNo}
              pocEmail={jobs.pocEmail}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobBoard;

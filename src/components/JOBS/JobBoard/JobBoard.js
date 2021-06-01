import React from "react";
import JobCard from "../JobCard";
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
        {jobs.map((job) => (
          <JobCard
            id={job.job_title}
            title={job.job_title}
            org_name={job.organization_name}
            beneficiary={job.target_beneficiary}
            duration={job.duration}
            writeup={job.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default JobBoard;

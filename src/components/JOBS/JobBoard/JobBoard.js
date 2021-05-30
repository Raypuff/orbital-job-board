import React, { useState, useEffect } from "react";
import JobCard from "../JobCard";
import styles from "./JobBoard.module.css";
import app from "../../../firebase";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = app.firestore().collection("jobs");

  function getJobs() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setJobs(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getJobs();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
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
  );
};

export default JobBoard;

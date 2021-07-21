import React, { useContext, useEffect, useState } from "react";

const JobContext = React.createContext();

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [jobLoading, setJobLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  /**
   * Used in AllJobs.js component
   * @param {useState function} setJobs
   * @returns {null}
   */
  async function getAllJobs(setJobs) {
    setJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/"
      );
      const jsonData = await response.json();
      setJobs(jsonData);
    } catch (err) {
      console.error(err);
    }
    setJobLoading(false);
  }

  async function getOrgPublic(id) {
    try {
      const orgDataRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/public/${id}`
      );
      const orgData = await orgDataRes.json();
      return orgData;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Used in JobBoard.js component
   * @param {useState function} setJobs
   * @returns {null}
   */

  async function getAllApprovedJobs(setJobs) {
    setJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/approved"
      );
      const jsonData = await response.json();
      setJobs(jsonData.filter((job) => job.status === "Approved"));
    } catch (err) {
      console.error(err);
    }
    setJobLoading(false);
  }

  async function getJobDetails(id) {
    try {
      const jobData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/${id}`
      );
      const job = await jobData.json();
      return job;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getAllJobs,
    getOrgPublic,
    getAllApprovedJobs,
    getJobDetails,
    jobLoading,
    appLoading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

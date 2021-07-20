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

  /**
   * Used in JobBoard.js component
   * @param {useState function} setJobs
   * @returns {null}
   */

  async function getAllApprovedJobs(setJobs) {
    setJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/"
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

  /**
   * Used in YourJobs.js component
   * @param {useState function to setJobs array} setJobs
   * @param {Object storing information of current user} currentUser
   */
  async function getYourJobs(setJobs, currentUser) {
    setJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/jobs/organization/" +
          currentUser.email
      );
      const jsonData = await response.json();
      setJobs(jsonData);
    } catch (err) {
      console.error(err);
    }
    setJobLoading(false);
  }

  /**
   *
   * @param {useState function to setApps} setApps
   * //Gets all applications and sets the useState
   */
  async function getAllApps(setApps) {
    setJobLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/`
      );
      const jsonData = await response.json();
      setApps(jsonData);
    } catch (err) {
      console.error(err);
    }
    setJobLoading(false);
  }

  /**
   *
   * @param {useState function to setApps} setApps
   * @param {Object containing information of current user} currentUser
   * //Gets applications of current student and sets the useState
   */
  async function getYourApps(setApps, currentUser) {
    setJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/job-applications/student/" +
          currentUser.email
      );
      const jsonData = await response.json();
      setApps(jsonData);
    } catch (err) {
      console.error(err);
    }
    setJobLoading(false);
  }

  /**
   * Used in PostAJob.js component
   * @param {Object containing Job Details of new Job} newJob
   * @param {Information of the currently logged in user} currentUser
   * //Posts a job to backend database
   */
  async function PostAJob(newJob, currentUser) {
    const body = { newJob };
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/organization-accounts/job/" +
          currentUser.email,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newJobID: newJob.id }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * @param {String representing the id of the job} jobId
   * @returns {Object storing job information in job}
   */
  async function getAppsByJob(jobId) {
    try {
      const appData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/job/${jobId}`
      );
      const appByJob = await appData.json();
      return appByJob;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getAllJobs,
    getAllApprovedJobs,
    PostAJob,
    getYourJobs,
    getJobDetails,
    getAllApps,
    getYourApps,
    getAppsByJob,
    jobLoading,
    appLoading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

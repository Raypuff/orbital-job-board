import React, { useContext, useEffect, useState } from "react";

const JobContext = React.createContext();

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [getJobLoading, setGetJobLoading] = useState(false);

  /**
   * Used in AllJobs.js component and JobBoard.js component
   * @param {useState function} setJobs
   * @returns {null}
   */
  async function getAllJobs(setJobs) {
    setGetJobLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/"
      );
      const jsonData = await response.json();
      setJobs(jsonData);
    } catch (err) {
      console.error(err);
    }
    setGetJobLoading(false);
  }

  /**
   * Used in YourJobs.js component
   * @param {useState function to setJobs array} setJobs
   * @param {Object storing information of current user} currentUser
   */
  async function getYourJobs(setJobs, currentUser) {
    setGetJobLoading(true);
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
    setGetJobLoading(false);
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

  const value = {
    getAllJobs,
    PostAJob,
    getYourJobs,
    getJobLoading,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

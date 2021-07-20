import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const OrgContext = React.createContext();

export function useOrg() {
  return useContext(OrgContext);
}

export function OrgProvider({ children }) {
  const { token } = useAuth();

  async function getOrgInfo(id) {
    try {
      const orgData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const orgInfo = await orgData.json();
      return orgInfo;
    } catch (err) {
      console.log(err);
    }
  }

  async function getYourJobs(id) {
    try {
      const yourJobData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/organization/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const yourJobs = yourJobData.json();
      return yourJobs;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateOrgAccount(email, updated) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );
    } catch (err) {
      console.log(err);
    }
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
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/organization-accounts/job/" +
          currentUser.email,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newJobID: newJob.id }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function getAppsOfJob(jobId) {
    try {
      const appsData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/job/${jobId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const apps = appsData.json();
      return apps;
    } catch (err) {
      console.log(err);
    }
  }

  async function setJobAsComplete(jobId) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/status-complete/${jobId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function acceptRejectApplication(appId, choice) {
    const body = { status: choice };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/status/${appId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function editAJob(jobId, editJob) {
    const body = { editJob: editJob };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/edit/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getOrgInfo,
    updateOrgAccount,
    PostAJob,
    getYourJobs,
    getAppsOfJob,
    setJobAsComplete,
    acceptRejectApplication,
    editAJob,
  };

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

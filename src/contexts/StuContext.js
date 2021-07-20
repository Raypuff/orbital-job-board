import React, { useContext, useEffect, useState } from "react";
import { BeneficiaryTags, SkillTags } from "../Constants";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";

const StuContext = React.createContext();

export function useStu() {
  return useContext(StuContext);
}

export function StuProvider({ children }) {
  const { token } = useAuth();

  async function getStudent(email) {
    try {
      const studentData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts/${email}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const student = await studentData.json();
      return student;
    } catch (err) {
      console.error(err);
    }
  }

  async function getSubscriptions(email) {
    try {
      const subscriptionData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts/subscriptions/${email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      const subscriptionsObject = await subscriptionData.json();
      const subscriptions = subscriptionsObject.subscriptions;
      console.log(subscriptions);

      let subs = {};
      if (subscriptions) {
        for (let i = 0; i < BeneficiaryTags.length; i++) {
          if (subscriptions.includes(BeneficiaryTags[i])) {
            subs[BeneficiaryTags[i]] = true;
          } else {
            subs[BeneficiaryTags[i]] = false;
          }
        }
        for (let j = 0; j < SkillTags.length; j++) {
          if (subscriptions.includes(SkillTags[j])) {
            subs[SkillTags[j]] = true;
          } else {
            subs[SkillTags[j]] = false;
          }
        }
      }
      console.log("Printing subs");
      console.log(subs);
      return subs;
    } catch (err) {
      console.error(err);
    }
  }

  async function updateSubscriptions(email, subscriptions, unsubscriptions) {
    const body = {
      subscriptions,
      unsubscriptions,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts/update-subscriptions/${email}`,
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
      console.error(err);
    }
  }

  async function updateStudentAccount(email, updated) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts/${email}`,
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

  async function applyForJob(jobId, email, newApp) {
    const updateApplicants = {
      student_id: email,
    };
    const updateApplied = {
      jobID: jobId,
    };
    try {
      await fetch(process.env.REACT_APP_BACKEND_URL + "/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify(newApp),
      });

      await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs/apply/" + jobId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify(updateApplicants),
      });

      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/student-accounts/apply-job/" +
          email,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateApplied),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function getAppForJob(jobId, email) {
    try {
      const myAppData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/job/${jobId}/student/${email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const myApp = await myAppData.json();
      return myApp;
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getStudent,
    getSubscriptions,
    updateSubscriptions,
    updateStudentAccount,
    applyForJob,
    getAppForJob,
  };

  return <StuContext.Provider value={value}>{children}</StuContext.Provider>;
}

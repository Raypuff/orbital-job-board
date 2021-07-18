import React, { useContext, useState } from "react";
import { BeneficiaryTags, SkillTags } from "../Constants";

const StuContext = React.createContext();

export function useStu() {
  return useContext(StuContext);
}

export function StuProvider({ children }) {
  const [stuLoading, setStuLoading] = useState(false);

  async function getStudent(email) {
    setStuLoading(true);
    try {
      const studentData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts/${email}`
      );
      const student = await studentData.json();
      return student;
    } catch (err) {
      console.error(err);
    }
  }

  async function getSubscriptions(email) {
    setStuLoading(true);
    try {
      const subscriptionData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/subscriptions/${email}`
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
    setStuLoading(false);
  }

  async function updateSubscriptions(email, subscriptions, unsubscriptions) {
    setStuLoading(true);
    const body = {
      subscriptions,
      unsubscriptions,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/subscriptions/update-subscriptions/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
    } catch (err) {
      console.error(err);
    }
    setStuLoading(false);
  }

  const value = { getStudent, getSubscriptions, updateSubscriptions };

  return <StuContext.Provider value={value}>{children}</StuContext.Provider>;
}

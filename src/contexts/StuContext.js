import React, { useContext, useState } from "react";

const StuContext = React.createContext();

export function useStu() {
  return useContext(StuContext);
}

export function StuProvider({ children }) {
  const [stuLoading, setStuLoading] = useState(false);

  async function getSubscriptions(email) {
    setStuLoading(true);
    try {
      const subscriptionData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/subscriptions/${email}`
      );
      const subscriptions = await subscriptionData.json();
      return subscriptions;
    } catch (err) {
      console.error(err);
    }
    setStuLoading(false);
  }

  const value = { getSubscriptions };

  return <StuContext.Provider value={value}>{children}</StuContext.Provider>;
}

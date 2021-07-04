import React, { useContext, useEffect, useState } from "react";

const JobContext = React.createContext();

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }) {
  const [loading, setLoading] = useState(false);

  async function getAllJobs(setJobs) {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/jobs/"
      );
      const jsonData = await response.json();
      setJobs(jsonData);
    } catch (err) {
      console.error(err);
    }
  }

  const value = { getAllJobs };

  return (
    <JobContext.Provider value={value}>
      {!loading && children}
    </JobContext.Provider>
  );
}

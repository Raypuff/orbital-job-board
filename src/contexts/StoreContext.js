import React, { useContext, useEffect, useState } from "react";
import { store } from "../firebase";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setWork] = useState([]);

  const ref = store.collection("jobs");

  function getJobs() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setWork(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getJobs();
  }, []);

  // ADD FUNCTION
  function addJob(newJob) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc()
      .set(newJob)
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteJob(job) {
    ref
      .doc(job.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editJob(updatedJob) {
    setLoading();
    ref
      .doc(updatedJob.id)
      .update(updatedJob)
      .catch((err) => {
        console.error(err);
      });
  }

  const value = {
    loading,
    jobs,
    addJob,
    deleteJob,
    editJob,
    getJobs,
  };

  return (
    <StoreContext.Provider value={value}>
      {!loading && children}
    </StoreContext.Provider>
  );
}

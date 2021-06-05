import React, { useContext, useEffect, useState } from "react";
import { store } from "../firebase";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  //GET FUNCTION FOR JOB BOARD - FIGURE OUT HOW TO MAKE IT MODULAR IN THE FUTURE
  function getJobs() {
    const ref = store.collection("jobs");
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

  // ADD FUNCTION
  function addItem(itemToAdd, collectionType, itemID) {
    const ref = store.collection(collectionType);

    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(itemID)
      .set(itemToAdd)
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteItem(itemToDelete, collectionType) {
    const ref = store.collection(collectionType);

    ref
      .doc(itemToDelete.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editItem(itemToEdit, itemToEditID, collectionType) {
    const ref = store.collection(collectionType);
    ref
      .doc(itemToEditID)
      .update(itemToEdit)
      .catch((err) => {
        console.error(err);
      });
  }

  const value = {
    loading,
    jobs,
    addItem,
    deleteItem,
    editItem,
    getJobs,
  };

  return (
    <StoreContext.Provider value={value}>
      {!loading && children}
    </StoreContext.Provider>
  );
}

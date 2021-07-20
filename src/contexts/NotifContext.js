import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

var uniqid = require("uniqid");

const NotifContext = React.createContext();

export function useNotif() {
  return useContext(NotifContext);
}

export function NotifProvider({ children }) {
  const { token } = useAuth();

  async function dismissNotif(notifId) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notifications/dismiss/${notifId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: null,
        }
      );
    } catch (err) {}
  }

  async function dismissAllNotifs(userId) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notifications/dismissAll/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function sendNotif(newNotif) {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNotif),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const value = { sendNotif, dismissNotif, dismissAllNotifs };

  return (
    <NotifContext.Provider value={value}>{children}</NotifContext.Provider>
  );
}

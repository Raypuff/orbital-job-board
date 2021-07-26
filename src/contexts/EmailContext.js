import React, { useContext } from "react";
import { useAuth } from "./AuthContext";

const EmailContext = React.createContext();

export function useEmail() {
  return useContext(EmailContext);
}

export function EmailProvider({ children }) {
  const { token } = useAuth();

  async function sendEmail(msg) {
    const message = { msg: msg };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
    } catch (err) {
      console.error(err);
    }
  }

  const value = { sendEmail };
  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
}

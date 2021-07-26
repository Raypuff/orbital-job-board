import React, { useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const EmailContext = React.createContext();

export function useEmail() {
  return useContext(EmailContext);
}

export function EmailProvider({ children }) {
  const { token } = useAuth();

  async function sendEmail(orgEmail, subject, text, html) {
    const msg = {
      to: orgEmail,
      from: "volunteerccsgp@gmail.com",
      text: text,
      html: html,
      subject: subject,
      isMultiple: false,
    };

    try {
      await fetch(`http://localhost:5000/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(msg),
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

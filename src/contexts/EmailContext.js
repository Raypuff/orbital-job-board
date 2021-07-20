import React, { useContext, useState } from "react";

const EmailContext = React.createContext();

export function useEmail() {
  return useContext(EmailContext);
}

export function EmailProvider({ children }) {
  async function sendEmail(to, subject, text, html) {
    const msg = {
      msg: {
        to: to,
        from: "volunteerccsgp@gmail.com",
        subject: subject,
        text: text,
        html: html,
      },
    };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

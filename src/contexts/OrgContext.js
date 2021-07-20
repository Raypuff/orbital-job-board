import React, { useContext, useEffect, useState } from "react";

const OrgContext = React.createContext();

export function useOrg() {
  return useContext(OrgContext);
}

export function OrgProvider({ children }) {
  async function getOrgInfo(id) {
    try {
      const orgData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/${id}`
      );
      const orgInfo = await orgData.json();
      return orgInfo;
    } catch (err) {
      console.log(err);
    }
  }

  const value = { getOrgInfo };

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

import React, { useContext, useEffect, useState } from "react";

const AdminContext = React.createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  async function postNewAdmin(email, type) {
    const body = {
      id: email,
      email: email,
      type: type,
    };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin-accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getCurrentAdmin(email) {
    try {
      const currentAdminData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts/${email}`
      );
      const currentAdmin = await currentAdminData.json();
      return currentAdmin;
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllAdmins() {
    try {
      const adminData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts`
      );
      const admins = await adminData.json();
      return admins;
    } catch (err) {
      console.log(err);
    }
  }

  async function changeAdminStatus(email, status) {
    const body = { type: status };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts/change-type/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updateAdminAccount(email, updated) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getCurrentAdmin,
    getAllAdmins,
    changeAdminStatus,
    postNewAdmin,
    updateAdminAccount,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

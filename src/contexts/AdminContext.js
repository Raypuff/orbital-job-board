import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { store } from "../firebase";

const AdminContext = React.createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const { token, currentUser } = useAuth();

  async function postNewAdmin(email, password, type) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/firebase/create-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email,
            password: password,
            id: email,
            type: type,
          }),
        }
      );

      const ref = store.collection("accounts");
      const accountObject = { type: "admin" };
      ref
        .doc(email)
        .set(accountObject)
        .catch((err) => {
          console.error(err);
        });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAdmin(email) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/firebase/delete-admin`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const ref = store.collection("accounts");
      ref
        .doc(email)
        .delete()
        .catch((err) => console.error(err));
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCurrentAdmin(email) {
    try {
      const currentAdminData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts/${email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
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
        `${process.env.REACT_APP_BACKEND_URL}/admin-accounts`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
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
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
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
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updated),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllStudents() {
    try {
      const studentData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/student-accounts`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const students = await studentData.json();
      return students;
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllOrganizations() {
    try {
      const orgData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const orgs = await orgData.json();
      return orgs;
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllApps() {
    try {
      const appData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const apps = await appData.json();
      return apps;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateJobStatus(jobId, choice, reason) {
    const body = {
      status: choice,
      removalPerson: currentUser.email,
      removalDate: new Date().toUTCString(),
      removalReason: reason,
    };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/status/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function alertSubscribers(beneficiaries, skills, title) {
    const body = {
      tags: beneficiaries.concat(skills),
      subject: `[Volunteer CCSGP] New job posting: ${title}`,
      text: `Please check your account for a new job posting that you have subscribed to`,
      html: `Please check your account for a new job posting that you have subscribed to`,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/subscriptions/alert-subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
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
    deleteAdmin,
    updateAdminAccount,
    getAllStudents,
    getAllOrganizations,
    getAllApps,
    updateJobStatus,
    alertSubscribers,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

import React, { useContext } from "react";
import { useAuth } from "./AuthContext";

import noAvatar from "../assets/emptyStates/noAvatar.png";

const OrgContext = React.createContext();

export function useOrg() {
  return useContext(OrgContext);
}

export function OrgProvider({ children }) {
  const { token } = useAuth();

  async function getOrgInfo(id) {
    try {
      const orgData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const orgInfo = await orgData.json();
      return orgInfo;
    } catch (err) {
      console.log(err);
    }
  }

  async function getYourJobs(id) {
    try {
      const yourJobData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/organization/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const yourJobs = yourJobData.json();
      return yourJobs;
    } catch (err) {
      console.log(err);
    }
  }

  async function updateOrgAccount(email, updated) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/organization-accounts/${email}`,
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

  /**
   * Used in PostAJob.js component
   * @param {Object containing Job Details of new Job} newJob
   * @param {Information of the currently logged in user} currentUser
   * //Posts a job to backend database
   */
  async function PostAJob(newJob, currentUser) {
    const body = { newJob };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/organization-accounts/job/" +
          currentUser.email,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newJobID: newJob.id }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function getAppsOfJob(jobId) {
    try {
      const appsData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/job/${jobId}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      const apps = appsData.json();
      return apps;
    } catch (err) {
      console.log(err);
    }
  }

  async function setJobAsComplete(jobId) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/jobs/status-complete/${jobId}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function acceptRejectApplication(appId, choice) {
    const body = { status: choice };
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/job-applications/status/${appId}`,
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

  async function editAJob(jobId, editJob) {
    const body = { editJob: editJob };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/edit/${jobId}`, {
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

  async function getOrgChats(id) {
    try {
      const orgChatData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/all-chats/organization/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const orgChats = await orgChatData.json();
      var processedChats = orgChats;
      processedChats.forEach((chat) => {
        chat.date = new Date(chat.date);
      });
      processedChats.forEach((chat) => {
        if (id === chat.fromID) {
          chat.subtitle = `You: ${chat.subtitle}`;
        }
      });
      processedChats.forEach((chat) => {
        if (!chat.avatar) {
          chat.avatar = noAvatar;
        }
      });
      processedChats.forEach((chat) => {
        if (!(chat.title && chat.title.length > 0)) {
          chat.title = "<No name>";
        }
      });
      return processedChats;
    } catch (err) {
      console.log(err);
    }
  }

  async function getOrgMessages(currentChat, myId) {
    try {
      const messagesData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/messages/${currentChat}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      const messages = await messagesData.json();
      var processedMessages = [...messages];
      processedMessages.forEach((msg) => {
        msg.date = new Date(msg.date);
      });
      processedMessages.forEach((msg) => {
        if (myId === msg.fromID) {
          msg.position = "right";
        } else {
          msg.position = "left";
        }
      });
      return processedMessages;
    } catch (err) {
      console.log(err);
    }
  }

  async function postMessage(currentChatID, backendMessage) {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/${currentChatID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(backendMessage),
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getOrgInfo,
    updateOrgAccount,
    PostAJob,
    getYourJobs,
    getAppsOfJob,
    setJobAsComplete,
    acceptRejectApplication,
    editAJob,
    getOrgChats,
    getOrgMessages,
    postMessage,
  };

  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
}

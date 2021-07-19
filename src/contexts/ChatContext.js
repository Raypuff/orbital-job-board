import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
var uniqid = require("uniqid");

const ChatContext = React.createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const history = useHistory();
  const [chatLoading, setChatLoading] = useState(false);
  async function checkIfExists(stuID, orgID) {
    try {
      const alreadyExistsData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/already-exists/${stuID}&${orgID}`
      );
      const alreadyExists = await alreadyExistsData.json();
      return alreadyExists;
    } catch (err) {
      console.log(err);
    }
  }

  async function createChats(stuID, orgID) {
    try {
      setChatLoading(true);
      const body = {
        id: uniqid(),
        stuAvatar: "",
        orgAvatar: "",
        alt: "Avatar",
        stuID: stuID,
        orgID: orgID,
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const created = await response.json();
      console.log(created);
      if (created !== "New chat created") {
        throw new Error("Could not create chat due to internal error");
      }
      setChatLoading(false);
      history.push("/chat-student");
    } catch (err) {
      console.log(err);
    }
  }

  async function getOrgChats(userID) {
    try {
      setChatLoading(true);
      const chatData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/all-chats/organization/${userID}`
      );
      const retrievedChats = await chatData.json();

      var processedChats = retrievedChats;
      processedChats.forEach((chat) => {
        chat.date = new Date(chat.date);
        chat.avatar = chat.stuAvatar;
        if (userID === chat.fromID) {
          chat.subtitle = `You: ${chat.subtitle}`;
        }
      });
      setChatLoading(false);
      return processedChats;
    } catch (err) {
      console.log(err);
    }
  }

  async function getOrgMessages(userID, currentChat) {
    try {
      const messagesData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/messages/${currentChat}`
      );
      const messages = await messagesData.json();

      var processedMessages = [...messages];
      processedMessages.forEach((msg) => {
        msg.date = new Date(msg.date);
        if (userID === msg.fromID) {
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

  async function postMessage(backendMessage, chatID) {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendMessage),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    checkIfExists,
    createChats,
    chatLoading,
    getOrgChats,
    getOrgMessages,
    postMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

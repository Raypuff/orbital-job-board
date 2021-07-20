import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
var uniqid = require("uniqid");

const ChatContext = React.createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  /**
   * Used in ChatStu
   * @param {ID of student} id
   */
  async function getStudentChats(id) {
    try {
      const stuChatData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/all-chats/student/${id}`
      );
      const stuChats = await stuChatData.json();
      var processedStuChat = stuChats;
      processedStuChat.forEach((chat) => {
        chat.date = new Date(chat.date);
      });
      processedStuChat.forEach((chat) => {
        if (id === chat.fromID) {
          chat.subtitle = `You: ${chat.subtitle}`;
        }
        processedStuChat.forEach((chat) => {
          if (!(chat.title && chat.title.length > 0)) {
            chat.title = "<No name>";
          }
        });
        return processedStuChat;
      });
    } catch (err) {
      console.log(err);
    }
  }

  const value = { getStudentChats };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

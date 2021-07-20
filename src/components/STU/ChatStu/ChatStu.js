//IMPORTS
//React Hooks
import { useState, useEffect, useRef } from "react";
//Bootstrap
import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
//Auth Contexts
import { useAuth } from "../../../contexts/AuthContext";
import { useStu } from "../../../contexts/StuContext";
//React Chat Elements
import { ChatList, MessageList } from "react-chat-elements";
//Components
import { Loading, Empty, SystemMessage } from "../../EmptyStates/EmptyStates";
//Images
import noAvatar from "../../../assets/emptyStates/noAvatar.png";
//CSS Modules
import styles from "./ChatStu.module.css";
//Unique ID
var uniqid = require("uniqid");

const ChatStu = () => {
  //USESTATES
  //Current chat indicates the current open chat
  const [currentChat, setCurrentChat] = useState("");
  //Chats store all chats
  const [chats, setChats] = useState([]);
  //CurrentMessages stores messages of current open chat
  const [currentMessages, setCurrentMessages] = useState({});
  //Indicate if the chat is loading
  const [loadingChats, setLoadingChats] = useState(true);
  //Only used in mobile - Show messages when true and chats when false
  const [mobileViewMessages, setMobileViewMessages] = useState(false);
  //Search acts as a filter for chats
  const [search, setSearch] = useState("");

  //UseStates to be toggled back and forth to repeatedly call the useEffect to check for new messages
  const [chatUpdater, setChatUpdater] = useState(true);
  const [messageUpdater, setMessageUpdater] = useState(true);

  //CUSTOM HOOKS
  //Current user details from auth context
  const { currentUser } = useAuth();
  const { getStuChats, getStuMessages, postMessage } = useStu();
  //Retrieve window dimensions
  const { width } = useWindowDimensions();
  //Refs for retrieving new message and scrolling to bottom
  const newMessageRef = useRef();
  const messageBottomRef = useRef();

  //API CALL FUNCTIONS
  //Fetching Chats

  const getChats = async () => {
    const allChats = await getStuChats(currentUser.email);
    if (loadingChats) {
      setLoadingChats(false);
    }
    setChats(allChats);
    setChatUpdater(!chatUpdater);
  };

  const scrollToBottom = () => {
    messageBottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  //Fetching Messages
  const getMessages = async () => {
    const processedMessages = await getStuMessages(
      currentChat,
      currentUser.email
    );
    //if the currentChat doesn't exist or there are new updates, update current messages
    if (
      !currentMessages[currentChat] ||
      (currentMessages[currentChat] &&
        currentMessages[currentChat].length !== processedMessages.length)
    ) {
      setCurrentMessages({
        ...currentMessages,
        [currentChat]: processedMessages,
      });
      scrollToBottom();
    }
    setMessageUpdater(!messageUpdater);
  };

  //USEEFFECTS
  //Chats are always being fetched and compared
  useEffect(() => {
    getChats();
  });
  //Messages are always being fetched and compared
  useEffect(() => {
    if (currentChat) {
      getMessages();
    }
  });

  //FUNCTIONS
  //Scroll to the bottom of the messages
  const handleSubmit = async (event) => {
    event.preventDefault();
    scrollToBottom();
    const newMessageID = uniqid();
    const currentChatID = currentChat;
    const newMessage = newMessageRef.current.value;
    const newDate = new Date();
    event.target.reset();
    const backendMessage = {
      id: newMessageID,
      chatID: currentChatID,
      fromID: currentUser.email,
      type: "text",
      text: newMessage,
      date: newDate.toUTCString(),
    };
    //Update the chat where chat.id === currentChat to have chat.lastDateTime = newMessage.dateTime and chat.lastContent = newMessage.message and unread +=1
    chats.forEach((chat) => {
      if (chat.id === currentChatID) {
        chat.subtitle = `You: ${newMessage}`;
        chat.date = newDate;
      }
    });

    try {
      await postMessage(currentChatID, backendMessage);
    } catch (err) {
      console.error(err);
    }
    console.log("Successfully sent chat");
  };

  //LOADING
  if (loadingChats) {
    return <Loading>Loading your chats...</Loading>;
  }

  if (chats && chats.length > 0) {
    return (
      <div className={styles.container}>
        <Row>
          <Col
            lg={4}
            className={
              !mobileViewMessages ? styles.chatCol : styles.chatColMobile
            }
          >
            <div className={styles.searchContainer}>
              <div className={styles.searchHeader}>Chats</div>
              <Form.Control
                size="sm"
                placeholder="Search..."
                className={styles.searchbar}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Card className={styles.chatContainer}>
              <ChatList
                className="chat-list"
                dataSource={chats
                  .sort((chat1, chat2) => chat2.date - chat1.date)
                  .filter(
                    (chat) =>
                      chat &&
                      chat.title &&
                      chat.title.toLowerCase().includes(search.toLowerCase())
                  )}
                onClick={(chat) => {
                  setCurrentChat(chat.id);
                  getMessages();
                  if (width < 992) {
                    setMobileViewMessages(true);
                  }
                }}
              />
            </Card>
          </Col>
          <Col
            lg={8}
            className={
              !mobileViewMessages ? styles.messageCol : styles.messageColMobile
            }
          >
            <div className={styles.messageHeader}>
              {mobileViewMessages && (
                <ArrowLeft onClick={() => setMobileViewMessages(false)} />
              )}
              {chats && currentChat
                ? `${chats.find((chat) => chat.id === currentChat).title} (${
                    chats.find((chat) => chat.id === currentChat).orgID
                  })`
                : ""}
            </div>
            <Card
              className={
                !!currentChat
                  ? styles.messageContainer
                  : styles.noMessageContainer
              }
            >
              {!currentChat ? (
                <SystemMessage>Select a chat to start messaging</SystemMessage>
              ) : currentChat ? (
                currentMessages[currentChat] &&
                currentMessages[currentChat].length === 0 ? (
                  <SystemMessage>
                    You have no messages with this organization yet. If you have
                    a question, send one now!
                  </SystemMessage>
                ) : currentMessages[currentChat] ? (
                  <>
                    <MessageList
                      className="message-list"
                      dataSource={currentMessages[currentChat].sort(
                        (msg1, msg2) => msg1.date - msg2.date
                      )}
                    />
                    <div ref={messageBottomRef} />
                  </>
                ) : (
                  <div className={styles.loadingMessages}>
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="sr-only">Loading messages...</span>
                    </Spinner>
                  </div>
                )
              ) : (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <div className="bg-white text-primary px-4 py-2 mb-4 rounded-pill text-center">
                    This is a state I was not prepared for
                  </div>
                </div>
              )}
            </Card>
            <Form onSubmit={handleSubmit}>
              <div
                className={currentChat ? styles.formRow : styles.displayNone}
              >
                <Form.Control
                  placeholder="Write a message..."
                  ref={newMessageRef}
                  required
                />
                <Button type="submit">
                  {/* <Telegram style={{ color: "white" }} /> */}
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        )
      </div>
    );
  } else {
    //NO CHATS
    return (
      <Empty
        title={"You do not have any chats yet"}
        actions={[
          {
            tip: "If you would like to ask an organization a question, click the 'Chat now' button on the 'Learn more' page",
            button: "Job Board",
            link: "/jobs",
          },
        ]}
      />
    );
  }
};

export default ChatStu;

//CUSTOM HOOK TO GET WINDOW DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

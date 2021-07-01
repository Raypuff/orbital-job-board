import { useState, useEffect, useRef } from "react";
import ChatStuChat from "./ChatStuChat";
import ChatStuMessage from "./ChatStuMessage";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Telegram } from "react-bootstrap-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { ChatItem, MessageList } from "react-chat-elements";
import styles from "./ChatStu.module.css";
import image from "../../../assets/noImage.png";
var uniqid = require("uniqid");

const ChatStu = () => {
	const { currentUser } = useAuth();
	const [currentChat, setCurrentChat] = useState(); //currentChat is the ID of the current open chat
	const [chats, setChats] = useState(dummyChats); //chats store all MY chats
	const [currentMessages, setCurrentMessages] = useState(dummyMessages); //currentMessages store all messages of current chat
	const [loadingChats, setLoadingChats] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const newMessageRef = useRef();

	//fetch chats where chat.stuID === currentUser.email
	//fetch messages where message.id === currentChat (set loadingMessages true then false), call everytime currentChat changes, if message.status === "Sent", update to "Read"

	const handleSubmit = (event) => {
		event.preventDefault();
		const newMessageID = uniqid();
		const newMessage = {
			id: newMessageID,
			chatID: currentChat,
			fromID: currentUser.email,
			// toID: currentOrgID, //do we need this??
			message: newMessageRef.current.value,
			dateTime: new Date().toUTCString(),
		};

		//push shit here
		setCurrentMessages(currentMessages.concat([newMessage]));
		//push new message into messages
		//update the chat where chat.id === currentChat to have chat.lastDateTime = newMessage.dateTime and chat.lastContent = newMessage.message

		newMessageRef.current.value = "";
	};

	// if (loadingChats) {
	// 	return <div>im loading!</div>
	// }

	return (
		<div className={styles.container}>
			{chats && chats.length > 0 ? (
				<Row>
					<Col lg={4} className={styles.chatCol}>
						<Card className={styles.chatContainer}>
							{chats.map((chat) => (
								<ChatItem
									avatar={image}
									alt="placeholder"
									title={chat.orgName}
									subtitle={chat.lastContent}
									date={new Date(chat.lastDateTime)}
									unread={5}
									onClick={() => setCurrentChat(chat.id)}
								/>
							))}
						</Card>
					</Col>
					<Col lg={8} className={styles.messageCol}>
						<Card
							className={
								currentChat
									? styles.messageContainer
									: styles.noMessageContainer
							}
						>
							{!currentChat ? (
								<div>select a msg lol</div>
							) : currentChat && loadingMessages ? (
								<div>loading messages lol</div>
							) : currentChat && currentMessages ? (
								currentMessages.length === 0 ? (
									<div>send a msg or smth!!</div>
								) : (
									currentMessages
										.filter((msg) => msg.chatID === currentChat)
										.sort((msg1, msg2) => {
											return new Date(msg1.dateTime) - new Date(msg2.dateTime);
										})
										.map((msg) => (
											<ChatStuMessage
												key={msg.id}
												id={msg.id}
												chatID={msg.chatID}
												fromID={msg.fromID}
												toID={msg.toID}
												message={msg.message}
												dateTime={msg.dateTime}
											/>
										))
								)
							) : (
								<div>this is a state i was not prepared for</div>
							)}
						</Card>
						<Form onSubmit={handleSubmit}>
							<div
								className={currentChat ? styles.formRow : styles.displayNone}
							>
								<Form.Control ref={newMessageRef} />
								<Button type="submit">
									<Telegram style={{ color: "white" }} />
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			) : (
				<div> u got no chats lol</div>
			)}
		</div>
	);
};

export default ChatStu;

const databaseChat = {
	id: "1",
	stuAvatar: "url",
	orgAvatar: "url",
	alt: "avatar",
	stuID: "",
	orgID: "",
	//stuTitle: "", //fetch student_account.name where student_account.ID === stuID
	//orgTitle: "", //fetch organization_account.name where organization_account.ID === orgID
	subtitle: "lastMessage", //if fromID === currentUser.email ? "You:" : ""
	fromID: "", //who the last message is from
	date: "lastDate",
	unread: "", //+=1 everytime a new message is sent
};

const frontendChat = {
	id: "1",
	avatar: "url",
	alt: "avatar",
	stuID: "",
	orgID: "",
	title: "",
	subtitle: "lastMessage", //if fromID === currentUser.email ? "You:" : ""
	fromID: "", //who the last message is from
	date: "lastDate",
	unread: "", //+=1 everytime a new message is sent
};

const databaseMessage = {
	id: "1",
	chatID: "1",
	//position: "", //fromID === currentUser.email ? "right" : "left"
	fromID: "", //sender's ID
	type: "text",
	text: "message",
	date: "", //new Date().toGMTString() (tentatively)
};

const frontendMessage = {
	id: "1",
	chatID: "1",
	position: "", //fromID === currentUser.email ? "right" : "left"
	fromID: "", //sender's ID
	type: "text",
	text: "message",
	date: "", //new Date().toGMTString() (tentatively)
};

const dummyChats = [];

const dummyMessages = [];

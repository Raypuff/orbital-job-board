import { useState, useEffect, useRef } from "react";
import ChatStuChat from "./ChatStuChat";
import ChatStuMessage from "./ChatStuMessage";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Telegram } from "react-bootstrap-icons";
import { useAuth } from "../../../contexts/AuthContext";
import {
	ChatList,
	MessageList,
	Input as ChatInput,
	Button as ChatButton,
} from "react-chat-elements";
import {
	LoadingChats,
	NoChats,
	LoadingMessages,
	SelectMessage,
	NoMessage,
} from "./EmptyStates";
import styles from "./ChatStu.module.css";
import image from "../../../assets/noImage.png";
var uniqid = require("uniqid");

const ChatStu = () => {
	const { currentUser } = useAuth();
	const [currentChat, setCurrentChat] = useState(""); //currentChat is the ID of the current open chat
	const [chats, setChats] = useState(); //chats store all MY chats
	const [currentMessages, setCurrentMessages] = useState([]); //currentMessages store all messages of current chat
	const [loadingChats, setLoadingChats] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const newMessageRef = useRef();

	//fetch chats where chat.stuID === currentUser.email
	const getChats = async () => {
		const chatData = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/chats/all-chats/" +
				currentUser.email
		);
		const chats = await chatData.json();
		console.log(`Printing Chats:`);
		console.log(chats);
		var processedChats = chats;
		processedChats.forEach((chat) => {
			chat.date = new Date(chat.date);
		});
		setChats(processedChats);
		// var processedDummyChats = dummyChats;
		// processedDummyChats.forEach((chat) => {
		// 	chat.date = new Date(chat.date);
		// });
		// setChats(processedDummyChats);
		setLoadingChats(false);
	};

	useEffect(() => {
		getChats();
	}, [currentChat]);

	//fetch messages where message.id === currentChat (set loadingMessages true then false), call everytime currentChat changes, if message.status === "Sent", update to "Read"
	const getMessages = async (chatID) => {
		const messagesData = await fetch(
			process.env.REACT_APP_BACKEND_URL + "/chats/messages/" + chatID
		);
		const messages = await messagesData.json();
		var processedMessages = messages;
		processedMessages.forEach((msg) => {
			msg.date = new Date(msg.date);
		});
		setCurrentMessages(processedMessages);
		// var processedDummyMessages = dummyMessages;
		// processedDummyMessages.forEach((msg) => {
		// 	msg.date = new Date(msg.date);
		// });
		// setCurrentMessages(processedDummyMessages);
		setLoadingMessages(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newMessageID = uniqid();
		const frontendMessage = {
			id: newMessageID,
			chatID: currentChat,
			position: "right",
			fromID: currentUser.email,
			type: "text",
			text: newMessageRef.current.value,
			date: new Date(),
		};
		const backendMessage = {
			id: newMessageID,
			chatID: currentChat,
			fromID: currentUser.email,
			type: "text",
			text: newMessageRef.current.value,
			date: new Date().toUTCString(),
		};

		setCurrentMessages(currentMessages.concat([frontendMessage]));
		//update the chat where chat.id === currentChat to have chat.lastDateTime = newMessage.dateTime and chat.lastContent = newMessage.message and unread +=1

		try {
			await fetch(process.env.REACT_APP_BACKEND_URL + "/chats/" + currentChat, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(backendMessage),
			});
		} catch (err) {
			console.error(err);
		}

		newMessageRef.current.value = "";
	};

	if (loadingChats) {
		return <LoadingChats />;
	}

	if (chats && chats.length > 0) {
		return (
			<div className={styles.container}>
				{chats && chats.length > 0 ? (
					<Row>
						<Col lg={4} className={styles.chatCol}>
							<Card className={styles.chatContainer}>
								<ChatList
									className="chat-list"
									dataSource={chats.sort(
										(chat1, chat2) => chat2.date - chat1.date
									)}
									onClick={(chat) => {
										setCurrentChat(chat.id);
										setLoadingMessages(true);
										getMessages(chat.id);
									}}
								/>
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
									<SelectMessage />
								) : currentChat && loadingMessages ? (
									<LoadingMessages />
								) : currentChat && currentMessages ? (
									currentMessages.length === 0 ? (
										<NoMessage />
									) : (
										<MessageList
											className="message-list"
											lockable={true}
											toBottomHeight={"100%"}
											dataSource={currentMessages
												.filter((msg) => msg.chatID === currentChat)
												.sort((msg1, msg2) => msg1.date - msg2.date)}
										/>
									)
								) : (
									<div>this is a state i was not prepared for</div>
								)}
							</Card>
							<Form onSubmit={handleSubmit}>
								<div
									className={currentChat ? styles.formRow : styles.displayNone}
								>
									<Form.Control
										placeholder="Write a message..."
										ref={newMessageRef}
									/>
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
	} else {
		return <NoChats />;
	}
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

const dummyChats = [
	{
		id: "bcd",
		avatar:
			"https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
		alt: "chat avatar",
		stuID: "raynerljm@u.nus.edu",
		orgID: "zecharyajw@gmail.com",
		title: "Zechary's Charities",
		subtitle: "You: What is the minimum required hours for this job?",
		fromID: "zechary@gmail.com",
		date: "Fri, 01 Jul 2021 21:00:00 GMT",
		unread: "1",
	},
	{
		id: "abc",
		avatar:
			"https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
		alt: "chat avatar",
		stuID: "raynerljm@u.nus.edu",
		orgID: "raynerljm@gmail.com",
		title: "Saturday Kids",
		subtitle: "So what's your question for me?",
		fromID: "raynerljm@gmail.com",
		date: "Fri, 02 Jul 2021 03:00:00 GMT",
		unread: "2",
	},
];

const dummyMessages = [
	{
		id: "1",
		chatID: "abc",
		position: "right",
		fromID: "raynerljm@u.nus.edu",
		type: "text",
		text: "Hi Saturday Kids, can I ask a question?",
		date: "Fri, 02 Jul 2021 02:00:00 GMT",
	},
	{
		id: "2",
		chatID: "abc",
		position: "left",
		fromID: "raynerljm@gmail.com",
		type: "text",
		text: "Of course you can!",
		date: "Fri, 02 Jul 2021 02:02:00 GMT",
	},
	{
		id: "3",
		chatID: "abc",
		position: "left",
		fromID: "raynerljm@gmail.com",
		type: "text",
		text: "So what's your question for me?",
		date: "Fri, 02 Jul 2021 02:02:20 GMT",
	},
	{
		id: "4",
		chatID: "bcd",
		position: "right",
		fromID: "raynerljm@u.nus.edu",
		type: "text",
		text: "Hey Zechary - I have a question...",
		date: "Fri, 01 Jul 2021 20:59:30 GMT",
	},
	{
		id: "5",
		chatID: "bcd",
		position: "right",
		fromID: "raynerljm@u.nus.edu",
		type: "text",
		text: "What is the minimum required hours for this job?",
		date: "Fri, 01 Jul 2021 21:00:00 GMT",
	},
];

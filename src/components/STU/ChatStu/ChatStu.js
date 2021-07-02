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
var uniqid = require("uniqid");

const ChatStu = () => {
	const { currentUser } = useAuth();
	const [currentChat, setCurrentChat] = useState(""); //currentChat is the ID of the current open chat
	const [chats, setChats] = useState(); //chats store all MY chats
	const [currentMessages, setCurrentMessages] = useState([]); //currentMessages store all messages of current chat
	const [loadingChats, setLoadingChats] = useState(true);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const newMessageRef = useRef();
	const messageBottomRef = useRef();

	//fetch chats where chat.stuID === currentUser.email
	const getChats = async () => {
		const chatData = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/chats/all-chats/student/" +
				currentUser.email
		);
		const chats = await chatData.json();
		console.log(`Backend Chats:`);
		console.log(chats);
		var processedChats = chats;
		processedChats.forEach((chat) => {
			chat.date = new Date(chat.date);
		});
		processedChats.forEach((chat) => {
			chat.avatar = chat.orgAvatar;
		});
		processedChats.forEach((chat) => {
			if (currentUser.email === chat.fromID) {
				chat.subtitle = `You: ${chat.subtitle}`;
			}
		});
		setChats(processedChats);
		console.log("Processed Chats:");
		console.log(processedChats);
		setLoadingChats(false);
		scrollToBottom();
	};

	useEffect(() => {
		getChats();
	}, [currentChat]);

	const scrollToBottom = () => {
		messageBottomRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "start",
		});
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentMessages]);

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
		processedMessages.forEach((msg) => {
			if (currentUser.email === msg.fromID) {
				msg.position = "right";
			} else {
				msg.position = "left";
			}
		});
		setCurrentMessages(processedMessages);
		setLoadingMessages(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newMessageID = uniqid();
		const currentChatID = currentChat;
		const newMessage = newMessageRef.current.value;
		const newDate = new Date();
		event.target.reset();
		const frontendMessage = {
			id: newMessageID,
			chatID: currentChatID,
			position: "right",
			fromID: currentUser.email,
			type: "text",
			text: newMessage,
			date: newDate,
		};
		const backendMessage = {
			id: newMessageID,
			chatID: currentChatID,
			fromID: currentUser.email,
			type: "text",
			text: newMessage,
			date: newDate.toUTCString(),
		};

		setCurrentMessages(currentMessages.concat([frontendMessage]));
		//update the chat where chat.id === currentChat to have chat.lastDateTime = newMessage.dateTime and chat.lastContent = newMessage.message and unread +=1
		var updateChats = chats;
		updateChats.forEach((chat) => {
			if (chat.id === currentChatID) {
				chat.subtitle = `You: ${newMessage}`;
				chat.date = newDate;
			}
		});

		try {
			await fetch(
				process.env.REACT_APP_BACKEND_URL + "/chats/" + currentChatID,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(backendMessage),
				}
			);
		} catch (err) {
			console.error(err);
		}
		console.log("Successfully sent chat");
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
										<>
											<MessageList
												className="message-list"
												// lockable={true}
												// toBottomHeight={"100%"}
												dataSource={currentMessages
													.filter((msg) => msg.chatID === currentChat)
													.sort((msg1, msg2) => msg1.date - msg2.date)}
											/>
											<div ref={messageBottomRef} />
										</>
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
										required
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

import { useState, useEffect, useRef } from "react";
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
import styles from "./ChatOrg.module.css";
var uniqid = require("uniqid");

const ChatOrg = () => {
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
				"/chats/all-chats/organization/" +
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
			chat.avatar = chat.stuAvatar;
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

export default ChatOrg;

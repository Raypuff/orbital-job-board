import { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Telegram } from "react-bootstrap-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { ChatList, MessageList } from "react-chat-elements";
import { LoadingChats, NoChats, SelectMessage, NoMessage } from "./EmptyStates";
import styles from "./ChatOrg.module.css";
var uniqid = require("uniqid");

const ChatOrg = () => {
	const { currentUser } = useAuth();
	const [currentChat, setCurrentChat] = useState(); //currentChat is the ID of the current open chat
	const [chats, setChats] = useState(); //chats store all MY chats
	const [currentMessages, setCurrentMessages] = useState([]); //currentMessages store all messages of current chat
	const [loadingChats, setLoadingChats] = useState(true);
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

	// useEffect(() => {
	// 	scrollToBottom();
	// }, [currentMessages]);

	//fetch messages where message.id === currentChat (set loadingMessages true then false), call everytime currentChat changes, if message.status === "Sent", update to "Read"
	const getMessages = async () => {
		const messagesData = await fetch(
			process.env.REACT_APP_BACKEND_URL + "/chats/messages/" + currentChat
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
		if (currentMessages !== processedMessages) {
			setCurrentMessages(processedMessages);
			scrollToBottom();
		}
	};

	useEffect(() => {
		if (currentChat !== null) {
			console.log("Getting msgs");
			getMessages();
		}
	});

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
								) : currentChat && currentMessages ? (
									currentMessages.length === 0 ? (
										<NoMessage />
									) : (
										<>
											<MessageList
												className="message-list"
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

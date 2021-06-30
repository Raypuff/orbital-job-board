import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import image from "../../../assets/noImage.png";
import styles from "./ChatStuChat.module.css";

const ChatStuChat = ({
	id,
	stuID,
	stuName,
	orgID,
	orgName,
	lastDateTime,
	lastContent,
	setCurrentChat,
}) => {
	const datetime = `${lastDateTime.slice(5, 11)} ${lastDateTime.slice(
		14,
		16
	)} ${tConvert(lastDateTime.slice(-12, -7))}`;
	return (
		<Card
			className={styles.container}
			onClick={() => {
				setCurrentChat(id);
			}}
		>
			<div className={styles.wrapper}>
				<img src={image} alt="profile" className={styles.image} />
				<div className={styles.textContainer}>
					<div className="d-flex align-items-baseline">
						<Card.Title className={styles.title}>{orgName}</Card.Title>
						<Card.Text className={styles.time}>{datetime}</Card.Text>
					</div>
					<Card.Text className={styles.message}>{lastContent}</Card.Text>
				</div>
			</div>
		</Card>
	);
};

export default ChatStuChat;

function tConvert(time) {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
		time,
	];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
}

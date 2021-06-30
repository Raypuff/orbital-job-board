import { Card } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./ChatStuMessage.module.css";

const ChatStuMessage = ({
	key,
	id,
	chatID,
	fromID,
	toID,
	message,
	dateTime,
}) => {
	const { currentUser } = useAuth();
	const isSender = fromID === currentUser.email;

	return (
		<div className={isSender ? styles.send : styles.receive}>
			<div
				className={isSender ? styles.sendContainer : styles.receiveContainer}
			>
				{message}
				<div className={isSender ? styles.sendTime : styles.receiveTime}>
					<div>{tConvert(dateTime.slice(-12, -7))}</div>
				</div>
			</div>
		</div>
	);
};

export default ChatStuMessage;

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

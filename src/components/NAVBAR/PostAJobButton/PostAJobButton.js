import { useState, useEffect } from "react";
import { Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./PostAJobButton.module.css";
import { PlusSquare, PlusLg } from "react-bootstrap-icons";

const PostAJobButton = () => {
	const { width } = useWindowDimensions();
	return (
		<Nav>
			<OverlayTrigger placement="bottom" overlay={renderPostAJobTooltip}>
				<Nav.Link
					as={NavLink}
					activeClassName={styles.activeNavLink}
					exact
					to="/post-a-job"
				>
					<PlusLg style={{ marginBottom: "0.3rem" }} />
					{width < 576 && (
						<span style={{ marginLeft: "0.4rem" }}>Post A Job</span>
					)}
				</Nav.Link>
			</OverlayTrigger>
		</Nav>
	);
};

export default PostAJobButton;

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

const renderPostAJobTooltip = (props) => (
	<Tooltip id="post-a-job-tooltip" {...props}>
		Post A Job
	</Tooltip>
);

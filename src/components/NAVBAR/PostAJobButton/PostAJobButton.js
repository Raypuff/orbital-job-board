//IMPORT
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import { Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
//React router
import { NavLink } from "react-router-dom";
//CSS Modules
import styles from "./PostAJobButton.module.css";

const PostAJobButton = () => {
	//CUSTOM HOOKS
	//Retrieving the window dimensions
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

//FUNCTION TO RETRIEVE WINDOW DIMENSIONS
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

//TOOLTIPS
const renderPostAJobTooltip = (props) => (
	<Tooltip id="post-a-job-tooltip" {...props}>
		Post A Job
	</Tooltip>
);

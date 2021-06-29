import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./PostAJobButton.module.css";

const PostAJobButton = () => {
	return (
		<Nav>
			<Nav.Link
				as={NavLink}
				activeClassName={styles.activeNavLink}
				exact
				to="/post-a-job"
			>
				Post A Job
			</Nav.Link>
		</Nav>
	);
};

export default PostAJobButton;

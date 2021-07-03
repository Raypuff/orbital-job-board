import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ccsgplogo from "../../assets/ccsgp.png";
import nuslogo from "../../assets/nussoc.png";

const Header = () => {
	return (
		<header>
			<div className={styles.logobox}>
				<a href="https://www.comp.nus.edu.sg/" target="_blank" rel="noreferrer">
					<img
						className={styles.nusLogo}
						src={nuslogo}
						title="NUS Computing"
						alt="NUS Computing Logo"
					/>
				</a>
				<a
					href="https://www.ccsgp.comp.nus.edu.sg/"
					target="_blank"
					rel="noreferrer"
					className="ml-auto"
				>
					<img
						className={styles.ccsgpLogo}
						src={ccsgplogo}
						title="CCSGP"
						alt="CCSGP Logo"
					/>
				</a>
			</div>
		</header>
	);
};

export default Header;

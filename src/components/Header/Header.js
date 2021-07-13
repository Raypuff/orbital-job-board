//IMPORTS
//Logos
import ccsgplogo from "../../assets/headerLogos/ccsgp.png";
import nuslogo from "../../assets/headerLogos/nussoc.png";
//CSS Modules
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
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
					className={styles.rightLogo}
				>
					<img
						className={styles.ccsgpLogo}
						src={ccsgplogo}
						title="CCSGP"
						alt="CCSGP Logo"
					/>
				</a>
			</div>
		</div>
	);
};

export default Header;

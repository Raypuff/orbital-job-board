//IMPORTS
//Icons
import address from "../../assets/nusFooter/location-arrow-solid.svg";
import phone from "../../assets/nusFooter/phone-alt-solid.svg";
import email from "../../assets/nusFooter/envelope-solid.svg";
import gps from "../../assets/nusFooter/gps.png";
import blank from "../../assets/nusFooter/blank.svg";
//CSS Modules
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer>
			<div className={styles.linkBack}>
				<div className={styles.addContainer}>
					<h4 className={styles.footerh4}>
						Centre for Computing for
						<br />
						Social Good and Philanthropy
					</h4>
					<ul>
						<li>
							<img className={styles.addSvg} src={address} alt="address svg" />
							Computing 2<br />
							<img className={styles.addSvg2} src={blank} alt="blank" />
							13 Computing Drive
							<br />
							<img className={styles.addSvg2} src={blank} alt="blank" />
							Singapore 117417
						</li>
						<li>
							<img className={styles.addSvg} src={phone} alt="phone svg" />
							+65 6601 2295
						</li>
						<li>
							<img className={styles.addSvg} src={email} alt="email svg" />
							<a href="mailto:ccsgp@nus.edu.sg">Email Us</a>
						</li>
						<br />
						<li>
							<img className={styles.gpsSvg} src={gps} alt="gps svg" />
							<a
								target="_blank"
								rel="noreferrer"
								href="https://www.google.com/maps/dir/?api=1&destination=Centre%20for%20Computing%20for%20Social%20Good%20&%20Philanthropy,%20National%20University%20of%20Singapore,%20Computing%202,%20#02-15,%2013%20Computing%20Drive,%20Singapore%20117417"
							>
								Directions
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.legalBack}>
				<div className={styles.legalBox}>
					<div className={styles.legalText}>
						©2021 by Centre for Computing for Social Good and Philanthropy. All
						Rights Reserved.
					</div>
					<div>
						<ul className={styles.legalLink}>
							<li>
								<a href="https://www.ccsgp.comp.nus.edu.sg/legal">Legal</a>
							</li>
							<li>•</li>
							<li>
								<a href="https://www.ccsgp.comp.nus.edu.sg/contact-us">
									Contact Us
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import styles from "./Footer.module.css";
import address from "../../assets/icons/location-arrow-solid.svg";
import phone from "../../assets/icons/phone-alt-solid.svg";
import email from "../../assets/icons/envelope-solid.svg";
import gps from "../../assets/icons/gps.png";
import facebook from "../../assets/icons/facebook.png";
import twitter from "../../assets/icons/twitter.png";
import instagram from "../../assets/icons/instagram.png";
import youtube from "../../assets/icons/youtube.png";
import linkedin from "../../assets/icons/linkedin.png";
import blog from "../../assets/icons/blog.png";
import blank from "../../assets/icons/blank.svg";

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
							<a href="mailto:ccsgp@nus.edu.sg">Contact Us</a>
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
					{/* <div className={styles.socialIcons}>
						<a href="https://www.facebook.com/NusSchoolOfComputing">
							<img src={facebook} alt="Facebook Icon"></img>
						</a>
						<a href="https://twitter.com/nuscomputing">
							<img src={twitter} alt="Twitter Icon"></img>
						</a>
						<a href="https://instagram.com/nuscomputing/">
							<img src={instagram} alt="Instagram Icon"></img>
						</a>
						<a href="https://www.youtube.com/channel/UCVd-qsSFF328UUqcNxudy0w">
							<img src={youtube} alt="YouTube Icon"></img>
						</a>
						<a href="https://www.linkedin.com/company/nuscomputing">
							<img src={linkedin} alt="LinkedIn Icon"></img>
						</a>
						<a href="http://socbytes.blogspot.sg/">
							<img src={blog} alt="Blog Icon"></img>
						</a>
					</div> */}
				</div>
				{/* <div className={styles.resContainer}>
					<h4 className={styles.footerh4}>Organisation</h4>
					<a href="https://www.comp.nus.edu.sg/about">About</a>
					<a href="https://www.comp.nus.edu.sg/about/depts/cs">
						Dept. of Computer Science
					</a>
					<a href="https://www.comp.nus.edu.sg/about/depts/disa">
						Dept. of Information Systems and Analytics
					</a>
					<a href="https://www.comp.nus.edu.sg/about/iac">
						Industry Advisory Committee
					</a>
					<a href="https://www.comp.nus.edu.sg/about/mgt">Management</a>
					<a href="https://www.comp.nus.edu.sg/about/directory">
						Staff Directory
					</a>
					<a href="https://www.comp.nus.edu.sg/about/faculty">
						Faculty Photo Directory
					</a>
					<a
						className={styles.expandLink}
						href="https://www.comp.nus.edu.sg/about/admin"
					>
						Admin Photo Directory
					</a>
					<a
						className={styles.expandLink}
						href="https://www.comp.nus.edu.sg/about/expert"
					>
						Expert Directory
					</a>
					<a href="https://www.comp.nus.edu.sg/about/admin">News</a>
					<a href="https://www.comp.nus.edu.sg/industry">Industry Relations</a>
					<a href="https://www.comp.nus.edu.sg/giving">Giving</a>
					<a href="http://www.comp.nus.edu.sg/careers">Careers</a>
					<br />
					<h4 className={styles.footerh4}>Resources</h4>
					<a href="https://mysoc.nus.edu.sg/">MySoC</a>
					<a href="http://exchange.nus.edu.sg/">Email</a>
					<a href="https://myportal.nus.edu.sg/">Student</a>
					<a href="http://www.nus.edu.sg/staff">Staff</a>
					<a href="https://events.comp.nus.edu.sg/">Events Calendar</a>
					<a href="https://ivle.nus.edu.sg/">IVLE</a>
					<a href="http://libportal.nus.edu.sg/">Library</a>
					<a href="http://www.nus.edu.sg/alumnet/">Alumni</a>
					<a href="https://dochub.comp.nus.edu.sg/">Facilities & Services</a>
					<a href="https://nusu.sharepoint.com/sites/soc/default.aspx">
						Student Jobs
					</a>
				</div>
				{/* <div className={styles.expandBox}>
          <h4>Graduate Programmes</h4>
          <a>PhD in Computer Science</a>
          <a>PhD in Information Systems</a>
        </div>
        <div className={styles.expandBox}>
          <h4>Undergraduate Programmes</h4>
        </div> */}
			</div>{" "}
			<div className={styles.legalBack}>
				<div className={styles.legalBox}>
					<div>
						©2021 by Centre for Computing for Social Good and Philanthropy. All
						Rights Reserved.
					</div>
					<div>
						<ul className={styles.legalLink}>
							<li>
								<a href="https://www.ccsgp.comp.nus.edu.sg/legal">Legal</a>
							</li>
							{/* <li>•</li>
							<li>
								<a href="http://www.nus.edu.sg/identity">Branding Guidelines</a>
							</li> */}
							<li>•</li>
							<li>
								<a href="https://www.ccsgp.comp.nus.edu.sg/contact-us">
									Contact us
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

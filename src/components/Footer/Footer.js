import styles from "./Footer.module.css";
// import address from "../../assets/location-arrow-solid.svg";
// import phone from "../../assets/phone-alt-solid.svg";
// import email from "../../assets/envelope-solid.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.breadcrumbs}>
        <div className={styles.container}>
          <ul>
            <li> </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.addressPanel}>
          <div>
            <h3 className={styles.addressHeader}>
              National University of Singapore
            </h3>
            <ul className={styles.addressLink}>
              <li>
                21 Lower Kent Ridge Road
                <br />
                Singapore 119077
              </li>
              <li>+65 6516 6666</li>
              <li>
                <a href="mailto:ccsgp@nus.edu.sg">ccsgp@nus.edu.sg</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyrightBox}>
          <div>
            <p>National University of Singapore. All Rights Reserved.</p>
            <div className={styles.copyrightLinks}>
              <p>Legal</p>
              <p className={styles.dot}>•</p>
              <p>Branding guidelines</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.breadcrumb}>breadcrumbs</div>
      <div className={styles.addressPanel}>
        <h2 className={styles.addressHeader}>
          National University of Singapore
        </h2>
        <p className={styles.addressLink}>
          21 Lower Kent Ridge Road
          <br />
          Singapore 119077
          <br />
          +65 6516 6666
          <br />
          ccsgp@nus.edu.sg
        </p>
      </div>
      <div className={styles.copyrightBox}>
        <p>National University of Singapore. All Rights Reserved.</p>
        <div className={styles.copyrightLinks}>
          <p>Legal</p>
          <p className={styles.dot}>•</p>
          <p>Branding guidelines</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

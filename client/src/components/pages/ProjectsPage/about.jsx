import styles from "./projectPage.module.scss";
const About = () => {
  return (
    <div className={styles.aboutSection}>
      <h1 className={styles.title}>
        Hi, my name is <span>Vasiliy</span> a frontend developer
      </h1>
      <p>with passion for learning and creating.</p>
    </div>
  );
};

export default About;

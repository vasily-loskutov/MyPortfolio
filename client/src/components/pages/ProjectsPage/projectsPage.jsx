import React from "react";
import About from "./about";
import styles from "./projectPage.module.scss";
import Projects from "./projects";
const ProjectsPage = () => {
  return (
    <div>
      <div className={styles.aboutBlock}>
        <About />
      </div>
      <Projects />
    </div>
  );
};

export default ProjectsPage;

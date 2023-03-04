import React from "react";
import styles from "../pages.module.scss";
import { useQuery } from "react-query";
import { InfoService } from "@service/info.service";

const SkillsPage = () => {
  const {
    isLoading,
    data: skills,
    error,
  } = useQuery("skills list", InfoService.getAll);
  console.log(skills);
  return (
    <div className={styles.page}>
      <div className={styles.mainBlock}>
        <h1 className="sectionTitle">Skills</h1>
        <div className={styles.sectionBlock}>
          <h1>Frontend</h1>
          {isLoading && <h1>Loading...</h1>}
          {skills && <p>{skills[0].frontendSkills}</p>}
        </div>
        <div className={styles.sectionBlock}>
          <h1>Backend</h1>
          {isLoading && <h1>Loading...</h1>}
          {skills && <p>{skills[0].backendSkills}</p>}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;

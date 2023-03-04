import React from "react";
import styles from "./header.module.scss";
import NavBar from "@components/NavBar/navBar";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <h1>Developer</h1>

          <span>porfolio</span>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default Header;

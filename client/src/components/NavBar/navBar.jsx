import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navBar.module.scss";
const NavBar = () => {
  const location = useLocation();

  return (
    <ul className={styles.nav}>
      <li className={location.pathname === "/projects" && styles.select}>
        <Link to="/projects">Projects</Link>
      </li>
      <li className={location.pathname === "/skills" && styles.select}>
        <Link to="/skills">Skills</Link>
      </li>
      <li className={location.pathname === "/contacts" && styles.select}>
        <Link to="/contacts">Contacts</Link>
      </li>
    </ul>
  );
};

export default NavBar;

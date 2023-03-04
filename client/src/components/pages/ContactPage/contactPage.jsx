import React from "react";
import styles from "../pages.module.scss";

import { useQuery } from "react-query";
import { InfoService } from "@service/info.service";
const ContactPage = () => {
  const {
    isLoading,
    data: info,
    error,
  } = useQuery("skills list", InfoService.getAll);

  return (
    <div className={styles.page}>
      <div className={styles.mainBlock}>
        <h1 className="sectionTitle">Contacts</h1>
        <div className={styles.sectionBlock}>
          <h1>Location</h1>
          <p>Moscow/Russia</p>
        </div>
        <div className={styles.sectionBlock}>
          <h1>Telegram / WhatsApp </h1>
          {isLoading && <h1>Loading...</h1>}
          {info && <p>{info[0].phone}</p>}
        </div>
        <div className={styles.sectionBlock}>
          <h1>Email </h1>
          {isLoading && <h1>Loading...</h1>}
          {info && <p>{info[0].email}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

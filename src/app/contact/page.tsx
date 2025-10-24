import React from "react";
import styles from "@/styles/Contact.module.scss";

import { BsTelephone , BsEnvelope  } from "react-icons/bs";

function Contact() {
  return (
    <main className={styles.contact}>
      <h1>Contact Me</h1>
      <p><BsTelephone /> {process.env.NEXT_PUBLIC_PHONE_NUMBER}  {"(Text Only)"}</p>
      <p><BsEnvelope /> {process.env.NEXT_PUBLIC_EMAIL}</p>
    </main>
  );
}

export default Contact;

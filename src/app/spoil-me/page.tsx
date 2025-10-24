import React from "react";
import styles from "@/styles/SpoilMe.module.scss";

function SpoilMe() {
  return (
    <main className={styles.spoilMe}>
      <div className={styles.desktopImg} />
      <section className={styles.content}>
        <h1>Spoil Me</h1>
        <div className={styles.mobileImg} />
        <p>
          Gifts and tips are never expected but always appreciated, and they
          make me look forward to our meeting even more! If you wish to give me
          a gift here are some ideas to enlighten the experience for the
          session;
        </p>
        <ul>
          <li>A Champagne girl at heart</li>
          <li>Swiss milk chocolate</li>
          <li>Skim dress {"(I’m a size 6)"}</li>
          <li>Balenciaga heels {"(I’m a size 6.5US/37 European)"}</li>
          <li>Starbucks Gift Card</li>
          <li>Cactus Club Gift Cards</li>
        </ul>
        <p>
          Clients who surprise me with gifts such as the following mentioned or
          similar get a special treat in person {";)"}
        </p>
      </section>
    </main>
  );
}

export default SpoilMe;

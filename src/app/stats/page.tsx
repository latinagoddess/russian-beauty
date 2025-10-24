import React from "react";
import styles from "@/styles/About.module.scss";

function Stats() {
  return (
    <main className={styles.about}>
      <div className={styles.desktopImgStats} />

      <section className={styles.content}>
        <h1>Stats</h1>
        <div className={styles.mobileImgStats} />
        <ul>
          <li>Birthday: August 31st 2001</li>
          <li>{"5’2"}, small legs and an athletic and toned physique</li>
          <li>32DD -24 -26</li>
          <li>Piercing green eyes</li>
          <li>100% natural</li>
          <li>Dress: 6</li>
          <li>Shoe size: 6.5 American / 37 European</li>
          <li>Brown hair</li>
          <li>No tattoos</li>
          <li>Speaks Russian, English, little bit of Spanish</li>
          <li>STD Free (Get tested weekly)</li>
        </ul>
      </section>
    </main>
  );
}

export default Stats;

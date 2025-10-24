import React from "react";
import styles from "@/styles/About.module.scss";

function Interests() {
  return (
    <main className={styles.about}>
      <div className={styles.desktopImgInterests} />
      <section className={styles.content}>
        <h1>Interests</h1>
        <div className={styles.mobileImgInterests} />
        <ul>
          <li>
            Interests Hobbies & Interests: Art, ballet, hiking, yoga,
            photography
          </li>
          <li>Zodiac Sign: Virgo Sun, Aquarius Rising, Capricorn Moon</li>
          <li>
            Food: Sushi, wood stove pizza, chicken nuggets, oysters, chipotle
          </li>
          <li>Music: Jazz, R&B, pop, rap, classic rock</li>
          <li>
            Drinks: Champagne, mimosa, nice chardonnay, matcha latte,{" "}
            {"bellini’s"}
            (hint to get on my good side is some Cactus Club gift cards for my
            bellini addiction x)
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Interests;

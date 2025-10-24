import React from "react";
import styles from "@/styles/Faq.module.scss";

import faq from "@/data/faq.json";

function FAQ() {
  return (
    <main className={styles.faq}>
      <section className={styles.content}>
        <h1>FAQ</h1>
        {faq.map((item, index) => (
          <div key={index}>
            <p className={styles.question}>{item.question}</p>
            <p className={styles.answer}>{item.answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default FAQ;

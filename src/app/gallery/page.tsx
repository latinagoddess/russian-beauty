"use client";

import React from "react";
import styles from "@/styles/Gallery.module.scss";

import ReactPlayer from "react-player/lazy";

function Gallery() {
  return (
    <main className={styles.gallery}>
      <h1>Gallery</h1>
      <section className={styles.images}>
        <section className={styles.imagesGrid}>
          {
            [...Array(8)].map((i) => <div className={styles.image} key={i} />)
          }
        </section>
        <section className={styles.imagesGrid2}>
          {
            [...Array(18)].map((i) => <div className={styles.image} key={i} />)
          }
        </section>

          <h3>{"(Older pictures from early 2024 below)"}</h3>
        <section className={styles.imagesGrid3}>
          <ReactPlayer
            width="300px"
            height="480px"
            url="/images/video.mp4"
            controls
            loop
          />


          {
            [...Array(11)].map((i) => <div className={styles.image} key={i}/>)
          }
        </section>
      </section>
    </main>
  );
}

export default Gallery;

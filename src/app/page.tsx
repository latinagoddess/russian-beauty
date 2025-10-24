import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Link href="/about">
          <button>{"Click if you're 18+"}</button>
        </Link>
      </div>
    </main>
  );
}

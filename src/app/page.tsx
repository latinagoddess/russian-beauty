import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bg}>
        <Link href="/rates">
          <button>Click if you are 18+</button>
        </Link>
      </div>
    </main>
  );
}

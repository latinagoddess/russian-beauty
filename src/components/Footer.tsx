"use client";

import React from "react";
import styles from "@/styles/Footer.module.scss";

import { FaTwitter } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Footer() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <section className={styles.footer}>
      <Link href="https://x.com/balletbarbie00">
        <FaTwitter />
      </Link>
      <p>© 2024 Ballerina Barbie</p>
    </section>
  );
}

export default Footer;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineTwitter } from "react-icons/ai";

import { motion } from "framer-motion";

import MobileMenu from "./MobileMenu";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const aboutMenuOpen = Boolean(anchorEl);
  const handleOpenAboutMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAboutMenu = () => {
    setAnchorEl(null);
  };

  // State that handles opening and closing of the mobile menu
  const [openMenu, setOpenMenu] = useState(false);

  const [links] = useState([
    {
      title: "Gallery",
      href: "/gallery",
    },
    {
      title: "Rates & Online Content",
      href: "/rates",
    },    
    {
      title: "Booking Procedure",
      href: "/booking",
    },
    {
      title: "Reviews",
      href: "/reviews",
    },
    {
      title: "Schedule/Touring Dates",
      href: "/touring",
    },
    {
      title: "Form",
      href: "/booking-form",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "Spoil Me",
      href: "/spoil-me",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ]);

  // Values asigned to the top line of the hamburger menu used for rotation
  const topLineVariants = {
    open: { transform: "translateY(350%) rotateZ(45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  // Values asigned to the bottom line of the hamburger menu used for rotation
  const bottomLineVariants = {
    open: { transform: "translateY(-350%) rotateZ(-45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  if (pathname === "/") return null;

  return (
    <nav className={styles.nav}>
      <MobileMenu
        open={openMenu}
        links={links}
        setOpen={(open) => setOpenMenu(open)}
      />

      <section className={styles.logoHolder} onClick={() => router.push("/")}>
        <h3>Your Special Slavic Baby</h3>
      </section>

      {/* Navbar links */}
      <ul className={styles.links}>
        <li>
          <button onClick={handleOpenAboutMenu} className={styles.aboutMenu}>
            <p>About</p>

            <FaAngleDown
              style={{
                transform: aboutMenuOpen ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={aboutMenuOpen}
            onClose={handleCloseAboutMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseAboutMenu}>
              <a href="/about">About Me</a>
            </MenuItem>
            <MenuItem onClick={handleCloseAboutMenu}>
              <a href="/stats">Stats</a>
            </MenuItem>
            <MenuItem onClick={handleCloseAboutMenu}>
              <a href="/interests">Interests</a>
            </MenuItem>
            <MenuItem onClick={handleCloseAboutMenu}>
              <a href="/my-story">My Story</a>
            </MenuItem>
          </Menu>
        </li>
        {links.map((link) => {
          return (
            <li key={link.href}>
              <a href={link.href}>{link.title}</a>
            </li>
          );
        })}
        <li>
          <Link href="https://x.com/moscowbaeee8278">
            <AiOutlineTwitter />
          </Link>
        </li>
      </ul>

      <div
        className={styles.hamburger}
        onClick={() => setOpenMenu(!openMenu)}
        id="hamburger"
      >
        <motion.div
          className={styles.line}
          animate={openMenu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "tween" }}
          variants={topLineVariants}
          id="line1"
        />
        <div
          className={styles.line}
          style={openMenu ? { opacity: 0 } : undefined}
          id="line2"
        />
        <motion.div
          className={styles.line}
          animate={openMenu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "tween" }}
          variants={bottomLineVariants}
          id="line3"
        />
      </div>
    </nav>
  );
}

export default Navbar;

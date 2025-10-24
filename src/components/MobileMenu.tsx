/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../styles/MobileMenu.module.scss";

import { FaAngleDown } from "react-icons/fa6";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useDetectClickOutside } from "react-detect-click-outside";

type LinkType = {
  title: string;
  href: string;
};

interface MenuProps {
  open: boolean;
  links: Array<LinkType>;
  setOpen: (open: boolean) => void;
}

function MobileMenu(props: MenuProps) {
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

  const [animationFinished, setAnimationFinished] = useState(false);

  // Used for closing the menu on the click outside the menu itself
  const ref = useDetectClickOutside({
    onTriggered: (ctx: Event) => {
      if (ctx.target) {
        // Check if it is open already and if the click is not coming from the hamburger icon click which opens the menu
        if (
          props.open &&
          !["hamburger", "line1", "line2", "line3"].includes(
            (ctx.target as HTMLButtonElement).id
          )
        ) {
          props.setOpen(false);
        }
      }
    },
  });

  // Values asigned to the mobile menu depending on its state
  const menuVariants = {
    open: { opacity: 1, height: "100%", display: "flex" },
    closed: { opacity: 0.5, height: "0%", display: "none" },
  };

  // Values asigned to the container depending on mobile menu open state
  // If it is open, it will play the opening animation, else it will play closing or finished,
  // Depending on the state of the closing animation
  const containerVariants = {
    open: { opacity: 1, display: "flex" },
    closing: { opacity: 0, display: "none" },
    finished: { display: "none", opacity: 0, transform: "translate(9999px)" },
  };

  useEffect(() => {
    if (props.open) {
      props.setOpen(false);
    }
  }, [pathname]);

  return (
    <motion.main
      animate={props.open ? "open" : animationFinished ? "finished" : "closing"}
      transition={{ duration: 0.3, type: "tween" }}
      onAnimationComplete={() => setAnimationFinished(true)}
      variants={containerVariants}
      className={styles.container}
    >
      <motion.section
        animate={props.open ? "open" : "closed"}
        transition={{ duration: 0.2, type: "tween" }}
        variants={menuVariants}
        className={styles.menu}
        ref={ref}
      >
        {/* Map through all of the links, and put them as list elements in unordered list element (ul) */}
        <ul>
          <li>
            <button
              onClick={handleOpenAboutMenu}
              className={styles.aboutMenu}
              id="about-menu"
            >
              About
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
          {props.links.map((link, i) => {
            return (
              <li key={i}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
          <li>
            <Link href="https://x.com/moscowbaeee8278">Twitter</Link>
          </li>
        </ul>
      </motion.section>
    </motion.main>
  );
}

export default MobileMenu;

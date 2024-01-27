"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import classes from "./header.module.css";

import mainLogo from "@/assets/images/logo.png";
import hamburgerIcon from "@/assets/images/hamburger.png";
import Container from "../UI/container";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <Link href="/">
          <Image className={classes.logo} src={mainLogo} alt="CAO Logo" />
        </Link>
        <nav className={classes["mobile-nav"]}>
          <Image
            onClick={() => setIsNavOpen((prevState) => !prevState)}
            className={classes["mobile-hamburger"]}
            src={hamburgerIcon}
            alt="Hamburger icon"
            width="50"
          />
          <ul
            className={
              !isNavOpen
                ? classes["mobile-nav-list"]
                : `${classes["mobile-nav-list"]} ${classes.show}`
            }
          >
            <li className={classes["mobile-nav-list__item"]}>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? `${classes["mobile-nav-list__link"]} ${classes.active}`
                    : `${classes["mobile-nav-list__link"]}`
                }
              >
                Home
              </Link>
            </li>
            <li className={classes["mobile-nav-list__item"]}>
              <Link
                href="/favourites"
                className={
                  pathname.startsWith("/favourites")
                    ? `${classes["mobile-nav-list__link"]} ${classes.active}`
                    : `${classes["mobile-nav-list__link"]}`
                }
              >
                Favourite
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={classes.nav}>
          <ul className={classes["nav-list"]}>
            <li className={classes["nav-list__item"]}>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? `${classes["nav-list__link"]} ${classes.active}`
                    : `${classes["nav-list__link"]}`
                }
              >
                Home
              </Link>
            </li>
            <li className={classes["nav-list__item"]}>
              <Link
                href="/favourites"
                className={
                  pathname.startsWith("/favourites")
                    ? `${classes["nav-list__link"]} ${classes.active}`
                    : `${classes["nav-list__link"]}`
                }
              >
                Favourite
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

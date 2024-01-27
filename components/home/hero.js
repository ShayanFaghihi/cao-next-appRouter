import Image from "next/image";

import classes from "./hero.module.css";
import magnifier from "@/assets/icons/magnifier.svg";
import filter from "@/assets/icons/filter.svg";
import Container from "../UI/container";

export default function Hero() {
  return (
    <section className={classes["hero-box"]}>
      <h2 className={classes.subtitle}>Create App Online</h2>
      <h1 className={classes.heading}>
        Accelerate Your App Building Journey with Low/No-Code Platforms
      </h1>
      <p className={classes.tagline}>
        We compare the app builders so you can choose your platform with
        confidence
      </p>
      <form className={classes["search-form"]}>
        <label>
          <Image src={magnifier} alt="Magnifier Icon" />
        </label>
        <input type="search" placeholder="Search" />
        <button type="submit">
          Search
          <span>
            <Image src={filter} alt="Filter Icon" />
          </span>
        </button>
      </form>
    </section>
  );
}

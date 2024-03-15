import Image from "next/image";
import Link from "next/link";

import arrowLeft from "@/assets/icons/arrow-left.svg";
import classes from "./navigation.module.css";

export default function Navigation(props) {
  return (
    <section className={classes["navigator-section"]}>
      <Link href="/">
        <Image src={arrowLeft} alt="Arrow to left" width={20} height={20} />
      </Link>
      <h1>{props.pageTitle || ""}</h1>
    </section>
  );
}

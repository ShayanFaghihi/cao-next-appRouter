import Link from "next/link";
import classes from "./button.module.css";

export default function Button(props) {
  return (
    <Link
      href={props.target}
      className={`${classes["cta-button"]} ${props.className}`}
    >
      {props.children}
    </Link>
  );
}

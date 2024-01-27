import Link from "next/link";
import classes from "./button.module.css";

export default Button = (props) => {
  return (
    <Link href={props.target} className={classes.button}>
      {props.children}
    </Link>
  );
};

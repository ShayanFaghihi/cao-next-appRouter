import Button from "../UI/button";

import classes from "./compareFooter.module.css";

export default function CompareFooter({ visible, appBuildersToCompare }) {
  return (
    <section
      className={
        !visible
          ? classes["sticky-compare-box"]
          : `${classes["sticky-compare-box"]} ${classes.visible}`
      }
    >
      <Button
        target={`/compare/${appBuildersToCompare[0]}/${appBuildersToCompare[1]}`}
      >
        Compare
      </Button>
    </section>
  );
}

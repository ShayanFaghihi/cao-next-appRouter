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
      {visible && <button>Compare</button>}
    </section>
  );
}

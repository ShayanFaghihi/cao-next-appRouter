import classes from "./titleColumn.module.css";

export default function CompareTitleColumn() {
  return (
    <div
      className={`${classes["compare-table__headings"]} ${classes["table-column"]}`}
    >
      <ul className={classes["compare-table__list"]}>
        <li className={classes["compare-table__list--item"]}>
          <h3>App Name</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>App Builder</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Free Version</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Price</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Platform Support</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Publishing</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Design Flexibility</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Build Simple App</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Build Complex App</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>Coding</h3>
        </li>
        <li className={classes["compare-table__list--item"]}>
          <h3>3PI Plugins</h3>
        </li>
      </ul>
    </div>
  );
}

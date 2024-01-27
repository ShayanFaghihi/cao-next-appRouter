import React from "react";
import Link from "next/link";

const Navigation = (props) => {
  return (
    <section className="navigator-section">
      <Link href="/">
        <img src="/icons/arrow-left.svg" alt="" />
      </Link>
      <h1>{props.pageTitle}</h1>
    </section>
  );
};

export default Navigation;

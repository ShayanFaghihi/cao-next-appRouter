import AppBox from "./appBox";
import Button from "../UI/button";

import classes from "./similarAppList.module.css";
import magnifierIcon from "@/assets/icons/magnifier.svg";
import Image from "next/image";

export default function SimilarAppList(props) {
  const appBuilders = props.appBuilders?.edges;

  return (
    <section className={classes["similar-apps-section"]}>
      <div className={classes["heading"]}>
        <h2>Similar Apps</h2>
        <form>
          <input type="search" placeholder="Search" />
          <span>
            <Image src={magnifierIcon} alt="Magnifier Icon" />{" "}
          </span>
        </form>
      </div>
      <section className={classes["app-list-section"]}>
        {appBuilders?.map(({ node }) => (
          <AppBox
            key={node.id}
            slug={node.slug}
            title={node.title}
            featuredImg={node.featuredImage}
            excerpt={node.excerpt}
          />
        ))}
      </section>
      <Button target="/app_builders" className={classes["view-more-btn"]}>
        View More
      </Button>
    </section>
  );
}

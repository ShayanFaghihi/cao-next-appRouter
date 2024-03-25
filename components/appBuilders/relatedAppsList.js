"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AppBox from "./appBox";
import Button from "../UI/button";
import StickyCompare from "../compare/stickyCompare";

import classes from "./relatedAppsList.module.css";
import magnifierIcon from "@/assets/icons/magnifier.svg";

export default function RelatedAppsList(props) {
  const appBuilders = props.appBuilders?.edges;

  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    // Get App Builders list from User Local Storage
    const selectedAppBuilders = localStorage.getItem("appBuildersToCompare");
    if (selectedAppBuilders) {
      setCompareList(JSON.parse(selectedAppBuilders));
    }
  }, []);

  const compareHandler = (appSlug) => {
    if (!compareList.includes(appSlug) && compareList.length < 2) {
      // Select to compare and add to local storage AppBuilders List
      const compareListCopy = [...compareList];
      compareListCopy.push(appSlug);
      localStorage.setItem(
        "appBuildersToCompare",
        JSON.stringify(compareListCopy)
      );
      setCompareList(compareListCopy);
    } else if (compareList.includes(appSlug)) {
      // Reset state and remove from local storage AppBuilders List
      const compareListCopy = [...compareList];
      const editedList = compareListCopy.filter((item) => item !== appSlug);
      localStorage.setItem("appBuildersToCompare", JSON.stringify(editedList));
      setCompareList(editedList);
    }
  };

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
            isSelected={compareList.includes(node.slug)}
            compareHandler={compareHandler}
          />
        ))}
      </section>
      <Button target="/app_builders" className={classes["view-more-btn"]}>
        View More
      </Button>
      <StickyCompare
        visible={compareList.length === 2}
        appBuildersToCompare={compareList}
      />
    </section>
  );
}

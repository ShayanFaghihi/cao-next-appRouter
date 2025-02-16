"use client";
import { useEffect, useState } from "react";
import AppBox from "./appBox";

import classes from "./appsList.module.css";
import StickyCompare from "../compare/stickyCompare";

export default function AppsList({ appBuilders }) {
  const [compareList, setCompareList] = useState([]);
  const [likedAppBuildersList, setLikedAppBuildersList] = useState([]);

  useEffect(() => {
    // Get App Builders list from User Local Storage
    const selectedAppBuilders = localStorage.getItem("appBuildersToCompare");
    if (selectedAppBuilders) {
      setCompareList(JSON.parse(selectedAppBuilders));
    }

    // Get Liked App Builders by current user from their Local Storage
    const likedAppBuilders = localStorage.getItem("likedAppBuilders");
    if (likedAppBuilders) {
      setLikedAppBuildersList(JSON.parse(likedAppBuilders));
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
    <>
      <section className={classes["app-list-section"]}>
        {appBuilders?.map(({ node }) => (
          <AppBox
            key={node.id}
            slug={node.slug}
            title={node.title}
            featuredImg={node.featuredImage}
            excerpt={node.excerpt}
            isSelected={compareList.includes(node.slug)}
            isLiked={likedAppBuildersList.includes(node.slug)}
            compareHandler={compareHandler}
          />
        ))}
      </section>
      <StickyCompare
        visible={compareList.length === 2}
        appBuildersToCompare={compareList}
      />
    </>
  );
}

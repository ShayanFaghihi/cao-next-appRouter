"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CompareContext from "@/context/compare-context";

import classes from "./AppBox.module.css";

import heartIcon from "@/assets/icons/heart.svg";
import emptyHeartIcon from "@/assets/icons/heart-unliked.svg";
import linkIcon from "@/assets/icons/link.svg";

const AppBox = ({ title, featuredImg, excerpt, isForAdd }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const slug = title.toLowerCase();

  const compareCtx = useContext(CompareContext);

  useEffect(() => {
    // Make the app box checked when it is selected as an app to compare
    if (
      compareCtx.appBuildersToCompare.app1Name === title ||
      compareCtx.appBuildersToCompare.app2Name === title
    ) {
      setIsChecked(true);
    }
  }, []);

  const checkToCompare = (appName) => {
    if (
      appName != compareCtx.appBuildersToCompare.app1Name &&
      appName != compareCtx.appBuildersToCompare.app2Name &&
      !compareCtx.isTwoAppSelected
    ) {
      setIsChecked(true);
      compareCtx.compareAppBuilders(appName);
    } else {
      setIsChecked(false);
      compareCtx.removeAppFromList(appName);
    }
  };

  const addToFavourite = () => {
    setIsLiked((prevState) => !prevState);
  };

  const purifyTexts = (text, limit) => {
    let purifiedText = "";
    if (limit) {
      // Limit the number of words
      const words = text.trim().split(" ");
      let limitedWords = words.slice(0, limit);
      limitedWords = limitedWords.join(" ");
      // Strip HTML codes
      purifiedText = limitedWords.replace(/(<([^>]+)>)/gi, "");
    } else {
      purifiedText = text.replace(/(<([^>]+)>)/gi, "");
    }

    return purifiedText;
  };

  return (
    <li className={classes["app-box"]}>
      <div className={classes["app-box__image"]}>
        <Link href={`/app_builders/${slug}`}>
          <Image
            src={featuredImg.node.sourceUrl}
            alt={featuredImg.node.altText}
            width="200"
            height="200"
          />
          <span
            className={
              isLiked
                ? classes["like-button"]
                : `${classes["like-button"]} ${classes.unliked}`
            }
            onClick={addToFavourite}
          >
            <Image
              src={isLiked ? heartIcon : emptyHeartIcon}
              alt="Heart Icon"
            />
          </span>
        </Link>
      </div>

      <div className={classes["app-box__content"]}>
        <h3>
          <Link href={`/app_builders/${slug}`}>{title}</Link>
        </h3>
        <p>{purifyTexts(excerpt, 30)}</p>
        {/* Strip HTML code from excerpt */}
      </div>

      <div className={classes["app-box__actions"]}>
        {isForAdd ? (
          // When an app should be selected from the pop up modal

          !compareCtx.appBuildersToCompare.app1Name &&
          !compareCtx.appBuildersToCompare.app2Name ? (
            <Link
              href={`/compare${title}`}
              className={["app-box__actions--link-btn"]}
              onClick={() => checkToCompare(title)}
            >
              Add
            </Link>
          ) : (
            <Link
              href={`/compare${
                compareCtx.appBuildersToCompare.app1Name
                  ? compareCtx.appBuildersToCompare.app1Name
                  : title
              }/${
                compareCtx.appBuildersToCompare.app2Name
                  ? compareCtx.appBuildersToCompare.app2Name
                  : title
              }`}
              className={classes["app-box__actions--link-btn"]}
              onClick={() => checkToCompare(title)}
            >
              Add
            </Link>
          )
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default AppBox;

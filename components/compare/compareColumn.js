"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import removeIcon from "@/assets/icons/remove.svg";
import androidIcon from "@/assets/icons/android.svg";
import iosIcon from "@/assets/icons/ios.svg";
import pwaIcon from "@/assets/icons/pwa.svg";
import cancelIcon from "@/assets/icons/cancel.svg";
import checkedIcon from "@/assets/icons/checked.svg";
import starIcon from "@/assets/icons/Star.svg";

import classes from "./compareColumn.module.css";

export default function AppCompareColumn({ appBuilder }) {
  const router = useRouter();
  const { appBuilder: appBuildersArr } = useParams();

  const removeApp = () => {
    // check whether there is another app in the compare phase or not
    if (appBuildersArr.length === 2) {
      const newAppBuildersArr = appBuildersArr.filter(
        (item) => item !== appBuilder.slug
      );
      localStorage.setItem(
        "appBuildersToCompare",
        JSON.stringify(newAppBuildersArr)
      );
      router.push(`/compare/${newAppBuildersArr[0]}`);
    } else {
      localStorage.removeItem("appBuildersToCompare");
      router.push("/compare");
    }
  };

  // Purify Text having no HTML code and with limited words
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

  // For showing the stars as many as the rating is, we should creat an array and loop using map inside of JSX
  const flexRating = appBuilder.appBuilderCustomFields.designFlexibilityRating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);
  return (
    <div
      className={`${classes["compare-table__app"]} ${classes["table-column"]}`}
    >
      <ul className={classes["compare-table__list"]}>
        <li className={classes["compare-table__list--item"]}>
          <div className={classes.app}>
            <Image
              src={appBuilder.featuredImage.node.sourceUrl}
              alt={appBuilder.featuredImage.node.altText}
              width={100}
              height={100}
            />
            <div className={classes["app__title"]}>
              <h2>{appBuilder.title}</h2>
              <a href={appBuilder.appBuilderCustomFields.websiteUrl}>
                {" "}
                {appBuilder.appBuilderCustomFields.websiteUrl}{" "}
              </a>
            </div>
            <span className={classes["remove-app"]} onClick={removeApp}>
              <Image
                src={removeIcon}
                alt="Remove Icons"
                width={20}
                height={20}
              />
            </span>
          </div>
          <p className={classes["app-desc"]}>
            {purifyTexts(appBuilder.excerpt, 30)}
            {/* Strip HTML code from excerpt */}
          </p>
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.logo}`}
        >
          <Image
            src={appBuilder.appBuilderCustomFields.productLogo}
            alt={appBuilder.title}
            width={50}
            height={50}
          />
        </li>
        <li className={classes["compare-table__list--item"]}>
          {appBuilder.appBuilderCustomFields.freeVersion.map((item) => item)}
        </li>
        <li className={classes["compare-table__list--item"]}>
          {/* Annual Plan Cost */}$
          {appBuilder.appBuilderCustomFields.basicAnnualPlanCost}
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.support}`}
        >
          {/* Platform Support */}
          {appBuilder.appBuilderCustomFields.platformSupport.map((item) => {
            switch (item) {
              case "Android":
                return (
                  <Image
                    key="android"
                    src={androidIcon}
                    alt="Android Suppport"
                    width={20}
                    height={20}
                  />
                );
              case "IOS":
                return <Image key="ios" src={iosIcon} alt="Ios Support" />;
              case "PWA":
                return (
                  <Image
                    key="pwa"
                    src={pwaIcon}
                    alt="PWA support"
                    width={20}
                    height={20}
                  />
                );
              default:
                break;
            }
          })}
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.icon}`}
        >
          {/* Has publishing cost or no */}
          {appBuilder.appBuilderCustomFields.publishingCosts ? (
            <Image
              src={cancelIcon}
              alt="has publishing cost"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={checkedIcon}
              alt="no publishing cost"
              width={20}
              height={20}
            />
          )}
        </li>
        <li className={classes["compare-table__list--item"]}>
          <div className={classes["compare-table__list--item-rating"]}>
            {/* Show stars as many as the flexRatingArr length */}
            {flexRatingArr.map((_, index) => (
              <Image
                key={index}
                src={starIcon}
                alt="Star Rating"
                width={20}
                height={20}
              />
            ))}
          </div>
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.icon}`}
        >
          {/* Can build Simple App */}
          {appBuilder.appBuilderCustomFields.buildSimpleApps ? (
            <Image
              src={checkedIcon}
              alt="can build simple app"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={cancelIcon}
              alt="cannot build simple app"
              width={20}
              height={20}
            />
          )}
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.icon}`}
        >
          {/* Can build Complex App */}
          {appBuilder.appBuilderCustomFields.buildComplexApps ? (
            <Image
              src={checkedIcon}
              alt="can build complex app"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={cancelIcon}
              alt="cannot build simple app"
              width={20}
              height={20}
            />
          )}
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.icon}`}
        >
          {appBuilder.appBuilderCustomFields.programmingRequired.map(
            (item) => item
          )}
        </li>
        <li
          className={`${classes["compare-table__list--item"]} ${classes.icon}`}
        >
          {/* Has 3PI and plugins */}
          {appBuilder.appBuilderCustomFields.thirdPartyIntegrations ? (
            <Image
              src={checkedIcon}
              alt="Has 3PI and plugins"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src={cancelIcon}
              alt="Has not 3PI and plugins"
              width={20}
              height={20}
            />
          )}
        </li>
      </ul>
    </div>
  );
}

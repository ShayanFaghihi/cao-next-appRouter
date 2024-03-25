"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

import classes from "./appBox.module.css";

import heartIcon from "@/assets/icons/heart.svg";
import emptyHeartIcon from "@/assets/icons/heart-unliked.svg";

export default function AppBox({
  slug,
  title,
  featuredImg,
  excerpt,
  isForAdd,
  isSelected,
  isLiked,
  compareHandler,
}) {
  const { appBuilder: appBuildersArray } = useParams();
  const router = useRouter();
  const [isAppLiked, setIsAppLiked] = useState(isLiked);

  useEffect(() => {
    setIsAppLiked(isLiked);
  }, [isLiked]);

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

  // Add the app from modal to the local storage
  const addToLocalStorageToCompare = () => {
    const compareList =
      JSON.parse(localStorage.getItem("appBuildersToCompare")) || [];

    compareList.push(slug);
    localStorage.setItem("appBuildersToCompare", JSON.stringify(compareList));

    if (!appBuildersArray) {
      router.push(`/compare/${slug}`);
    } else {
      router.push(`/compare/${appBuildersArray[0]}/${slug}`);
    }
  };

  // Add the Liked App to the local storage
  const addToFavouriteHandler = () => {
    let likedAppsList =
      JSON.parse(localStorage.getItem("likedAppBuilders")) || [];

    if (isAppLiked) {
      likedAppsList = likedAppsList.filter((item) => item !== slug);
      setIsAppLiked(false);
    } else {
      likedAppsList.push(slug);
      setIsAppLiked(true);
    }
    localStorage.setItem("likedAppBuilders", JSON.stringify(likedAppsList));
  };

  return (
    <li className={classes["app-box"]}>
      <div className={classes["app-box__image"]}>
        {!isForAdd ? (
          <>
            <Link href={`/app_builders/${slug}`}>
              <Image
                src={featuredImg.node.sourceUrl}
                alt={featuredImg.node.altText}
                width={"200"}
                height={"200"}
              />
            </Link>
            <span
              className={
                isAppLiked
                  ? classes["like-button"]
                  : `${classes["like-button"]} ${classes.unliked}`
              }
            >
              <Image
                src={isAppLiked ? heartIcon : emptyHeartIcon}
                alt="Heart Icon"
                width={20}
                height={20}
                onClick={addToFavouriteHandler}
              />
            </span>
          </>
        ) : (
          <>
            <Image
              src={featuredImg.node.sourceUrl}
              alt={featuredImg.node.altText}
              width={200}
              height={200}
            />
          </>
        )}
      </div>

      <div className={classes["app-box__content"]}>
        <h3>
          {!isForAdd ? (
            <Link href={`/app_builders/${slug}`}>{title}</Link>
          ) : (
            title
          )}
        </h3>
        <p dangerouslySetInnerHTML={{ __html: purifyTexts(excerpt, 30) }}></p>
        {/* Strip HTML code from excerpt */}
      </div>

      <div className={classes["app-box__actions"]}>
        {isForAdd ? (
          // When there is no app builder in the compare columns
          <button
            className={classes["app-box__actions--link-btn"]}
            onClick={addToLocalStorageToCompare}
          >
            Add
          </button>
        ) : !isSelected ? (
          <button
            className={`${classes["app-box__actions--compare-btn"]}`}
            onClick={() => compareHandler(slug)}
          >
            Add To Compare
          </button>
        ) : (
          <button
            className={`${classes["app-box__actions--compare-btn"]} ${classes.selected}`}
            onClick={() => compareHandler(slug)}
          >
            Selected
          </button>
        )}
      </div>
    </li>
  );
}

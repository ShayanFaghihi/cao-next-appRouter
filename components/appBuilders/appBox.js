"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

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
  addToFavourite,
  isLiked,
  compareHandler,
}) {
  const { appBuilder: appBuildersArray } = useParams();
  const router = useRouter();

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
  const addToLocalStorageHandler = () => {
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

  return (
    <li className={classes["app-box"]}>
      <div className={classes["app-box__image"]}>
        {!isForAdd ? (
          <Link href={`/app_builders/${slug}`}>
            <Image
              src={featuredImg.node.sourceUrl}
              alt={featuredImg.node.altText}
              width={"200"}
              height={"200"}
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
                width={20}
                height={20}
              />
            </span>
          </Link>
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
            onClick={addToLocalStorageHandler}
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

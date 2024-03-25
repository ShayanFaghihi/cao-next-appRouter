import Image from "next/image";
import Link from "next/link";
import classes from "./appReviewBox.module.css";
import linkIcon from "@/assets/icons/link.svg";
import heartIcon from "@/assets/icons/heart.svg";
import shareIcon from "@/assets/icons/share.svg";
import androidIcon from "@/assets/icons/android.svg";
import iosIcon from "@/assets/icons/ios.svg";
import pwaIcon from "@/assets/icons/pwa.svg";
import starIcon from "@/assets/icons/Star.svg";
import calendarIcon from "@/assets/icons/calendar.svg";

export default function AppReviewBox({ appBuilder }) {
  // For showing the stars as many as the rating is, we should create an array and loop using map inside of JSX
  // Desing Flexibility
  const flexRating = appBuilder.appBuilderCustomFields.designFlexibilityRating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);

  // Easy to use
  const easyToUseRating = appBuilder.appBuilderCustomFields.easeOfUseRating;
  const easyToUseRatingArr = Array.from(
    { length: easyToUseRating },
    (_, index) => index
  );

  // Convert Creating Date
  function convertDateFormat(dateString) {
    const date = new Date(dateString);

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <section className={classes["app-review-section"]}>
      <div className={classes["app-review-box"]}>
        <div className={classes["app-review-box__image"]}>
          <Image
            src={appBuilder.featuredImage.node.sourceUrl}
            alt={appBuilder.featuredImage.node.altText}
            width={200}
            height={200}
          />
        </div>
        <div className={classes["app-review-box__content"]}>
          <div className={classes["app-review-box__content--actions"]}>
            <div className={classes["app-review__link"]}>
              <span>
                <Image src={linkIcon} alt="Link icon" width={10} height={10} />
              </span>
              <Link
                href={appBuilder.appBuilderCustomFields.websiteUrl}
                target="_blank"
              >
                {appBuilder.appBuilderCustomFields.websiteUrl}
              </Link>
            </div>
            <div className={classes["app-review__action"]}>
              <div className={classes["like-button"]}>
                <span className={classes["like-image"]}>
                  <Image
                    src={heartIcon}
                    alt="Heart Icon"
                    width={20}
                    height={20}
                  />
                </span>
                <span className={classes["like-counter"]}>
                  {appBuilder.appBuilderLikes.appBuilderLikesCount}
                </span>
              </div>
              <span className={classes["share-button"]}>
                <Image
                  src={shareIcon}
                  alt="Share Icon"
                  width={20}
                  height={20}
                />
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={classes["app-review__desc"]}
            dangerouslySetInnerHTML={{ __html: appBuilder.content }}
          ></div>
          <div className={classes["app-review-box__reviews"]}>
            <ul className={classes["app-reviews-list"]}>
              <li className={classes["app-review-list__item"]}>
                <span className="item">Platform Support:</span>
                <ul className={classes["app-support-list"]}>
                  {/* Platform Support */}
                  {appBuilder.appBuilderCustomFields.platformSupport.map(
                    (item) => {
                      switch (item) {
                        case "Android":
                          return (
                            <li
                              key="android"
                              className={classes["app-support-list__item"]}
                            >
                              <Image
                                src={androidIcon}
                                alt="Android Suppport"
                                width={15}
                                height={15}
                              />
                            </li>
                          );
                        case "IOS":
                          return (
                            <li
                              key="ios"
                              className={classes["app-support-list__item"]}
                            >
                              <Image
                                src={iosIcon}
                                alt="IOS Suppport"
                                width={15}
                                height={15}
                              />
                            </li>
                          );
                        case "PWA":
                          return (
                            <li
                              key="pwa"
                              className={classes["app-support-list__item"]}
                            >
                              <Image
                                src={pwaIcon}
                                alt="PWA Suppport"
                                width={15}
                                height={15}
                              />
                            </li>
                          );
                        default:
                          break;
                      }
                    }
                  )}
                </ul>
              </li>
              <li className={classes["app-review-list__item"]}>
                <span className={classes["item"]}>App Builder:</span>
                <span className={classes["app-builder"]}>
                  <Image
                    src={appBuilder.appBuilderCustomFields.productLogo}
                    alt={`${appBuilder.title} logo`}
                    width={50}
                    height={50}
                  />
                </span>
              </li>
              <li className={classes["app-review-list__item"]}>
                <span className={classes["item"]}>Desing Flexibility:</span>
                <div className={classes["star-rating"]}>
                  {/* Show stars as many as the flexRatingArr length */}
                  {flexRatingArr.map((_, index) => (
                    <Image
                      key={index}
                      src={starIcon}
                      alt="Star Rating"
                      width={12}
                      height={12}
                    />
                  ))}
                </div>
              </li>
              <li className={classes["app-review-list__item"]}>
                <span className={classes["item"]}>Easy to use:</span>
                <div className={classes["star-rating"]}>
                  {/* Show stars as many as the easyToUseArr length */}
                  {easyToUseRatingArr.map((_, index) => (
                    <Image
                      key={index}
                      src={starIcon}
                      alt="Star Rating"
                      width={12}
                      height={12}
                    />
                  ))}
                </div>
              </li>
              <li className={classes["app-review-list__item"]}>
                <span>
                  <Image
                    src={calendarIcon}
                    alt="Calendar Icon"
                    width={20}
                    height={20}
                  />
                </span>
                <span className={classes["creation-date"]}>
                  {convertDateFormat(appBuilder.date)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

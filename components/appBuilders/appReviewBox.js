import classes from "./appReviewBox.module.css";

export default function AppReviewBox(props) {
  // For showing the stars as many as the rating is, we should creat an array and loop using map inside of JSX
  // Desing Flexibility
  const flexRating = props.data.acf.design_flexibility_rating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);

  // Easy to use
  const easyToUseRating = props.data.acf.ease_of_use_rating;
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
          <picture>
            <source
              srcSet={props.data.featured_media}
              media="(max-width: 768px)"
            />
            <source srcSet={props.data.featured_media} />
            <img src={props.data.featured_media} alt="" />
          </picture>
        </div>
        <div className={classes["app-review-box__content"]}>
          <div className={classes["app-review-box__content--actions"]}>
            <div className={classes["app-review__link"]}>
              <span>
                <img src="/icons/link.svg" alt="" />
              </span>
              <a href={props.data.acf.website_url} target="_blank">
                {props.data.acf.website_url}
              </a>
            </div>
            <div className={classes["app-review__action"]}>
              <div className="like-button">
                <span className="like-image">
                  <img src="/icons/heart.svg" alt="Heart Icon" />
                </span>
                <span className="like-counter">50</span>
              </div>
              <span className="share-button">
                <img src="/icons/share.svg" alt="" />
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div
            className="app-review__desc"
            dangerouslySetInnerHTML={{ __html: props.data.content.rendered }}
          ></div>
          <div className="app-review-box__reviews">
            <ul className="app-reviews-list">
              <li className="app-review-list__item">
                <span className="item">Platform Support:</span>
                <ul className="app-support-list">
                  {/* Platform Support */}
                  {props.data.acf.platform_support.map((item) => {
                    switch (item) {
                      case "Android":
                        return (
                          <li key="android" className="app-support-list__item">
                            <img
                              src="/icons/android.svg"
                              alt="Android Suppport"
                            />
                          </li>
                        );
                      case "IOS":
                        return (
                          <li key="ios" className="app-support-list__item">
                            <img src="/icons/ios.svg" alt="IOS Suppport" />
                          </li>
                        );
                      case "PWA":
                        return (
                          <li key="pwa" className="app-support-list__item">
                            <img src="/icons/pwa.svg" alt="PWA Suppport" />
                          </li>
                        );
                      default:
                        break;
                    }
                  })}
                </ul>
              </li>
              <li className="app-review-list__item">
                <span className="item">App Builder:</span>
                <span className="app-builder">
                  <img
                    src={props.data.acf.product_logo}
                    alt={`${props.data.title.rendered} logo`}
                  />
                </span>
              </li>
              <li className="app-review-list__item">
                <span className="item">Desing Flexibility:</span>
                <div className="star-rating">
                  {/* Show stars as many as the flexRatingArr length */}
                  {flexRatingArr.map((_, index) => (
                    <img key={index} src="/icons/Star.svg" alt="Star Rating" />
                  ))}
                </div>
              </li>
              <li className="app-review-list__item">
                <span className="item">Easy to use:</span>
                <div className="star-rating">
                  {/* Show stars as many as the easyToUseArr length */}
                  {easyToUseRatingArr.map((_, index) => (
                    <img key={index} src="/icons/Star.svg" alt="Star Rating" />
                  ))}
                </div>
              </li>
              <li className="app-review-list__item">
                <span>
                  <img src="/icons/calendar.svg" alt="" />
                </span>
                <span className="creation-date">
                  {convertDateFormat(props.data.date)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

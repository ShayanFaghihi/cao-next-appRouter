import React, { useContext } from "react";
import CompareContext from "../context/compare-context";

const AppCompareColumn = (props) => {
  const compareCtx = useContext(CompareContext);

  const removeApp = () => {
    // compareCtx.removeAppFromList(props.data.title.rendered);
    props.removeApp(props.data.title.rendered);
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
  const flexRating = props.data.acf.design_flexibility_rating;
  const flexRatingArr = Array.from({ length: flexRating }, (_, index) => index);
  return (
    <div className="compare-table__app table-column">
      <ul className="compare-table__list">
        <li className="compare-table__list--item">
          <div className="app">
            <img
              src={props.data.featured_media}
              alt={`${props.data.title.rendered} featured image`}
            />
            <div className="app__title">
              <h2>{props.data.title.rendered}</h2>
              <a href={props.data.acf.website_url}>
                {" "}
                {props.data.acf.website_url}{" "}
              </a>
            </div>
            <span className="remove-app" onClick={removeApp}>
              <img src="/icons/remove.svg" alt="" />
            </span>
          </div>
          <p className="app-desc">
            {purifyTexts(props.data.excerpt.rendered, 30)}
            {/* Strip HTML code from excerpt */}
          </p>
        </li>
        <li className="compare-table__list--item logo">
          <img
            src={props.data.acf.product_logo}
            alt={props.data.title.rendered}
          />
        </li>
        <li className="compare-table__list--item">
          {props.data.acf.free_version.map((item) => item)}
        </li>
        <li className="compare-table__list--item">
          {/* Annual Plan Cost */}${props.data.acf.basic_annual_plan_cost}
        </li>
        <li className="compare-table__list--item support">
          {/* Platform Support */}
          {props.data.acf.platform_support.map((item) => {
            switch (item) {
              case "Android":
                return (
                  <img
                    key="android"
                    src="/icons/android.svg"
                    alt="Android Suppport"
                  />
                );
              case "IOS":
                return <img key="ios" src="/icons/ios.svg" alt="Ios Support" />;
              case "PWA":
                return <img key="pwa" src="/icons/pwa.svg" alt="PWA support" />;
              default:
                break;
            }
          })}
        </li>
        <li className="compare-table__list--item icon">
          {/* Has publishing cost or no */}
          {props.data.acf.publishing_costs ? (
            <img src="/icons/cancel.svg" alt="has publishing cost" />
          ) : (
            <img src="/icons/checked.svg" alt="no publishing cost" />
          )}
        </li>
        <li className="compare-table__list--item">
          <div className="compare-table__list--item-rating">
            {/* Show stars as many as the flexRatingArr length */}
            {flexRatingArr.map((_, index) => (
              <img key={index} src="/icons/Star.svg" alt="Star Rating" />
            ))}
          </div>
        </li>
        <li className="compare-table__list--item icon">
          {/* Can build Simple App */}
          {props.data.acf.build_simple_apps ? (
            <img src="/icons/checked.svg" alt="can build simple app" />
          ) : (
            <img src="/icons/cancel.svg" alt="cannot build simple app" />
          )}
        </li>
        <li className="compare-table__list--item icon">
          {/* Can build Complex App */}
          {props.data.acf.build_complex_apps ? (
            <img src="/icons/checked.svg" alt="can build complex app" />
          ) : (
            <img src="/icons/cancel.svg" alt="cannot build simple app" />
          )}
        </li>
        <li className="compare-table__list--item icon">
          {props.data.acf.programming_required.map((item) => item)}
        </li>
        <li className="compare-table__list--item icon">
          {/* Has 3PI and plugins */}
          {props.data.acf.third_party_integrations ? (
            <img src="/icons/checked.svg" alt="Has 3PI and plugins" />
          ) : (
            <img src="/icons/cancel.svg" alt="Has not 3PI and plugins" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default AppCompareColumn;

import React from "react";
import AppsList from "./appsList";
import Button from "../UI/button";

const SimilarAppList = (props) => {
  const appBuilders = props.appBuilders;
  return (
    <section className="similar-apps-section">
      <div className="heading">
        <h2>Similar Apps</h2>
        <form>
          <input type="search" placeholder="Search" />
          <span>
            <img src="/icons/magnifier.svg" alt="" />{" "}
          </span>
        </form>
      </div>
      <AppsList iterationLimit={3} appBuilders={appBuilders} />
      <Button target="/" classes="cta-btn view-more-btn">
        View More
      </Button>
    </section>
  );
};

export default SimilarAppList;

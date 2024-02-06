import AppBox from "./appBox";

import classes from "./appsList.module.css";

export default function AppsList({ query, isForAdd, appBuilders }) {
  let appBuildersList = appBuilders;

  if (query) {
    appBuildersList = appBuilders.filter((appBuilder) => {
      const value = eval(`appBuilder.${query.term}`);
      return value === query.value;
    });
  }

  return (
    <section className={classes["app-list-section"]}>
      {appBuildersList?.map(({ node }) => (
        <AppBox
          key={node.id}
          slug={node.slug}
          title={node.title}
          featuredImg={node.featuredImage}
          excerpt={node.excerpt}
          isForAdd={isForAdd}
        />
      ))}
    </section>
  );
}

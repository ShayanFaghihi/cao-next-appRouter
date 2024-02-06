import AppBox from "./appBox";

import classes from "./appsList.module.css";

export default function AppsList({
  iterationLimit,
  query,
  isForAdd,
  appBuilders,
}) {
  let appBuildersList = appBuilders;

  if (iterationLimit) {
    // Based on iterationLimit number, the array will be looped (e.g. for the Single App Page we only need 3 app builders to be shown)
    appBuildersList = appBuilders.slice(0, iterationLimit);
  }
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
          title={node.title}
          featuredImg={node.featuredImage}
          excerpt={node.excerpt}
          isForAdd={isForAdd}
        />
      ))}
    </section>
  );
}

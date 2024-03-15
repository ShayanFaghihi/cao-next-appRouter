import { getAllAppBuilders, getAppBuilderAndMore } from "@/lib/api";
// import Navigation from "@/components/UI/navigation";
import AppCompareColumn from "@/components/compare/compareColumn";
import AddCompareColumn from "@/components/compare/addColumn";
import CompareTitleColumn from "@/components/compare/titleColumn";
import classes from "./page.module.css";

export default async function AppBuilder({ params }) {
  const allAppBuilders = await getAllAppBuilders();

  const getSingleAppBuilder = async (appSlug) => {
    const data = await getAppBuilderAndMore(appSlug, false);
    return data.appBuilder;
  };

  const app1 = Object.keys(params).length ? params.appBuilder[0] : "";
  const app2 =
    app1 && Object.values(params)[0].length === 2 ? params.appBuilder[1] : "";

  const data1 = await getSingleAppBuilder(app1);
  const data2 = await getSingleAppBuilder(app2);

  return (
    <>
      {/* <Navigation pageTitle="Compare App Builders" /> */}
      <section className={classes["compare-table-section"]}>
        <div className={classes["compare-table"]}>
          <CompareTitleColumn />
          {data1 ? (
            <AppCompareColumn appBuilder={data1} />
          ) : (
            <AddCompareColumn appBuilders={allAppBuilders.edges} />
          )}
          {data2 ? (
            <AppCompareColumn appBuilder={data2} />
          ) : (
            <AddCompareColumn
              appBuilders={
                !data1
                  ? allAppBuilders.edges
                  : allAppBuilders.edges.filter(
                      (item) => item.node.slug !== params.appBuilder[0]
                    )
              }
            />
          )}
        </div>
      </section>
    </>
  );
}

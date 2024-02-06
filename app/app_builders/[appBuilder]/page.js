import { getAppBuilderAndMore } from "@/lib/api";
import AppReviewBox from "@/components/appBuilders/appReviewBox";
import Navigation from "@/components/UI/navigation";

export default async function SingleAppPage({ params }) {
  const data = await getAppBuilderAndMore(params?.appBuilder, false);

  return (
    <>
      <Navigation pageTitle={data.appBuilder.title} />
      <AppReviewBox appBuilder={data.appBuilder} />
    </>
  );
}

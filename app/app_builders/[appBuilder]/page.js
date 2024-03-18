import { getAppBuilderAndMore } from "@/lib/api";
import AppReviewBox from "@/components/appBuilders/appReviewBox";
import PageTitle from "@/components/UI/pageTitle";

import SimilarAppList from "@/components/appBuilders/similarAppList";

export default async function SingleAppPage({ params }) {
  const data = await getAppBuilderAndMore(params?.appBuilder, false);

  return (
    <>
      <PageTitle pageTitle={data?.appBuilder.title} />
      <AppReviewBox appBuilder={data?.appBuilder} />
      <SimilarAppList appBuilders={data?.appBuilders} />
    </>
  );
}

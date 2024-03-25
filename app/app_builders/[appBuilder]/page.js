import { getAppBuilderAndMore } from "@/lib/api";
import AppReviewBox from "@/components/appBuilders/appReviewBox";
import PageTitle from "@/components/UI/pageTitle";

import RelatedAppsList from "@/components/appBuilders/relatedAppsList";

export default async function SingleAppPage({ params }) {
  const data = await getAppBuilderAndMore(params?.appBuilder, false);

  return (
    <>
      <PageTitle pageTitle={data?.appBuilder.title} />
      <AppReviewBox appBuilder={data?.appBuilder} />
      <RelatedAppsList appBuilders={data?.appBuilders} />
    </>
  );
}

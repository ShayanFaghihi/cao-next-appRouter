import { getAllAppBuilders } from "@/lib/api";
import AppsList from "@/components/appBuilders/appsList";
import PageTitle from "@/components/UI/pageTitle";

export default async function appBuildersPage() {
  const data = await getAllAppBuilders();
  const appBuilders = data?.edges;
  return (
    <>
      <PageTitle pageTitle="App Builders" />
      <AppsList appBuilders={appBuilders} />
    </>
  );
}

import { getAllAppBuilders } from "@/lib/api";
import AppsList from "@/components/appBuilders/appsList";
import Navigation from "@/components/UI/navigation";

export default async function appBuildersPage() {
  const data = await getAllAppBuilders();
  const appBuilders = data.edges;
  return (
    <>
      <Navigation pageTitle="App Builders" />
      <AppsList appBuilders={appBuilders} />
    </>
  );
}

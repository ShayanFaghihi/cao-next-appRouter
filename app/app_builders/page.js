import AppsList from "@/components/appBuilders/appsList";
import { getAllAppBuildersHome } from "@/lib/api";
import Navigation from "@/components/UI/navigation";

export default async function appBuildersPage() {
  const data = await getAllAppBuildersHome();
  const appBuilders = data.edges;
  return (
    <>
      <Navigation pageTitle="App Builders" />
      <AppsList appBuilders={appBuilders} />;
    </>
  );
}

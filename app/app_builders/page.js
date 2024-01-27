import AppsList from "@/components/appBuilders/appsList";
import appBuilders from "@/builders.json";

export default function appBuildersPage() {
  return <AppsList appBuilders={appBuilders} />;
}

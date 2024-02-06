import Hero from "@/components/home/hero";
import styles from "./page.module.css";
import AppsList from "@/components/appBuilders/appsList";

import { getAllAppBuildersHome } from "@/lib/api";
import Container from "@/components/UI/container";

export default async function Home() {
  const data = await getAllAppBuildersHome();
  const appBuilders = data.edges;

  return (
    <main className={styles.main}>
      <Container>
        <Hero />
        <AppsList appBuilders={appBuilders} />
      </Container>
    </main>
  );
}

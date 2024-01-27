import Hero from "@/components/home/hero";
import styles from "./page.module.css";
import AppsList from "@/components/appBuilders/appsList";

import appBuilders from "@/builders.json";
import Container from "@/components/UI/container";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <Hero />
        <AppsList appBuilders={appBuilders} />
      </Container>
    </main>
  );
}

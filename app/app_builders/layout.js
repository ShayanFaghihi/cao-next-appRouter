import Container from "@/components/UI/container";

export default function appBuildersLayout({ children }) {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
}

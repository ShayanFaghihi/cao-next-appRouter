import Container from "@/components/UI/container";

export const metadata = {
  title: "Compare App Builders - Create App Online",
  description:
    "Compare Best App Builders side by side to have a better understanding of the most practical online app makers",
};

export default function CompareLayout({ children }) {
  return (
    <>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}

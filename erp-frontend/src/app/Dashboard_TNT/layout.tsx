import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export default function TNTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Material TNT" />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}
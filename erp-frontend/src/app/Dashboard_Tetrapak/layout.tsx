import { TopNav } from "@/components/nav";

export default function TetrapakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Material Tetrapak" />
      <main>{children}</main>
    </>
  );
}
import { TopNav } from "@/components/nav";

export default function IsoporLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Material Isopor" />
      <main>{children}</main>
    </>
  );
}
import { TopNav } from "@/components/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav title="Planejamento e Controle da Produção" />
      <main>{children}</main>
    </>
  );
}

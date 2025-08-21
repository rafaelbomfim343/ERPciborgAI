import Container from "@/components/container";
import { TopNav } from "@/components/nav";

export const metadata = {
  title: 'Diário de Produção',
  description: 'Página de Relatorio de produção diaria',
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}){
  return (
    <>
      <TopNav title="Diário de Produção" />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}


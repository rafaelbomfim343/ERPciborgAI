import { Gauge, type LucideIcon, MessagesSquare } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "ERPCiborg.IA",
  description: "Enterprise Resource Program Ciborg IA",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "PCP",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Faturamento",
    href: "/faturamento",
  },
  {
    icon: MessagesSquare,
    name: "Diário de Produção",
    href: "/relatorio-producao",
  },
];

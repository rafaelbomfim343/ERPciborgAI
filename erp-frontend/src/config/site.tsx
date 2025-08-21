import { Gauge, type LucideIcon, Atom } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "ERPCiborg-AI",
  description: "Template for VisActor and Next.js",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "PCP",
    href: "/",
  },
  {
    icon: Atom,
    name: "Isopor",
    href: "/Dashboard_Isopor",
  },
    {
    icon: Atom,
    name: "Tetrapak",
    href: "/Dashboard_Tetrapak",
  },
    {
    icon: Atom,
    name: "TNT",
    href: "/Dashboard_TNT",
  },


];

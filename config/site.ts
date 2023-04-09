import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  name: "كل أخبارك - أخبار الساعة",
  description: "كل أخبارك - لحظة بلحظة",
  mainNav: [
    {
      title: "الرئيسية",
      href: "/",
    },
    // {
    //   title: "رياضة",
    //   href: "/sports",
    // },
    // {
    //   title: "أخبار العالم",
    //   href: "/",
    // },
    // {
    //   title: "أخبار محلية",
    //   href: "/",
    // },
    // {
    //   title: "فن ومشاهير",
    //   href: "/",
    // },
    // {
    //   title: "تجارة وأعمال",
    //   href: "/",
    // },
    // {
    //   title: "صحة",
    //   href: "/",
    // },
    // {
    //   title: "سياسة",
    //   href: "/",
    // },
    // {
    //   title: "تكنولوجيا",
    //   href: "/",
    // },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}

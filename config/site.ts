import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
    facebook: string
    instagram: string
  }
}

export const siteConfig: SiteConfig = {
  name: `مصر الآن - ${process.env.SITE_NAME_AR}`,
  description: `مصر الآن - ${process.env.SITE_NAME_AR}`,
  mainNav: [
    {
      title: "🏠 الرئيسية",
      href: "/",
    },
    {
      title: "𓂀 أخبار مصر",
      href: "/news/egypt",
    },
    {
      title: "⚽ رياضة",
      href: "/sports",
    },
    {
      title: "🌍 خارج الحدود",
      href: "/news/world",
    },
    {
      title: "🏙️ أخبار محلية",
      href: "/news/local",
    },
    {
      title: "🎬 فن ومشاهير",
      href: "/news/arts",
    },
    {
      title: "💰 مال وأعمال",
      href: "/finance",
    },
    // {
    //   title: "صحة",
    //   href: "/",
    // },
    {
      title: "🏛️ سياسة",
      href: "/news/politics",
    },
    // {
    //   title: "تكنولوجيا",
    //   href: "/",
    // },
  ],
  links: {
    twitter: "https://twitter.com/msrnowcom",
    github: "https://github.com/shadcn/ui",
    docs: "https://msrnow.com",
    facebook: "https://www.facebook.com/msrnowcom",
    instagram: "https://www.instagram.com/msrnowcom",
  },
}

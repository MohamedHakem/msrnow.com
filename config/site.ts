import { NavItem } from "@/types/nav"
import { Icons } from "../components/icons"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  socialNav: NavItem[]
  legalNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
    facebook: string
    instagram: string
  }
  colors: {
    headerBg: string
    bg: string
    contentBg: string
    footerBg: string
    darkHeaderBg: string
    darkBg: string
    darkContentBg: string
    darkFooterBg: string
    hoverBg: string
    darkHoverBg: string
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
  socialNav: [
    {
      title: "roundedFacebook",
      href: "/",
    },
    {
      title: "instagram",
      href: "/",
    },
    {
      title: "roundedTwitter",
      href: "/",
    },
  ],
  legalNav: [
    {
      title: "عنا",
      href: "/about",
    },
    {
      title: "اتصل بنا",
      href: "/contact",
    },
    {
      title: "شروط",
      href: "/terms",
    },
    {
      title: "الخصوصية",
      href: "/privacy-policy",
    },
  ],
  links: {
    twitter: "https://twitter.com/msrnowcom",
    github: "https://github.com/shadcn/ui",
    docs: "https://msrnow.com",
    facebook: "https://www.facebook.com/msrnowcom",
    instagram: "https://www.instagram.com/msrnowcom",
  },
  colors: {
    bg: "",
    hoverBg: "",
    headerBg: "",
    footerBg: "",
    contentBg: "",
    darkBg: "#312e2b",
    darkHoverBg: "",
    darkFooterBg: "#272522",
    darkHeaderBg: "#272522",
    darkContentBg: "#272522",
  },
}

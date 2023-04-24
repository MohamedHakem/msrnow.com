import { SocialNavItem, NavItem } from "@/types/nav"

// import { Icons } from "../components/icons"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  socialNav: SocialNavItem[]
  darkSocialNav: SocialNavItem[]
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
      title: "Facebook",
      component: "whiteRoundedFacebook",
      href: "https://www.facebook.com/msrnowcom",
    },
    {
      title: "Instagram",
      component: "whiteInstagram",
      href: "https://www.instagram.com/msrnowcom",
    },
    {
      title: "Twitter",
      component: "whiteRoundedTwitter",
      href: "https://www.twitter.com/msrnowcom",
    },
    // {
    //   title: "Linkedin",
    //   component: "whiteLinkedin",
    //   href: "https://www.linkedin.com/msrnowcom",
    // },
  ],
  darkSocialNav: [
    {
      title: "Facebook",
      component: "roundedFacebook",
      href: "https://www.facebook.com/msrnowcom",
    },
    {
      title: "Instagram",
      component: "instagram",
      href: "https://www.instagram.com/msrnowcom",
    },
    {
      title: "Twitter",
      component: "roundedTwitter",
      href: "https://www.twitter.com/msrnowcom",
    },
    // {
    //   title: "Linkedin",
    //   component: "whiteLinkedin",
    //   href: "https://www.linkedin.com/msrnowcom",
    // },
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

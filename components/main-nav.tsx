import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Separator } from "@/components/ui/separator"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <NavigationMenu dir="rtl" className="hidden gap-6 lg:flex">
        <NavigationMenuList>
          {items?.length
            ? items?.map(
                (item, index) =>
                  item.href && (
                    <NavigationMenuItem key={index} className="my-2 lg:flex">
                      {item.title ===
                      "فن ومشاهير - ملغي مؤقتا حتي اضافة اكثر من قسم فرعي" ? (
                        <>
                          <NavigationMenuTrigger className="h-9 font-semibold lg:flex">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                <Link href="/" passHref legacyBehavior>
                                  <NavigationMenuLink
                                    className="flex h-full w-full select-none flex-col
                    justify-end space-y-2 rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                                  >
                                    <div className="text-lg text-white">
                                      {siteConfig.name}
                                    </div>
                                    <p className="text-sm leading-snug text-white/90">
                                      {siteConfig.description}
                                    </p>
                                  </NavigationMenuLink>
                                </Link>
                              </li>
                              <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and
                                Tailwind CSS.
                              </ListItem>
                              <ListItem
                                href="/docs/installation"
                                title="Installation"
                              >
                                How to install dependencies.
                              </ListItem>
                              <ListItem
                                href="/docs/primitives/typography"
                                title="Typography"
                              ></ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : item.title ===
                        "أخبار محلية - ملغي مؤقتا حتي اضافة اكتر من منطقة محلية" ? (
                        <>
                          <NavigationMenuTrigger className="h-9 font-semibold">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="mt-2">
                            <ul className="grid w-[600px] grid-cols-2 gap-3 p-4">
                              <ListItem
                                key={"zayed"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                              <ListItem
                                key={"zayed1"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                              <ListItem
                                key={"zayed2"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                              <ListItem
                                key={"zayed3"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                              <ListItem
                                key={"zayed4"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                              <ListItem
                                key={"zayed5"}
                                title={"الشيخ زايد"}
                                href={"/local/zayed"}
                              ></ListItem>
                            </ul>
                            <div className="p-4 pt-0">
                              <Separator className="mb-4" />
                              <Link
                                href="/docs/primitives/accordion"
                                passHref
                                legacyBehavior
                              >
                                <NavigationMenuLink
                                  className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "mb-2 w-full font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
                                  )}
                                >
                                  كل المناطق
                                </NavigationMenuLink>
                              </Link>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          legacyBehavior
                          passHref
                          className={cn(
                            "flex items-center text-lg font-semibold text-slate-600 hover:text-slate-100 focus:shadow-md dark:text-slate-100 sm:text-lg",
                            item.disabled &&
                              "cursor-not-allowed opacity-80 hover:font-semibold"
                          )}
                        >
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "mx-[1px] h-10 font-semibold sm:text-lg"
                            )}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  )
              )
            : null}

          <NavigationMenuIndicator className="top-full z-[1] flex items-end justify-center overflow-hidden transition-[width,transform_200ms_ease] data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut"></NavigationMenuIndicator>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href} passHref legacyBehavior {...props}>
        <NavigationMenuLink
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-200 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className
          )}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </NavigationMenuLink>
      </Link>
    </li>
  )
})
ListItem.displayName = "ListItem"

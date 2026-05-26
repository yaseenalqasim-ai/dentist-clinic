"use client";

import "./globals.css";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  House,
  CalendarDays,
  Users,
  UserRoundCog,
  Settings,
} from "lucide-react";

import {
  UserProvider
} from "@/app/context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  const navItems = [

    {
      name: "الرئيسية",
      href: "/",
      icon: House,
    },

    {
      name: "الحجوزات",
      href: "/calendar",
      icon: CalendarDays,
    },

    {
      name: "المرضى",
      href: "/patients",
      icon: Users,
    },

    {
      name: "الأطباء",
      href: "/doctors",
      icon: UserRoundCog,
    },

    {
      name: "الإعدادات",
      href: "/settings",
      icon: Settings,
    },

  ];

  return (

    <html
      lang="ar"
      dir="rtl"
    >

      <body
        className="
          bg-[#0b1b55]
          min-h-screen
        "
      >

        <UserProvider>

          <div
            className="
              pb-28
            "
          >

            {children}

          </div>

          <nav
            className="
              fixed
              bottom-0
              left-0
              right-0
              bg-white
              border-t
              shadow-2xl
              z-50
            "
          >

            <div
              className="
                grid
                grid-cols-5
              "
            >

              {

                navItems.map((item)=>{

                  const active =
                    pathname ===
                    item.href;

                  const Icon =
                    item.icon;

                  return(

                    <Link
                      key={item.href}
                      href={item.href}

                      className={`

                        flex
                        flex-col
                        items-center
                        justify-center
                        py-3
                        transition

                        ${
                          active
                          ?
                          "text-[#2146e8]"
                          :
                          "text-gray-500"
                        }

                      `}
                    >

                      <Icon
                        size={28}
                        strokeWidth={2.5}
                      />

                      <span
                        className="
                          text-sm
                          font-bold
                          mt-1
                        "
                      >

                        {item.name}

                      </span>

                    </Link>

                  );

                })

              }

            </div>

          </nav>

        </UserProvider>

      </body>

    </html>

  );

}
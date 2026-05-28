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
  AuthProvider,
  useAuth,
} from "@/app/context/AuthContext";

function BottomNavigation() {

  const pathname =
    usePathname();

  const {
    role,
  } = useAuth();

  const hideNavbar =

    pathname === "/login"

    ||

    pathname === "/create-user"

    ||

    pathname === "/unauthorized";

  if (hideNavbar) {
    return null;
  }

  let navItems:any[] = [];

  if (
    role === "doctor"
  ) {

    navItems = [

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
        name: "الإعدادات",
        href: "/settings",
        icon: Settings,
      },

    ];

  } else if (
    role === "secretary"
  ) {

    navItems = [

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

  } else if (
    role === "admin"
  ) {

    navItems = [

      {
        name: "الرئيسية",
        href: "/",
        icon: House,
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

  }

  return (

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
        className={`
          grid
          ${
            navItems.length === 5
            ? "grid-cols-5"
            : navItems.length === 4
            ? "grid-cols-4"
            : "grid-cols-3"
          }
        `}
      >

        {

          navItems.map((item:any)=>{

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

  );

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="ar"
      dir="rtl"
    >

      <body
        className="
          bg-[#f4f4f4]
          min-h-screen
        "
      >

        <AuthProvider>

          <div
            className="
              pb-28
            "
          >

            {children}

          </div>

          <BottomNavigation />

        </AuthProvider>

      </body>

    </html>

  );

}
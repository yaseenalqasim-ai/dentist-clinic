"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  House,
  CalendarDays,
  Users,
  UserRoundCog,
  Settings,
  BarChart3,
} from "lucide-react";

import {
  useAuth,
} from "@/app/context/AuthContext";

export default function BottomNav() {

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

  // =========================
  // DOCTOR NAVIGATION
  // =========================

  if (role === "doctor") {

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
        name: "الإحصائيات",
        href: "/reports",
        icon: BarChart3,
      },

    ];

  }

  // =========================
  // SECRETARY NAVIGATION
  // =========================

  else if (
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

  }

  // =========================
  // OWNER / ADMIN
  // =========================

  else {

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
        name: "الأطباء",
        href: "/doctors",
        icon: UserRoundCog,
      },

      {
        name: "الإحصائيات",
        href: "/reports",
        icon: BarChart3,
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
        bg-[#0d1730]
        border-t
        border-white/10
        z-50
        backdrop-blur-xl
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
                  transition-all

                  ${
                    active
                    ?
                    "text-blue-500"
                    :
                    "text-zinc-400"
                  }

                `}
              >

                <Icon
                  size={24}
                  strokeWidth={2.5}
                />

                <span
                  className="
                    text-xs
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
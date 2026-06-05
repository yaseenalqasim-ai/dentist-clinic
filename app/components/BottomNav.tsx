"use client";

import Link
from "next/link";

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

export default function BottomNav(){

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

  if(hideNavbar){
    return null;
  }

  let navItems:any[] = [];

  /* DOCTOR */

  if(role === "doctor"){

    navItems = [

      {
        name:"الرئيسية",
        href:"/",
        icon:House,
      },

      {
        name:"الحجوزات",
        href:"/calendar",
        icon:CalendarDays,
      },

      {
        name:"المرضى",
        href:"/patients",
        icon:Users,
      },

      {
        name:"الإحصائيات",
        href:"/reports",
        icon:BarChart3,
      },

    ];

  }

  /* SECRETARY */

  else if(
    role === "secretary"
  ){

    navItems = [

      {
        name:"الرئيسية",
        href:"/",
        icon:House,
      },

      {
        name:"الحجوزات",
        href:"/calendar",
        icon:CalendarDays,
      },

      {
        name:"المرضى",
        href:"/patients",
        icon:Users,
      },

      {
        name:"الأطباء",
        href:"/doctors",
        icon:UserRoundCog,
      },

      {
        name:"الإعدادات",
        href:"/settings",
        icon:Settings,
      },

    ];

  }

  /* OWNER */

  else{

    navItems = [

      {
        name:"الرئيسية",
        href:"/",
        icon:House,
      },

      {
        name:"الحجوزات",
        href:"/calendar",
        icon:CalendarDays,
      },

      {
        name:"الأطباء",
        href:"/doctors",
        icon:UserRoundCog,
      },

      {
        name:"الإحصائيات",
        href:"/reports",
        icon:BarChart3,
      },

      {
        name:"الإعدادات",
        href:"/settings",
        icon:Settings,
      },

    ];

  }

  return(

    <div
      className="
        fixed
        bottom-0
        left-0
        right-0

        z-[90]

        px-3
        pb-3

        pointer-events-none
      "
    >

      <nav
        className="
          max-w-2xl
          mx-auto

          bg-[#0d1730]/90

          backdrop-blur-2xl

          border
          border-white/10

          rounded-[30px]

          shadow-[0_10px_40px_rgba(0,0,0,0.45)]

          pointer-events-auto
        "
      >

        <div
          className={`

            grid

            ${
              navItems.length === 5

              ?

              "grid-cols-5"

              :

              navItems.length === 4

              ?

              "grid-cols-4"

              :

              "grid-cols-3"

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

                  className="
                    relative

                    flex
                    flex-col

                    items-center
                    justify-center

                    py-3

                    transition-all
                  "
                >

                  {

                    active && (

                      <div
                        className="
                          absolute
                          inset-x-3
                          top-2
                          bottom-2

                          rounded-2xl

                          bg-blue-500/15

                          border
                          border-blue-500/20
                        "
                      />

                    )

                  }

                  <div
                    className="
                      relative
                      z-10

                      flex
                      flex-col

                      items-center
                    "
                  >

                    <Icon

                      size={22}

                      strokeWidth={2.5}

                      className={

                        active

                        ?

                        "text-blue-400"

                        :

                        "text-zinc-500"

                      }

                    />

                    <span
                      className={`

                        text-[11px]
                        font-black

                        mt-1

                        ${
                          active

                          ?

                          "text-white"

                          :

                          "text-zinc-500"

                        }

                      `}
                    >

                      {item.name}

                    </span>

                  </div>

                </Link>

              );

            })

          }

        </div>

      </nav>

    </div>

  );

}
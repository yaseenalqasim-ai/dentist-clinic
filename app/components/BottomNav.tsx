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

export default function BottomNav(){

  const pathname =
    usePathname();

  const {
    role,
  } = useAuth();

  const hideNavbar =

    pathname === "/login"

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

        z-[100]
      "
    >

      {/* BACKDROP */}

      <div
        className="
          absolute
          inset-0

          bg-[#081120]/90

          backdrop-blur-2xl

          border-t
          border-white/10
        "
      />

      {/* NAV */}

      <nav
        className="
          relative

          h-[88px]

          px-2

          flex
          items-center
          justify-around
        "
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
                  flex
                  flex-col
                  items-center
                  justify-center

                  flex-1

                  relative
                "
              >

                <>

                  {

                    active && (

                      <div
                        className="
                          absolute

                          top-1

                          w-14
                          h-1.5

                          rounded-full

                          bg-[#4b6fff]

                          shadow-[0_0_20px_rgba(75,111,255,0.9)]
                        "
                      />

                    )

                  }

                  <div
                    className={`

                      w-14
                      h-14

                      rounded-[18px]

                      flex
                      items-center
                      justify-center

                      transition-all
                      duration-300

                      ${
                        active

                        ?

                        `
                        bg-gradient-to-br
                        from-[#3257ff]
                        to-[#5271ff]

                        text-white

                        shadow-[0_15px_35px_rgba(61,99,255,0.45)]
                        `

                        :

                        `
                        text-zinc-500
                        `
                      }

                    `}
                  >

                    <Icon
                      size={24}
                      strokeWidth={2.6}
                    />

                  </div>

                  <span
                    className={`

                      text-[12px]

                      mt-1

                      font-bold

                      transition-all

                      ${
                        active

                        ?

                        "text-[#4b6fff]"

                        :

                        "text-zinc-500"
                      }

                    `}
                  >

                    {item.name}

                  </span>

                </>

              </Link>

            );

          })

        }

      </nav>

    </div>

  );

}
"use client";

import "./globals.css";

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
} from "lucide-react";

function BottomNavbar(){

  const pathname =
    usePathname();

  const hideNavbar =

    pathname === "/login"

    ||

    pathname === "/create-user"

    ||

    pathname === "/unauthorized";

  const navItems = [

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

  if(hideNavbar){
    return null;
  }

  return(

    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-[#0d1730]
        border-t
        border-white/10
        backdrop-blur-xl
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
              pathname === item.href;

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
                    "text-[#4b6bff]"
                    :
                    "text-zinc-500"
                  }

                `}
              >

                <Icon
                  size={26}
                  strokeWidth={2.5}
                />

                <span
                  className="
                    text-xs
                    font-black
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
}:{
  children:React.ReactNode;
}){

  return(

    <html
      lang="ar"
      dir="rtl"
    >

      <body
        className="
          bg-[#071028]
          min-h-screen
        "
      >

        <div
          className="
            pb-28
          "
        >

          {children}

        </div>

        <BottomNavbar />

      </body>

    </html>

  );

}
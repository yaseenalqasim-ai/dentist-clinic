"use client";

import Link
from "next/link";

import {
  usePathname
} from "next/navigation";

import {
  useUser
} from "../context/UserContext";

export default function BottomNav(){

  const pathname =
    usePathname();

  const {
    currentUser
  } = useUser();

  const items:any[] = [

    {
      href:"/dashboard",
      label:"الرئيسية",
      icon:"🏠"
    },

    {
      href:"/calendar",
      label:"الحجوزات",
      icon:"📅"
    },

    {
      href:"/booking",
      label:"إضافة",
      icon:"➕"
    },

    {
      href:"/patients",
      label:"المرضى",
      icon:"🧑‍⚕️"
    }

  ];

  if(
    currentUser?.role ===
    "admin"
  ){

    items.push(

      {
        href:"/doctors",
        label:"الأطباء",
        icon:"👨‍⚕️"
      },

      {
        href:"/staff",
        label:"الموظفون",
        icon:"🧑‍💼"
      },

      {
        href:"/reports",
        label:"التقارير",
        icon:"📊"
      },

      {
        href:"/create-user",
        label:"مستخدم",
        icon:"👤"
      }

    );

  }

  items.push({

    href:"/settings",
    label:"الإعدادات",
    icon:"⚙️"

  });

  return(

    <nav
      style={navStyle}
    >

      {

        items.map((item)=>{

          const active =

            pathname ===
            item.href;

          return(

            <Link
              key={item.href}

              href={item.href}

              style={{

                ...itemStyle,

                transform:

                  active

                  ?

                  "translateY(-6px)"

                  :

                  "translateY(0)",

                background:

                  active

                  ?

                  "linear-gradient(135deg,#2563eb,#1d4ed8)"

                  :

                  "transparent",

                color:

                  active

                  ?

                  "white"

                  :

                  "#6b7280",

                boxShadow:

                  active

                  ?

                  "0 10px 20px rgba(37,99,235,0.25)"

                  :

                  "none"

              }}
            >

              <div
                style={{
                  fontSize:"24px",
                  marginBottom:"6px"
                }}
              >

                {
                  item.icon
                }

              </div>

              <div
                style={{
                  fontSize:"12px",
                  fontWeight:"bold",
                  textAlign:"center",
                  lineHeight:"1.3"
                }}
              >

                {
                  item.label
                }

              </div>

            </Link>

          );

        })

      }

    </nav>

  );

}

const navStyle:any = {

  position:"fixed",

  bottom:"10px",

  right:"10px",

  left:"10px",

  background:"rgba(255,255,255,0.95)",

  backdropFilter:"blur(14px)",

  borderRadius:"28px",

  padding:"10px",

  display:"grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(70px,1fr))",

  gap:"8px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.12)",

  zIndex:9999
};

const itemStyle:any = {

  textDecoration:"none",

  padding:"12px 6px",

  borderRadius:"20px",

  display:"flex",

  flexDirection:"column",

  alignItems:"center",

  justifyContent:"center",

  transition:"0.25s",

  minHeight:"74px"
};
"use client";

import AuthGuard
from "../components/AuthGuard";

import RoleGuard
from "../components/RoleGuard";

import BottomNav
from "../components/BottomNav";

import {
  useUser
} from "../context/UserContext";

export default function AdminPage(){

  const {
    currentUser
  } = useUser();

  return(

    <AuthGuard>

      <RoleGuard
        allow={["admin"]}
      >

        <main
          dir="rtl"

          style={{
            minHeight:"100vh",
            background:"#f3f6fb",
            padding:"14px",
            paddingBottom:"100px"
          }}
        >

          <div
            style={{
              background:
                "linear-gradient(135deg,#111827,#1f2937)",

              borderRadius:"30px",

              padding:"28px",

              color:"white",

              marginBottom:"20px"
            }}
          >

            <h1
              style={{
                fontSize:"34px",
                marginBottom:"12px"
              }}
            >

              👑 لوحة الأدمن

            </h1>

            <p
              style={{
                opacity:0.9,
                lineHeight:"1.8"
              }}
            >

              مرحباً {

                currentUser?.name ||

                "Admin"

              }

            </p>

          </div>

          <div
            style={{
              display:"grid",
              gap:"16px"
            }}
          >

            <div style={cardStyle}>

              <div style={iconStyle}>
                👨‍⚕️
              </div>

              <div>

                <h2 style={titleStyle}>
                  إدارة الأطباء
                </h2>

                <p style={textStyle}>
                  إنشاء وتعديل حسابات الأطباء
                </p>

              </div>

            </div>

            <div style={cardStyle}>

              <div style={iconStyle}>
                🧑‍💼
              </div>

              <div>

                <h2 style={titleStyle}>
                  إدارة الموظفين
                </h2>

                <p style={textStyle}>
                  التحكم بحسابات السكرتارية
                </p>

              </div>

            </div>

            <div style={cardStyle}>

              <div style={iconStyle}>
                🔒
              </div>

              <div>

                <h2 style={titleStyle}>
                  الصلاحيات
                </h2>

                <p style={textStyle}>
                  إدارة الوصول والقيود
                </p>

              </div>

            </div>

            <div style={cardStyle}>

              <div style={iconStyle}>
                ⚙️
              </div>

              <div>

                <h2 style={titleStyle}>
                  إعدادات النظام
                </h2>

                <p style={textStyle}>
                  التحكم بإعدادات العيادة
                </p>

              </div>

            </div>

          </div>

          <BottomNav />

        </main>

      </RoleGuard>

    </AuthGuard>

  );

}

const cardStyle:any = {

  background:"white",

  borderRadius:"24px",

  padding:"22px",

  display:"flex",

  alignItems:"center",

  gap:"18px",

  boxShadow:
    "0 4px 14px rgba(0,0,0,0.06)"
};

const iconStyle:any = {

  width:"64px",

  height:"64px",

  borderRadius:"18px",

  background:"#eef2ff",

  display:"flex",

  alignItems:"center",

  justifyContent:"center",

  fontSize:"28px"
};

const titleStyle:any = {

  fontSize:"22px",

  marginBottom:"8px"
};

const textStyle:any = {

  color:"#6b7280",

  lineHeight:"1.8"
};
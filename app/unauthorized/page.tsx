"use client";

import Link
from "next/link";

export default function UnauthorizedPage(){

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(135deg,#111827,#1f2937)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        padding:"20px"
      }}
    >

      <div
        style={{
          width:"100%",
          maxWidth:"500px",

          background:"white",

          borderRadius:"30px",

          padding:"40px",

          textAlign:"center",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.15)"
        }}
      >

        <div
          style={{
            fontSize:"90px",
            marginBottom:"20px"
          }}
        >

          🔒

        </div>

        <h1
          style={{
            fontSize:"42px",
            marginBottom:"16px",
            color:"#111827"
          }}
        >

          غير مصرح

        </h1>

        <p
          style={{
            color:"#6b7280",
            marginBottom:"30px",
            lineHeight:"2"
          }}
        >

          ليس لديك صلاحية للوصول إلى هذه الصفحة

        </p>

        <Link
          href="/dashboard"

          style={{
            display:"inline-block",

            background:"#111827",

            color:"white",

            textDecoration:"none",

            padding:"16px 24px",

            borderRadius:"16px",

            fontWeight:"bold"
          }}
        >

          العودة للرئيسية

        </Link>

      </div>

    </main>

  );

}
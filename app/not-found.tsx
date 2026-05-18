"use client";

import Link
from "next/link";

export default function NotFoundPage(){

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(135deg,#2563eb,#1d4ed8)",

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

          😵

        </div>

        <h1
          style={{
            fontSize:"60px",
            marginBottom:"12px",
            color:"#111827"
          }}
        >

          404

        </h1>

        <p
          style={{
            color:"#6b7280",
            marginBottom:"30px",
            lineHeight:"2"
          }}
        >

          الصفحة التي تحاول الوصول إليها غير موجودة

        </p>

        <Link
          href="/dashboard"

          style={{
            display:"inline-block",

            background:"#2563eb",

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
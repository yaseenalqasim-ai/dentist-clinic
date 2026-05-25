"use client";

import Link
from "next/link";

export default function Layout({

  children,
  title

}:any){

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        display:"flex",

        color:"white"
      }}
    >

      {/* SIDEBAR */}

      <aside
        style={{
          width:"260px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(12px)",

          padding:"25px",

          borderLeft:
            "1px solid rgba(255,255,255,0.1)"
        }}
      >

        <h1
          style={{
            fontSize:"30px",

            marginBottom:"40px"
          }}
        >

          🦷 Clinic

        </h1>

        <div
          style={{
            display:"grid",

            gap:"15px"
          }}
        >

          <Link
            href="/"

            style={linkStyle}
          >

            🏠 الرئيسية

          </Link>

          <Link
            href="/booking"

            style={linkStyle}
          >

            📅 الحجز

          </Link>

          <Link
            href="/doctor"

            style={linkStyle}
          >

            👨‍⚕️ الدكتور

          </Link>

          <Link
            href="/secretary"

            style={linkStyle}
          >

            🧾 السكرتير

          </Link>

          <Link
            href="/calendar"

            style={linkStyle}
          >

            📆 التقويم

          </Link>

          <Link
            href="/admin"

            style={linkStyle}
          >

            ⚙️ الإدارة

          </Link>

        </div>

      </aside>

      {/* CONTENT */}

      <section
        style={{
          flex:1,

          padding:"30px"
        }}
      >

        {/* NAVBAR */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            padding:"20px",

            borderRadius:"25px",

            marginBottom:"30px",

            backdropFilter:
              "blur(10px)"
          }}
        >

          <h1
            style={{
              fontSize:"35px"
            }}
          >

            {title}

          </h1>

        </div>

        {children}

      </section>

    </main>

  );

}

const linkStyle:any = {

  background:
    "rgba(255,255,255,0.08)",

  padding:"18px",

  borderRadius:"18px",

  textDecoration:"none",

  color:"white",

  fontSize:"20px"
};
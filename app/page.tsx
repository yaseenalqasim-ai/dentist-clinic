"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial",
        gap: "20px",
      }}
    >
      <h1>Dental Clinic System</h1>

      <Link href="/doctor">
        <button
          style={{
            padding: "15px",
            width: "250px",
            fontSize: "18px",
          }}
        >
          صفحة الطبيب
        </button>
      </Link>

      <Link href="/secretary">
        <button
          style={{
            padding: "15px",
            width: "250px",
            fontSize: "18px",
          }}
        >
          صفحة السكرتيرة
        </button>
      </Link>

      <Link href="/reports">
        <button
          style={{
            padding: "15px",
            width: "250px",
            fontSize: "18px",
          }}
        >
          التقارير
        </button>
      </Link>
    </main>
  );
}
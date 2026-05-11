"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#2563eb",
          }}
        >
          Dental Clinic System
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Link href="/doctor">
            <button style={buttonStyle}>
              صفحة الطبيب
            </button>
          </Link>

          <Link href="/secretary">
            <button style={buttonStyle}>
              صفحة السكرتيرة
            </button>
          </Link>

          <Link href="/reports">
            <button style={buttonStyle}>
              التقارير
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "15px",
  fontSize: "18px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};
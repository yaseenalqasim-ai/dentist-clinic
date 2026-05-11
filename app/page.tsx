"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("data");

    if (saved) {
      setData(saved);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <h1>Dentist Clinic</h1>

      <input
        type="text"
        placeholder="اكتب شيئاً"
        value={data}
        onChange={(e) => {
          setData(e.target.value);
          window.localStorage.setItem("data", e.target.value);
        }}
        style={{
          padding: "10px",
          marginTop: "20px",
          width: "300px",
        }}
      />

      <p style={{ marginTop: "20px" }}>
        القيمة المحفوظة: {data}
      </p>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function SecretaryPage() {
  const [patients, setPatients] = useState<string[]>([]);
  const [name, setName] = useState("");

  function addPatient() {
    if (!name) return;

    setPatients([...patients, name]);
    setName("");
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        صفحة السكرتيرة
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "500px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="اسم المريض"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={addPatient}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          إضافة مريض
        </button>

        <div style={{ marginTop: "30px" }}>
          <h2>المرضى:</h2>

          {patients.map((patient, index) => (
            <div
              key={index}
              style={{
                background: "#e5e7eb",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              {patient}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
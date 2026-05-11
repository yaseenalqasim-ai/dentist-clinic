"use client";

import { useState } from "react";

export default function SecretaryPage() {
  const [patients, setPatients] = useState<string[]>([]);
  const [name, setName] = useState("");

  const addPatient = () => {
    if (name.trim() === "") return;

    setPatients([...patients, name]);
    setName("");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2563eb" }}>
        صفحة السكرتيرة
      </h1>

      <input
        type="text"
        placeholder="اسم المريض"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginTop: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          display: "block",
        }}
      />

      <button
        onClick={addPatient}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        إضافة مريض
      </button>

      <div style={{ marginTop: "30px" }}>
        {patients.map((patient, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            {patient}
          </div>
        ))}
      </div>
    </div>
  );
}
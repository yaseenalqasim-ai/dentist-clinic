"use client";

import { useState } from "react";

export default function DoctorPage() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const saveAppointment = () => {
    const appointments =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    appointments.push({
      name,
      time,
    });

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    alert("تم الحجز بنجاح");

    setName("");
    setTime("");
  };

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>صفحة الحجز</h1>

      <input
        placeholder="اسم المريض"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px",
          width: "300px",
        }}
      />

      <input
        placeholder="وقت الحجز"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{
          display: "block",
          marginTop: "20px",
          padding: "10px",
          width: "300px",
        }}
      />

      <button
        onClick={saveAppointment}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "200px",
        }}
      >
        حفظ الحجز
      </button>
    </main>
  );
}
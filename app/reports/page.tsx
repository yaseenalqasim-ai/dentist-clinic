"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    setAppointments(data);
  }, []);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>التقارير</h1>

      <h2>عدد الحجوزات: {appointments.length}</h2>

      {appointments.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <p>المريض: {item.name}</p>
          <p>الوقت: {item.time}</p>
        </div>
      ))}
    </main>
  );
}
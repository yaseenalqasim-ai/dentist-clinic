"use client";

import { useEffect, useState } from "react";

export default function SecretaryPage() {
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
      <h1>صفحة السكرتيرة</h1>

      {appointments.length === 0 ? (
        <p>لا توجد حجوزات</p>
      ) : (
        appointments.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <p>اسم المريض: {item.name}</p>
            <p>وقت الحجز: {item.time}</p>
          </div>
        ))
      )}
    </main>
  );
}
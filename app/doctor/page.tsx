"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedPatients =
      JSON.parse(
        localStorage.getItem("patients") || "[]"
      );

    setPatients(savedPatients);

  }, []);

  const activePatients =
    patients.filter(
      (p) =>
        p.status !== "🟢 تم التنفيذ" &&
        p.status !== "🔴 حجز ملغي"
    );

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "#111827"
          : "#f3f4f6",

        color: darkMode
          ? "white"
          : "black",

        padding: "25px",

        fontFamily: "sans-serif",
      }}
    >

      {/* الأعلى */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >

        <h1
          style={{
            color: "#2563eb",
          }}
        >
          واجهة الدكتور
        </h1>

        {/* الثيم */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{
            border: "none",

            background: "transparent",

            fontSize: "30px",

            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* عدد المرضى */}
      <div
        style={{
          marginTop: "20px",

          background: darkMode
            ? "#1f2937"
            : "white",

          padding: "20px",

          borderRadius: "15px",

          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>
          عدد الحجوزات الحالية:
          {" "}
          {activePatients.length}
        </h2>
      </div>

      {/* المرضى */}
      <div
        style={{
          marginTop: "30px",

          display: "grid",

          gap: "20px",
        }}
      >

        {activePatients.map(
          (patient, index) => (
            <div
              key={index}

              style={{
                background: darkMode
                  ? "#1f2937"
                  : "white",

                padding: "20px",

                borderRadius: "15px",

                boxShadow:
                  "0 0 10px rgba(0,0,0,0.1)",

                position: "relative",
              }}
            >

              {/* الحالة */}
              <div
                style={{
                  position: "absolute",

                  top: "20px",

                  left: "20px",

                  background: "#e5e7eb",

                  padding: "10px",

                  borderRadius: "10px",

                  color: "black",

                  fontWeight: "bold",
                }}
              >
                {patient.status}
              </div>

              <p>
                <strong>
                  👤 الاسم:
                </strong>{" "}

                {patient.name}
              </p>

              <p>
                <strong>
                  📞 الرقم:
                </strong>{" "}

                {patient.phone}
              </p>

              <p>
                <strong>
                  🦷 المراجعة:
                </strong>{" "}

                {patient.visitType ===
                "زيارة أولى"
                  ? `زيارة أولى ← ${patient.firstVisitType}`
                  : patient.visitType}
              </p>

              <p>
                <strong>
                  🚨 الأمراض:
                </strong>{" "}

                {patient.disease}
              </p>

              <p>
                <strong>
                  ❗️ الشكوى:
                </strong>{" "}

                {patient.complaint}
              </p>

              <p>
                <strong>
                  🗓️ الموعد:
                </strong>{" "}

                {patient.date}
              </p>

              {/* أزرار */}
              <div
                style={{
                  display: "flex",

                  gap: "10px",

                  marginTop: "20px",

                  flexWrap: "wrap",
                }}
              >

                {/* واتساب */}
                <a
                  href={`https://wa.me/${patient.phone}`}

                  target="_blank"

                  style={{
                    flex: 1,

                    background: "#25D366",

                    color: "white",

                    textDecoration: "none",

                    borderRadius: "10px",

                    padding: "12px",

                    textAlign: "center",

                    fontWeight: "bold",
                  }}
                >
                  واتساب 💬
                </a>

                {/* بدء العلاج */}
                <button
                  style={{
                    flex: 1,

                    background: "#2563eb",

                    color: "white",

                    border: "none",

                    borderRadius: "10px",

                    padding: "12px",

                    cursor: "pointer",

                    fontWeight: "bold",
                  }}
                >
                  بدء العلاج
                </button>

              </div>
            </div>
          )
        )}

        {activePatients.length === 0 && (
          <div
            style={{
              background: darkMode
                ? "#1f2937"
                : "white",

              padding: "25px",

              borderRadius: "15px",

              textAlign: "center",

              boxShadow:
                "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            لا توجد حجوزات حالية
          </div>
        )}

      </div>
    </main>
  );
}
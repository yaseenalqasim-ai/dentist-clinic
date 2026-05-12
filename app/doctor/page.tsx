"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState<any>(null);

  const [doctorNotes, setDoctorNotes] =
    useState("");

  const [treatmentPlan, setTreatmentPlan] =
    useState("");

  const [medicine, setMedicine] =
    useState("");

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

  function openPatient(patient: any) {

    setSelectedPatient(patient);

    setDoctorNotes(
      patient.doctorNotes || ""
    );

    setTreatmentPlan(
      patient.treatmentPlan || ""
    );

    setMedicine(
      patient.medicine || ""
    );
  }

  function saveMedicalData() {

    const updatedPatients =
      patients.map((p) => {

        if (
          p.phone === selectedPatient.phone
        ) {
          return {
            ...p,

            doctorNotes,

            treatmentPlan,

            medicine,
          };
        }

        return p;
      });

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

    alert("تم حفظ الملف الطبي");

  }

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

      {/* عدد الحجوزات */}
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

              {/* الأزرار */}
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

                {/* الملف الطبي */}
                <button
                  onClick={() =>
                    openPatient(patient)
                  }

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
                  الملف الطبي
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

      {/* الملف الطبي */}
      {selectedPatient && (
        <div
          style={{
            marginTop: "40px",

            background: darkMode
              ? "#1f2937"
              : "white",

            padding: "25px",

            borderRadius: "20px",

            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            الملف الطبي:
            {" "}
            {selectedPatient.name}
          </h2>

          <textarea
            placeholder="ملاحظات الطبيب"

            value={doctorNotes}

            onChange={(e) =>
              setDoctorNotes(
                e.target.value
              )
            }

            style={textareaStyle}
          />

          <textarea
            placeholder="الخطة العلاجية"

            value={treatmentPlan}

            onChange={(e) =>
              setTreatmentPlan(
                e.target.value
              )
            }

            style={textareaStyle}
          />

          <textarea
            placeholder="الوصفة الطبية"

            value={medicine}

            onChange={(e) =>
              setMedicine(
                e.target.value
              )
            }

            style={textareaStyle}
          />

          <button
            onClick={saveMedicalData}

            style={{
              background: "green",

              color: "white",

              border: "none",

              padding: "15px",

              borderRadius: "10px",

              cursor: "pointer",

              width: "100%",

              fontWeight: "bold",

              marginTop: "10px",
            }}
          >
            حفظ الملف الطبي
          </button>

        </div>
      )}

    </main>
  );
}

const textareaStyle = {
  width: "100%",

  minHeight: "120px",

  marginTop: "15px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  padding: "15px",

  fontSize: "16px",

  color: "black",
};
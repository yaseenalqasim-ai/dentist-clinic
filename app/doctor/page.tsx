"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [darkMode, setDarkMode] =
    useState(false);

  const [patients, setPatients] =
    useState<any[]>([]);

  const [selectedPatient, setSelectedPatient] =
    useState<any>(null);

  const [doctorNote, setDoctorNote] =
    useState("");

  useEffect(() => {

    const savedMode =
      localStorage.getItem("doctorDarkMode");

    if (savedMode === "true") {
      setDarkMode(true);
    }

    const savedPatients =
      localStorage.getItem("patients");

    if (savedPatients) {

      setPatients(
        JSON.parse(savedPatients)
      );

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "doctorDarkMode",
      String(darkMode)
    );

  }, [darkMode]);

  const savePatients = (
    updatedPatients: any[]
  ) => {

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

  };

  const updatePatientStatus = (
    index: number,
    newStatus: string
  ) => {

    const updated =
      [...patients];

    updated[index].status =
      newStatus;

    savePatients(updated);

  };

  const saveDoctorNote = () => {

    if (!selectedPatient) return;

    const updated =
      [...patients];

    updated[selectedPatient.index]
      .doctorNote = doctorNote;

    savePatients(updated);

    alert(
      "تم حفظ الملاحظة بنجاح ✅"
    );

    setSelectedPatient(null);

    setDoctorNote("");

  };

  return (

    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          darkMode ? "#111827" : "#f3f4f6",
        padding: "25px",
        color:
          darkMode ? "white" : "black",
        transition: "0.3s"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold"
          }}
        >
          واجهة الدكتور
        </h1>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "22px",
            background:
              darkMode ? "#facc15" : "#111827",
            color:
              darkMode ? "black" : "white"
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {patients.map(
          (
            patient,
            index
          ) => (

            <div
              key={index}
              style={{
                background:
                  darkMode
                    ? "#1f2937"
                    : "white",
                borderRadius: "25px",
                padding: "25px",
                boxShadow:
                  "0 0 20px rgba(0,0,0,0.1)"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "10px"
                }}
              >

                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}
                >
                  👤 {patient.name}
                </div>

                <select
                  value={
                    patient.status
                  }
                  onChange={(e) =>
                    updatePatientStatus(
                      index,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "10px",
                    borderRadius:
                      "12px",
                    fontSize: "16px"
                  }}
                >

                  <option>
                    🔵 حجز مُثبّت
                  </option>

                  <option>
                    📍 تم الوصول
                  </option>

                  <option>
                    🟡 حجز مؤجّل
                  </option>

                  <option>
                    🔴 حجز ملغي
                  </option>

                  <option>
                    🟢 تم التنفيذ
                  </option>

                </select>

              </div>

              <div
                style={{
                  lineHeight: "2",
                  fontSize: "18px"
                }}
              >

                <div>
                  📞 {patient.phone}
                </div>

                <div>
                  🦷 {patient.visit}
                </div>

                <div>
                  🚨 {patient.disease}
                </div>

                <div>
                  ❗ {patient.problem}
                </div>

                <div>
                  📅 {patient.date}
                </div>

              </div>

              {patient.doctorNote && (

                <div
                  style={{
                    marginTop: "20px",
                    background:
                      darkMode
                        ? "#374151"
                        : "#ede9fe",
                    padding: "15px",
                    borderRadius:
                      "15px"
                  }}
                >
                  📝 ملاحظة الدكتور:
                  <br />
                  {
                    patient.doctorNote
                  }
                </div>

              )}

              <button
                onClick={() => {

                  setSelectedPatient({
                    ...patient,
                    index
                  });

                  setDoctorNote(
                    patient.doctorNote ||
                    ""
                  );

                }}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "none",
                  background:
                    "#8b5cf6",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                📝 إدخال ملاحظة
              </button>

            </div>

          )
        )}

      </div>

      {selectedPatient && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >

          <div
            style={{
              width: "95%",
              maxWidth: "700px",
              background:
                darkMode
                  ? "#1f2937"
                  : "white",
              borderRadius: "30px",
              padding: "25px"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >

              <h2
                style={{
                  fontSize: "35px",
                  fontWeight: "bold"
                }}
              >
                ملاحظات الدكتور
              </h2>

              <button
                onClick={() =>
                  setSelectedPatient(
                    null
                  )
                }
                style={{
                  background:
                    "none",
                  border: "none",
                  fontSize: "35px",
                  cursor: "pointer",
                  color:
                    darkMode
                      ? "white"
                      : "black"
                }}
              >
                ×
              </button>

            </div>

            <textarea
              placeholder="اكتب رسالتك هنا..."
              value={doctorNote}
              onChange={(e) =>
                setDoctorNote(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "25px",
                border:
                  "2px solid #8b5cf6",
                padding: "20px",
                fontSize: "22px",
                resize: "none",
                marginBottom: "25px",
                background:
                  darkMode
                    ? "#374151"
                    : "#f5f3ff",
                color:
                  darkMode
                    ? "white"
                    : "black"
              }}
            />

            <div
              style={{
                border:
                  "3px dashed #8b5cf6",
                borderRadius: "25px",
                padding: "40px",
                textAlign: "center",
                marginBottom: "25px"
              }}
            >

              <div
                style={{
                  fontSize: "50px",
                  marginBottom: "15px"
                }}
              >
                ☁️
              </div>

              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "10px"
                }}
              >
                اسحب الملفات هنا
                أو اضغط للاختيار
              </div>

              <div
                style={{
                  opacity: 0.7,
                  fontSize: "18px"
                }}
              >
                JPG, PNG, PDF
              </div>

              <input
                type="file"
                multiple
                style={{
                  marginTop: "20px"
                }}
              />

            </div>

            <button
              onClick={
                saveDoctorNote
              }
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "18px",
                border: "none",
                background:
                  "#2563eb",
                color: "white",
                fontSize: "22px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              حفظ الملاحظة
            </button>

          </div>

        </div>

      )}

    </main>

  );

}
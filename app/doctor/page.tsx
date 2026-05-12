"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [darkMode, setDarkMode] =
    useState(false);

  const [showNotes, setShowNotes] =
    useState(false);

  const [patientName, setPatientName] =
    useState("");

  const [patientPhone, setPatientPhone] =
    useState("");

  const [note, setNote] =
    useState("");

  const [status, setStatus] =
    useState("🔵 حجز مُثبّت");

  useEffect(() => {

    const savedMode =
      localStorage.getItem("doctorDarkMode");

    if (savedMode === "true") {
      setDarkMode(true);
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "doctorDarkMode",
      String(darkMode)
    );

  }, [darkMode]);

  return (

    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          darkMode ? "#111827" : "#f3f4f6",
        color:
          darkMode ? "white" : "black",
        padding: "25px",
        transition: "0.3s"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "35px",
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
          background:
            darkMode ? "#1f2937" : "white",
          borderRadius: "25px",
          padding: "25px",
          maxWidth: "750px",
          margin: "auto",
          boxShadow:
            "0 0 20px rgba(0,0,0,0.1)"
        }}
      >

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <div
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            حالة الحجز
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "15px",
              border: "1px solid #ccc",
              fontSize: "18px",
              background:
                darkMode
                  ? "#374151"
                  : "white",
              color:
                darkMode
                  ? "white"
                  : "black"
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

        <input
          type="text"
          placeholder="👤 اسم المريض"
          value={patientName}
          onChange={(e) =>
            setPatientName(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            fontSize: "18px",
            background:
              darkMode
                ? "#374151"
                : "white",
            color:
              darkMode
                ? "white"
                : "black"
          }}
        />

        <input
          type="text"
          placeholder="📞 رقم المريض"
          value={patientPhone}
          onChange={(e) =>
            setPatientPhone(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            marginBottom: "25px",
            fontSize: "18px",
            background:
              darkMode
                ? "#374151"
                : "white",
            color:
              darkMode
                ? "white"
                : "black"
          }}
        />

        <button
          onClick={() =>
            setShowNotes(true)
          }
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background: "#8b5cf6",
            color: "white",
            fontSize: "22px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📝 إدخال ملاحظة
        </button>

      </div>

      {showNotes && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
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
                  setShowNotes(false)
                }
                style={{
                  background: "none",
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
              value={note}
              onChange={(e) =>
                setNote(
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
                  fontSize: "55px",
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

            <div
              style={{
                display: "flex",
                gap: "15px"
              }}
            >

              <button
                onClick={() => {

                  alert(
                    "تم حفظ الملاحظة بنجاح ✅"
                  );

                  setShowNotes(false);

                }}
                style={{
                  flex: 1,
                  padding: "18px",
                  borderRadius: "18px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  fontSize: "22px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                حفظ
              </button>

              <button
                onClick={() =>
                  setShowNotes(false)
                }
                style={{
                  flex: 1,
                  padding: "18px",
                  borderRadius: "18px",
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  fontSize: "22px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}
"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editPhone, setEditPhone] =
    useState("");

  const [editVisit, setEditVisit] =
    useState("");

  const [editDisease, setEditDisease] =
    useState("");

  const [editComplaint, setEditComplaint] =
    useState("");

  const [editDate, setEditDate] =
    useState("");

  const [editNote, setEditNote] =
    useState("");

  const [image, setImage] =
    useState<string | null>(null);

  useEffect(() => {

    const savedPatients =
      localStorage.getItem("patients");

    if (savedPatients) {

      setPatients(
        JSON.parse(savedPatients)
      );

    }

    const savedTheme =
      localStorage.getItem("doctor-theme");

    if (savedTheme === "dark") {

      setDarkMode(true);

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "doctor-theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  const openModal = (
    patient: any,
    index: number
  ) => {

    setSelectedIndex(index);

    setEditName(patient.name || "");

    setEditPhone(patient.phone || "");

    setEditVisit(
      patient.visitType || ""
    );

    setEditDisease(
      patient.disease || ""
    );

    setEditComplaint(
      patient.complaint || ""
    );

    setEditDate(patient.date || "");

    setEditNote(patient.note || "");

    setImage(patient.image || null);

    setShowModal(true);

  };

  const handleImageUpload = (
    e: any
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setImage(
        reader.result as string
      );

    };

    reader.readAsDataURL(file);

  };

  const savePatient = () => {

    if (selectedIndex === null) return;

    const updatedPatients =
      [...patients];

    updatedPatients[selectedIndex] = {

      ...updatedPatients[selectedIndex],

      name: editName,

      phone: editPhone,

      visitType: editVisit,

      disease: editDisease,

      complaint: editComplaint,

      date: editDate,

      note: editNote,

      image: image,

    };

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

    setShowModal(false);

  };

  const changeStatus = (
    index: number,
    status: string
  ) => {

    const updatedPatients =
      [...patients];

    updatedPatients[index].status =
      status;

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

  };

  return (

    <main
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "#0f172a"
          : "#f1f5f9",

        padding: "25px",

        direction: "rtl",

        transition: "0.3s",
      }}
    >

      {/* الأعلى */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "30px",
        }}
      >

        <h1
          style={{
            color: darkMode
              ? "white"
              : "black",

            fontSize: "55px",

            fontWeight: "bold",
          }}
        >
          واجهة الدكتور
        </h1>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{
            width: "70px",

            height: "70px",

            borderRadius: "50%",

            border: "none",

            fontSize: "30px",

            cursor: "pointer",

            background: darkMode
              ? "#facc15"
              : "#111827",

            color: darkMode
              ? "#000"
              : "#fff",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      {/* الحجوزات */}
      {patients.map(
        (patient, index) => (

          <div
            key={index}

            style={{
              background: darkMode
                ? "#1e293b"
                : "#ffffff",

              color: darkMode
                ? "#ffffff"
                : "#000000",

              padding: "25px",

              borderRadius: "30px",

              marginBottom: "25px",

              boxShadow:
                "0 0 25px rgba(0,0,0,0.15)",
            }}
          >

            {/* الحالة */}
            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                marginBottom: "20px",
              }}
            >

              <select
                value={patient.status}

                onChange={(e) =>
                  changeStatus(
                    index,
                    e.target.value
                  )
                }

                style={{
                  padding: "12px",

                  borderRadius:
                    "14px",

                  border: "none",

                  fontSize: "20px",
                }}
              >

                <option>
                  🔵 حجز مثبت
                </option>

                <option>
                  📍 تم الوصول
                </option>

                <option>
                  🟡 حجز مؤجل
                </option>

                <option>
                  🔴 حجز ملغي
                </option>

                <option>
                  🟢 تم التنفيذ
                </option>

              </select>

              <div
                style={{
                  fontSize: "24px",

                  fontWeight: "bold",
                }}
              >
                {patient.status}
              </div>

            </div>

            {/* المعلومات */}
            <div
              style={{
                fontSize: "25px",

                lineHeight: "2.3",

                fontWeight: "bold",
              }}
            >

              👤 الاسم:
              {" "}
              {patient.name}

              <br />

              📞 الرقم:
              {" "}
              {patient.phone}

              <br />

              🦷 المراجعة:
              {" "}
              {patient.visitType}

              <br />

              🚨 الأمراض:
              {" "}
              {patient.disease}

              <br />

              ❗️ الشكوى:
              {" "}
              {patient.complaint}

              <br />

              🗓️ الموعد:
              {" "}
              {patient.date}

            </div>

            {/* الملاحظة */}
            {patient.note && (

              <div
                style={{
                  marginTop: "20px",

                  background: darkMode
                    ? "#334155"
                    : "#f8fafc",

                  padding: "20px",

                  borderRadius: "20px",

                  fontSize: "22px",
                }}
              >

                📝 ملاحظة الدكتور:

                <br />

                {patient.note}

              </div>

            )}

            {/* الصورة */}
            {patient.image && (

              <img
                src={patient.image}

                style={{
                  width: "100%",

                  marginTop: "20px",

                  borderRadius: "20px",
                }}
              />

            )}

            {/* زر الملاحظات */}
            <button
              onClick={() =>
                openModal(
                  patient,
                  index
                )
              }

              style={{
                marginTop: "25px",

                width: "100%",

                padding: "18px",

                border: "none",

                borderRadius: "18px",

                background:
                  "linear-gradient(to left,#9333ea,#a855f7)",

                color: "white",

                fontSize: "24px",

                fontWeight: "bold",

                cursor: "pointer",
              }}
            >

              📝 إدخال ملاحظة

            </button>

          </div>

        )
      )}

      {/* النافذة */}
      {showModal && (

        <div
          style={{
            position: "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.65)",

            display: "flex",

            justifyContent:
              "center",

            alignItems: "center",

            padding: "20px",

            zIndex: 999,
          }}
        >

          <div
            style={{
              background: darkMode
                ? "#1e293b"
                : "#ffffff",

              width: "100%",

              maxWidth: "750px",

              borderRadius: "30px",

              padding: "30px",

              maxHeight: "90vh",

              overflowY: "auto",
            }}
          >

            <h2
              style={{
                color: darkMode
                  ? "white"
                  : "black",

                fontSize: "40px",

                marginBottom: "25px",
              }}
            >

              📝 إدخال ملاحظة

            </h2>

            <textarea
              value={editNote}

              onChange={(e) =>
                setEditNote(
                  e.target.value
                )
              }

              placeholder="اكتب ملاحظات الدكتور هنا..."

              style={{
                width: "100%",

                height: "220px",

                borderRadius: "20px",

                padding: "20px",

                fontSize: "22px",

                resize: "none",

                border:
                  "2px solid #9333ea",

                background: darkMode
                  ? "#334155"
                  : "#f8fafc",

                color: darkMode
                  ? "white"
                  : "black",

                direction: "rtl",
              }}
            />

            {/* رفع صورة */}
            <div
              style={{
                marginTop: "25px",
              }}
            >

              <label
                style={{
                  display: "block",

                  background:
                    "#2563eb",

                  color: "white",

                  padding: "18px",

                  borderRadius:
                    "18px",

                  textAlign: "center",

                  fontSize: "22px",

                  cursor: "pointer",

                  fontWeight:
                    "bold",
                }}
              >

                📎 إدراج صورة أو ملف

                <input
                  type="file"

                  hidden

                  accept="image/*"

                  onChange={
                    handleImageUpload
                  }
                />

              </label>

            </div>

            {/* عرض الصورة */}
            {image && (

              <img
                src={image}

                style={{
                  width: "100%",

                  marginTop: "20px",

                  borderRadius: "20px",
                }}
              />

            )}

            {/* الأزرار */}
            <div
              style={{
                display: "flex",

                gap: "15px",

                marginTop: "25px",
              }}
            >

              <button
                onClick={savePatient}

                style={{
                  flex: 1,

                  padding: "18px",

                  borderRadius:
                    "18px",

                  border: "none",

                  background:
                    "#22c55e",

                  color: "white",

                  fontSize: "22px",

                  fontWeight:
                    "bold",

                  cursor: "pointer",
                }}
              >

                💾 حفظ

              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }

                style={{
                  flex: 1,

                  padding: "18px",

                  borderRadius:
                    "18px",

                  border: "none",

                  background:
                    "#ef4444",

                  color: "white",

                  fontSize: "22px",

                  fontWeight:
                    "bold",

                  cursor: "pointer",
                }}
              >

                ❌ إغلاق

              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}
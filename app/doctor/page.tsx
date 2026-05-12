"use client";

import { useEffect, useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

const firebaseConfig = {

  apiKey:
    "AIzaSyCIZdUmSX15w0CACuW4vfz9npsUi-L3lbg",

  authDomain:
    "dentist-clinic-476ac.firebaseapp.com",

  projectId:
    "dentist-clinic-476ac",

  storageBucket:
    "dentist-clinic-476ac.firebasestorage.app",

  messagingSenderId:
    "1013681862841",

  appId:
    "1:1013681862841:web:86643c3f3fa926389a8368",

  measurementId:
    "G-FW5T2FJ29R"
};

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingPatient, setEditingPatient] =
    useState<any>(null);

  const [note, setNote] =
    useState("");

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "doctor-theme"
      );

    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    loadPatients();

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "doctor-theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  async function loadPatients() {

    const querySnapshot =
      await getDocs(
        collection(db, "bookings")
      );

    const data: any[] = [];

    querySnapshot.forEach((docItem) => {

      data.push({
        id: docItem.id,
        ...docItem.data()
      });

    });

    setPatients(data);

  }

  async function changeStatus(
    id: string,
    status: string
  ) {

    await updateDoc(
      doc(db, "bookings", id),
      {
        status
      }
    );

    loadPatients();
  }

  async function saveNote() {

    await updateDoc(
      doc(
        db,
        "bookings",
        editingPatient.id
      ),
      {
        notes: note
      }
    );

    setShowModal(false);

    loadPatients();
  }

  return (

    <main
      dir="rtl"
      style={{
        minHeight: "100vh",

        background:
          darkMode
            ? "#071739"
            : "#f3f3f3",

        color:
          darkMode
            ? "white"
            : "black",

        padding: "20px"
      }}
    >

      {/* الأعلى */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "30px"
        }}
      >

        <h1>
          واجهة الدكتور
        </h1>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{
            width: "60px",

            height: "60px",

            borderRadius: "50%",

            border: "none",

            fontSize: "24px",

            cursor: "pointer"
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      {/* الحجوزات */}
      {patients.map((patient) => (

        <div
          key={patient.id}

          style={{
            background:
              darkMode
                ? "#102542"
                : "white",

            padding: "20px",

            borderRadius: "20px",

            marginBottom: "20px"
          }}
        >

          {/* الحالة */}
          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

              marginBottom: "20px"
            }}
          >

            <div
              style={{
                fontSize: "22px"
              }}
            >
              {patient.status}
            </div>

            <select
              value={patient.status}

              onChange={(e) =>
                changeStatus(
                  patient.id,
                  e.target.value
                )
              }

              style={{
                padding: "12px",

                borderRadius:
                  "12px",

                fontSize: "18px"
              }}
            >

              <option>
                🔵 حجز مُثبت
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

          </div>

          {/* المعلومات */}
          <div
            style={{
              lineHeight: "2.2",

              fontSize: "22px"
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
            {patient.review}

            <br />

            🚨 الأمراض:
            {" "}
            {patient.disease}

            <br />

            ❗ الشكوى:
            {" "}
            {patient.complaint}

            <br />

            🗓️ الموعد:
            {" "}
            {patient.date}

          </div>

          {/* الملاحظات */}
          {patient.notes && (

            <div
              style={{
                marginTop: "15px",

                background:
                  darkMode
                    ? "#1e293b"
                    : "#f3f3f3",

                padding: "15px",

                borderRadius: "12px"
              }}
            >

              📝
              {" "}
              {patient.notes}

            </div>

          )}

          {/* واتساب */}
          <a
            href={`https://wa.me/${patient.phone}`}

            target="_blank"

            style={{
              display: "block",

              marginTop: "20px",

              background: "#22c55e",

              color: "white",

              textAlign: "center",

              padding: "15px",

              borderRadius: "12px",

              textDecoration: "none",

              fontSize: "20px"
            }}
          >

            واتساب

          </a>

          {/* زر الملاحظات */}
          <button
            onClick={() => {

              setEditingPatient(
                patient
              );

              setNote(
                patient.notes || ""
              );

              setShowModal(true);

            }}

            style={{
              width: "100%",

              marginTop: "15px",

              background:
                "#7c3aed",

              color: "white",

              border: "none",

              padding: "15px",

              borderRadius: "12px",

              fontSize: "20px",

              cursor: "pointer"
            }}
          >

            📝 إدخال ملاحظة

          </button>

        </div>

      ))}

      {/* نافذة الملاحظات */}
      {showModal && (

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

            zIndex: 999
          }}
        >

          <div
            style={{
              width: "90%",

              maxWidth: "700px",

              background:
                darkMode
                  ? "#102542"
                  : "white",

              borderRadius: "20px",

              padding: "20px"
            }}
          >

            <h2>
              إدخال ملاحظة
            </h2>

            <textarea
              value={note}

              onChange={(e) =>
                setNote(
                  e.target.value
                )
              }

              style={{
                width: "100%",

                height: "200px",

                marginTop: "20px",

                borderRadius: "12px",

                padding: "15px",

                fontSize: "20px"
              }}
            />

            <div
              style={{
                display: "flex",

                gap: "10px",

                marginTop: "20px"
              }}
            >

              <button
                onClick={saveNote}

                style={{
                  flex: 1,

                  background:
                    "#2563eb",

                  color: "white",

                  border: "none",

                  padding: "15px",

                  borderRadius:
                    "12px",

                  fontSize: "20px"
                }}
              >

                حفظ

              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }

                style={{
                  flex: 1,

                  background:
                    "red",

                  color: "white",

                  border: "none",

                  padding: "15px",

                  borderRadius:
                    "12px",

                  fontSize: "20px"
                }}
              >

                إغلاق

              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}
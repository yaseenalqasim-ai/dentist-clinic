"use client";

import { useEffect, useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
 onSnapshot
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

export default function HomePage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  useEffect(() => {

    onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {

        const data: any[] = [];

        snapshot.forEach((docItem) => {

          data.push({
            id: docItem.id,
            ...docItem.data()
          });

        });

        setPatients(data);

      }
    );

  }, []);

  const completed =
    patients.filter(
      (p) =>
        p.status ===
        "🟢 تم التنفيذ"
    ).length;

  const cancelled =
    patients.filter(
      (p) =>
        p.status ===
        "🔴 حجز ملغي"
    ).length;

  const delayed =
    patients.filter(
      (p) =>
        p.status ===
        "🟡 حجز مؤجل"
    ).length;

  const confirmed =
    patients.filter(
      (p) =>
        p.status ===
        "🔵 حجز مُثبت"
    ).length;

  return (

    <main
      dir="rtl"

      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        padding: "20px",

        color: "white"
      }}
    >

      {/* العنوان */}
      <div
        style={{
          textAlign: "center",

          marginBottom: "50px"
        }}
      >

        <h1
          style={{
            fontSize: "60px",

            marginBottom: "15px"
          }}
        >

          🦷 نظام العيادة

        </h1>

        <p
          style={{
            fontSize: "24px",

            color: "#ddd"
          }}
        >

          لوحة التحكم الرئيسية

        </p>

      </div>

      {/* الإحصائيات */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "20px",

          marginBottom: "50px"
        }}
      >

        {[
          [
            "📅 جميع الحجوزات",
            patients.length,
            "#2563eb"
          ],

          [
            "🔵 الحجوزات المثبتة",
            confirmed,
            "#2563eb"
          ],

          [
            "🟢 تم التنفيذ",
            completed,
            "#22c55e"
          ],

          [
            "🔴 الحجوزات الملغية",
            cancelled,
            "#ef4444"
          ],

          [
            "🟡 الحجوزات المؤجلة",
            delayed,
            "#eab308"
          ]
        ].map(
          ([title, value, color]) => (

            <div
              key={String(title)}

              style={{
                background:
                  "rgba(255,255,255,0.08)",

                backdropFilter:
                  "blur(10px)",

                border:
                  `2px solid ${color}`,

                borderRadius: "25px",

                padding: "30px",

                textAlign: "center"
              }}
            >

              <h2
                style={{
                  fontSize: "28px"
                }}
              >

                {title}

              </h2>

              <div
                style={{
                  fontSize: "65px",

                  marginTop: "20px",

                  fontWeight: "bold",

                  color:
                    String(color)
                }}
              >

                {value}

              </div>

            </div>

          )
        )}

      </div>

      {/* الأزرار */}
      <div
        style={{
          display: "grid",

          gap: "20px",

          maxWidth: "700px",

          margin: "auto"
        }}
      >

        <a
          href="/login"

          style={{
            background: "#2563eb",

            color: "white",

            padding: "22px",

            borderRadius: "20px",

            textAlign: "center",

            textDecoration: "none",

            fontSize: "26px"
          }}
        >

          🔐 تسجيل الدخول

        </a>

        <a
          href="/booking"

          style={{
            background: "#22c55e",

            color: "white",

            padding: "22px",

            borderRadius: "20px",

            textAlign: "center",

            textDecoration: "none",

            fontSize: "26px"
          }}
        >

          📅 حجز موعد

        </a>

      </div>

      {/* آخر الحجوزات */}
      <div
        style={{
          marginTop: "60px"
        }}
      >

        <h2
          style={{
            marginBottom: "25px",

            fontSize: "35px"
          }}
        >

          🕘 آخر الحجوزات

        </h2>

        {patients
          .slice(-5)
          .reverse()
          .map((patient) => (

            <div
              key={patient.id}

              style={{

                background:

                  patient.status ===
                  "🟢 تم التنفيذ"

                    ? "#14532d"

                  :

                  patient.status ===
                  "🔴 حجز ملغي"

                    ? "#7f1d1d"

                  :

                  patient.status ===
                  "🟡 حجز مؤجل"

                    ? "#713f12"

                  :

                  "rgba(255,255,255,0.08)",

                padding: "20px",

                borderRadius: "20px",

                marginBottom: "15px"
              }}
            >

              <h3>
                👤
                {" "}
                {patient.name}
              </h3>

              <h3>
                🦷
                {" "}
                {patient.review}

                {patient.visitType &&
                  ` ← ${patient.visitType}`}
              </h3>

              <h3>
                🗓️
                {" "}
                {patient.date}
              </h3>

              <h3>
                {patient.status}
              </h3>

            </div>

          ))}

      </div>

    </main>

  );

}
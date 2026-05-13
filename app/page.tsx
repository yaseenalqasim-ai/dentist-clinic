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

          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            fontSize: "55px"
          }}
        >

          🦷 نظام العيادة

        </h1>

        <p
          style={{
            color: "#ddd",

            fontSize: "22px"
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

          marginBottom: "40px"
        }}
      >

        {[
          [
            "📅 جميع الحجوزات",
            patients.length,
            "#2563eb"
          ],

          [
            "🟢 تم التنفيذ",
            completed,
            "#22c55e"
          ],

          [
            "🔴 الملغية",
            cancelled,
            "#ef4444"
          ],

          [
            "🟡 المؤجلة",
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

                padding: "30px",

                borderRadius: "25px",

                textAlign: "center",

                border:
                  `2px solid ${color}`
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
                  fontSize: "60px",

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

          gap: "20px"
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

    </main>

  );

}
"use client";

import { useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc
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

export default function BookingPage() {

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({

      name: "",

      phone: "",

      review: "",

      complaint: "",

      date: "",

      status:
        "🔵 حجز مُثبت",

      disease:
        "لا يوجد",

      notes: ""
    });

  async function sendBooking() {

    if (
      !form.name ||
      !form.phone ||
      !form.review ||
      !form.date
    ) {

      setError(
        "يرجى ملء جميع الحقول"
      );

      return;
    }

    setError("");

    await addDoc(
      collection(db, "bookings"),
      form
    );

    setSuccess(
      "تم إرسال الحجز بنجاح ✅"
    );

    setForm({

      name: "",

      phone: "",

      review: "",

      complaint: "",

      date: "",

      status:
        "🔵 حجز مُثبت",

      disease:
        "لا يوجد",

      notes: ""
    });
  }

  return (

    <main
      dir="rtl"

      style={{
        minHeight: "100vh",

        background: "#f3f3f3",

        padding: "20px"
      }}
    >

      <div
        style={{
          maxWidth: "700px",

          margin: "auto",

          background: "white",

          padding: "25px",

          borderRadius: "20px"
        }}
      >

        <h1
          style={{
            textAlign: "center",

            marginBottom: "25px"
          }}
        >

          🦷 حجز موعد

        </h1>

        {error && (

          <div
            style={{
              background: "red",

              color: "white",

              padding: "12px",

              borderRadius: "10px",

              marginBottom: "15px"
            }}
          >

            {error}

          </div>

        )}

        {success && (

          <div
            style={{
              background: "green",

              color: "white",

              padding: "12px",

              borderRadius: "10px",

              marginBottom: "15px"
            }}
          >

            {success}

          </div>

        )}

        {[
          ["👤 الاسم", "name"],

          ["📞 الرقم", "phone"],

          ["🦷 نوع الزيارة", "review"],

          ["❗ الشكوى", "complaint"],

          ["🗓️ الموعد", "date"]
        ].map(([label, key]) => (

          <input
            key={key}

            placeholder={label}

            value={(form as any)[key]}

            onChange={(e) =>
              setForm({

                ...form,

                [key]:
                  e.target.value
              })
            }

            style={{
              width: "100%",

              marginBottom: "15px",

              padding: "16px",

              borderRadius: "12px",

              border:
                "1px solid #ccc",

              fontSize: "18px"
            }}
          />

        ))}

        <button
          onClick={sendBooking}

          style={{
            width: "100%",

            background: "#2563eb",

            color: "white",

            border: "none",

            padding: "18px",

            borderRadius: "12px",

            fontSize: "20px",

            cursor: "pointer"
          }}
        >

          إرسال الحجز

        </button>

      </div>

    </main>

  );

}
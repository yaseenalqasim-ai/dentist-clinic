"use client";

import { useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
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

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      name: "",

      phone: "",

      review: "",

      visitType: "",

      complaint: "",

      disease: "",

      date: "",

      status:
        "🔵 حجز مُثبت",

      notes: ""
    });

  async function sendBooking() {

    setLoading(true);

    if (
      !form.name ||
      !form.phone ||
      !form.review ||
      !form.date
    ) {

      setError(
        "يرجى ملء جميع الحقول"
      );

      setLoading(false);

      return;
    }

    const snapshot =
      await getDocs(
        collection(db, "bookings")
      );

    let booked = false;

    snapshot.forEach((docItem) => {

      const data =
        docItem.data();

      if (
        data.date ===
        form.date
      ) {

        booked = true;

      }

    });

    if (booked) {

      setError(
        "هذا الموعد محجوز مسبقًا"
      );

      setLoading(false);

      return;
    }

    await addDoc(
      collection(db, "bookings"),
      form
    );

    setSuccess(
      "تم إرسال الحجز بنجاح ✅"
    );

    setError("");

    setLoading(false);

    setForm({

      name: "",

      phone: "",

      review: "",

      visitType: "",

      complaint: "",

      disease: "",

      date: "",

      status:
        "🔵 حجز مُثبت",

      notes: ""
    });

  }

  return (

    <main
      dir="rtl"

      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        padding: "20px"
      }}
    >

      <div
        style={{
          maxWidth: "700px",

          margin: "auto",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(10px)",

          padding: "30px",

          borderRadius: "30px",

          color: "white"
        }}
      >

        <h1
          style={{
            textAlign: "center",

            fontSize: "45px",

            marginBottom: "30px"
          }}
        >

          📅 حجز موعد

        </h1>

        {error && (

          <div
            style={{
              background: "red",

              padding: "15px",

              borderRadius: "12px",

              marginBottom: "20px"
            }}
          >

            {error}

          </div>

        )}

        {success && (

          <div
            style={{
              background: "green",

              padding: "15px",

              borderRadius: "12px",

              marginBottom: "20px"
            }}
          >

            {success}

          </div>

        )}

        <input
          placeholder=
            "👤 الاسم"

          value={form.name}

          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value
            })
          }

          style={inputStyle}
        />

        <input
          placeholder=
            "📞 رقم الهاتف"

          value={form.phone}

          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value
            })
          }

          style={inputStyle}
        />

        <select
          value={form.review}

          onChange={(e) =>
            setForm({
              ...form,
              review:
                e.target.value
            })
          }

          style={inputStyle}
        >

          <option value="">
            🦷 نوع المراجعة
          </option>

          <option>
            زيارة أولى
          </option>

          <option>
            مراجعة
          </option>

          <option>
            إكمال علاج
          </option>

          <option>
            طوارئ
          </option>

          <option>
            مراجعة بعد قلع
          </option>

          <option>
            جلسة تقويم
          </option>

        </select>

        {form.review ===
          "زيارة أولى" && (

          <select
            value={form.visitType}

            onChange={(e) =>
              setForm({
                ...form,
                visitType:
                  e.target.value
              })
            }

            style={inputStyle}
          >

            <option value="">
              🦷 نوع الزيارة
            </option>

            <option>
              كشف
            </option>

            <option>
              تنظيف
            </option>

            <option>
              قلع
            </option>

            <option>
              علاج عصب
            </option>

            <option>
              تقويم
            </option>

            <option>
              زراعة
            </option>

            <option>
              تجميل
            </option>

          </select>

        )}

        <select
          value={form.disease}

          onChange={(e) =>
            setForm({
              ...form,
              disease:
                e.target.value
            })
          }

          style={inputStyle}
        >

          <option value="">
            🚨 الأمراض المزمنة
          </option>

          <option>
            لا يوجد
          </option>

          <option>
            سكري
          </option>

          <option>
            ضغط
          </option>

          <option>
            أمراض قلب
          </option>

          <option>
            مميعات دم
          </option>

          <option>
            حساسية بنج أو بنسلين
          </option>

          <option>
            حمل
          </option>

          <option>
            أخرى
          </option>

        </select>

        <input
          placeholder=
            "❗ الشكوى الرئيسية"

          value={form.complaint}

          onChange={(e) =>
            setForm({
              ...form,
              complaint:
                e.target.value
            })
          }

          style={inputStyle}
        />

        <input
          type="datetime-local"

          value={form.date}

          onChange={(e) =>
            setForm({
              ...form,
              date:
                e.target.value
            })
          }

          style={inputStyle}
        />

        <button
          onClick={sendBooking}

          disabled={loading}

          style={{
            width: "100%",

            background:
              "#2563eb",

            color: "white",

            border: "none",

            padding: "18px",

            borderRadius: "15px",

            fontSize: "22px",

            cursor: "pointer"
          }}
        >

          {loading
            ? "جاري الإرسال..."
            : "إرسال الحجز"}

        </button>

      </div>

    </main>

  );

}

const inputStyle = {

  width: "100%",

  marginBottom: "15px",

  padding: "16px",

  borderRadius: "14px",

  border: "none",

  fontSize: "18px"
};
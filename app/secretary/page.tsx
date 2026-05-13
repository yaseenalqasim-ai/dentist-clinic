"use client";

import { useEffect, useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
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

export default function SecretaryPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [editingId, setEditingId] =
    useState("");

  const [form, setForm] = useState({

    name: "",

    phone: "",

    review: "",

    visitType: "",

    disease: "",

    complaint: "",

    date: "",

    status:
      "🔵 حجز مُثبت",

    notes: ""
  });

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    if (role !== "secretary") {

      window.location.href =
        "/login";

    }

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {

      setDarkMode(true);

    }

    loadPatients();

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

  }, [darkMode]);

  function loadPatients() {

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

        data.sort((a, b) =>
          a.date.localeCompare(b.date)
        );

        setPatients(data);

      }
    );

  }

  async function savePatient() {

    if (
      patients.some(
        (p) =>
          p.date === form.date &&
          p.id !== editingId
      )
    ) {

      alert(
        "يوجد حجز بنفس الموعد"
      );

      return;
    }

    if (editingId) {

      await updateDoc(
        doc(
          db,
          "bookings",
          editingId
        ),
        form
      );

    } else {

      await addDoc(
        collection(
          db,
          "bookings"
        ),
        form
      );

    }

    setForm({

      name: "",

      phone: "",

      review: "",

      visitType: "",

      disease: "",

      complaint: "",

      date: "",

      status:
        "🔵 حجز مُثبت",

      notes: ""
    });

    setEditingId("");

    setShowForm(false);

  }

  async function deletePatient(
    id: string
  ) {

    await deleteDoc(
      doc(db, "bookings", id)
    );

  }

  function editPatient(
    patient: any
  ) {

    setForm(patient);

    setEditingId(patient.id);

    setShowForm(true);

  }

  function logout() {

    localStorage.removeItem(
      "role"
    );

    window.location.href =
      "/login";

  }

  const filteredPatients =
    patients.filter((patient) => {

      const matchesSearch =

        patient.name
          ?.includes(search)

        ||

        patient.phone
          ?.includes(search)

        ||

        patient.review
          ?.includes(search)

        ||

        patient.visitType
          ?.includes(search);

      const matchesDate =

        selectedDate === ""

        ||

        patient.date ===
        selectedDate;

      return (
        matchesSearch &&
        matchesDate
      );

    });

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

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center"
        }}
      >

        <h1>
          📅 واجهة السكرتيرة
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }

            style={{
              width: "60px",

              height: "60px",

              borderRadius:
                "50%",

              border: "none",

              fontSize: "24px"
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={logout}

            style={{
              background: "red",

              color: "white",

              border: "none",

              padding: "12px",

              borderRadius:
                "12px"
            }}
          >
            تسجيل خروج
          </button>

        </div>

      </div>

      <div
        style={{
          display: "grid",

          gap: "15px",

          marginTop: "25px"
        }}
      >

        <button
          onClick={() =>
            setShowForm(true)
          }

          style={{
            background:
              "#2563eb",

            color: "white",

            border: "none",

            padding: "18px",

            borderRadius:
              "15px",

            fontSize: "20px"
          }}
        >
          + إضافة حجز
        </button>

        <input
          placeholder=
            "البحث عن حجز.."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={{
            padding: "15px",

            borderRadius:
              "12px",

            border:
              "1px solid #ccc",

            fontSize: "18px",

            color: "black"
          }}
        />

        <input
          type="date"

          value={selectedDate}

          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }

          style={{
            padding: "15px",

            borderRadius:
              "12px",

            border:
              "1px solid #ccc",

            fontSize: "18px",

            color: "black"
          }}
        />

      </div>

      {showForm && (

        <div
          style={{
            marginTop: "20px",

            background:
              darkMode
                ? "#102542"
                : "white",

            padding: "20px",

            borderRadius:
              "20px"
          }}
        >

          <input
            placeholder=
              "👤 اسم المريض"

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
              "📞 رقم المريض"

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
            onClick={savePatient}

            style={{
              width: "100%",

              background:
                "#7c3aed",

              color: "white",

              border: "none",

              padding: "18px",

              borderRadius:
                "14px",

              fontSize: "20px"
            }}
          >
            حفظ الحجز
          </button>

        </div>

      )}

      <div
        style={{
          marginTop: "30px"
        }}
      >

        {filteredPatients.map(
          (patient) => (

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

                  darkMode
                    ? "#102542"
                    : "white",

                padding: "20px",

                borderRadius:
                  "20px",

                marginBottom:
                  "20px"
              }}
            >

              <h2>
                👤
                {" "}
                {patient.name}
              </h2>

              <h2>
                📞
                {" "}
                {patient.phone}
              </h2>

              <h2>
                🦷
                {" "}
                {patient.review}

                {patient.visitType &&
                  ` ← ${patient.visitType}`}
              </h2>

              <h2>
                🚨
                {" "}
                {patient.disease}
              </h2>

              <h2>
                ❗
                {" "}
                {patient.complaint}
              </h2>

              <h2>
                🗓️
                {" "}
                {patient.date}
              </h2>

              <div
                style={{
                  display: "flex",

                  gap: "10px",

                  marginTop: "20px"
                }}
              >

                <a
                  href={`https://wa.me/${patient.phone}`}

                  target="_blank"

                  style={{
                    flex: 1,

                    background:
                      "#22c55e",

                    color: "white",

                    padding:
                      "15px",

                    borderRadius:
                      "12px",

                    textAlign:
                      "center",

                    textDecoration:
                      "none"
                  }}
                >
                  واتساب
                </a>

                <button
                  onClick={() =>
                    editPatient(
                      patient
                    )
                  }

                  style={{
                    flex: 1,

                    background:
                      "#2563eb",

                    color: "white",

                    border: "none",

                    borderRadius:
                      "12px"
                  }}
                >
                  تعديل
                </button>

                <button
                  onClick={() =>
                    deletePatient(
                      patient.id
                    )
                  }

                  style={{
                    flex: 1,

                    background:
                      "red",

                    color: "white",

                    border: "none",

                    borderRadius:
                      "12px"
                  }}
                >
                  حذف
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </main>

  );

}

const inputStyle = {

  width: "100%",

  marginBottom: "15px",

  padding: "15px",

  borderRadius: "12px",

  border: "1px solid #ccc",

  fontSize: "18px"
};
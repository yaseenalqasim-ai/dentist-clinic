"use client";

import { useEffect, useState } from "react";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIZdUmSX15w0CACuW4vfz9npsUi-L3lbg",
  authDomain: "dentist-clinic-476ac.firebaseapp.com",
  projectId: "dentist-clinic-476ac",
  storageBucket: "dentist-clinic-476ac.firebasestorage.app",
  messagingSenderId: "1013681862841",
  appId: "1:1013681862841:web:86643c3f3fa926389a8368",
  measurementId: "G-FW5T2FJ29R"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function SecretaryPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    review: "",
    disease: "",
    complaint: "",
    date: "",
    status: "🔵 حجز مُثبت",
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

  async function savePatient() {

    if (editingId) {

      await updateDoc(
        doc(db, "bookings", editingId),
        form
      );

    } else {

      await addDoc(
        collection(db, "bookings"),
        form
      );

    }

    setForm({
      name: "",
      phone: "",
      review: "",
      disease: "",
      complaint: "",
      date: "",
      status: "🔵 حجز مُثبت",
      notes: ""
    });

    setEditingId("");

    setShowForm(false);

    loadPatients();
  }

  async function deletePatient(id: string) {

    await deleteDoc(
      doc(db, "bookings", id)
    );

    loadPatients();
  }

  function editPatient(patient: any) {

    setForm(patient);

    setEditingId(patient.id);

    setShowForm(true);
  }

  function logout() {

    localStorage.removeItem("role");

    window.location.href =
      "/login";
  }

  const filteredPatients =
    patients.filter((patient) => {

      return (
        patient.name?.includes(search) ||
        patient.phone?.includes(search) ||
        patient.review?.includes(search)
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
          واجهة السكرتيرة
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
              borderRadius: "50%",
              border: "none",
              fontSize: "24px",
              cursor: "pointer"
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
              borderRadius: "12px",
              cursor: "pointer"
            }}
          >
            تسجيل خروج
          </button>

        </div>

      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px"
        }}
      >

        <button
          onClick={() =>
            setShowForm(true)
          }

          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px",
            borderRadius: "12px",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          + إضافة حجز
        </button>

        <input
          placeholder="البحث عن حجز.."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #ccc",
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
            borderRadius: "20px"
          }}
        >

          {[
            ["👤 اسم المريض", "name"],
            ["📞 رقم المريض", "phone"],
            ["🦷 المراجعة", "review"],
            ["🚨 الأمراض", "disease"],
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
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "18px"
              }}
            />

          ))}

          <button
            onClick={savePatient}

            style={{
              width: "100%",
              background: "#7c3aed",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "14px",
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

        {filteredPatients.map((patient) => (

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

            <h2>
              👤 {patient.name}
            </h2>

            <h2>
              📞 {patient.phone}
            </h2>

            <h2>
              🦷 {patient.review}
            </h2>

            <h2>
              🗓️ {patient.date}
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
                  background: "#22c55e",
                  color: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  textAlign: "center",
                  textDecoration: "none"
                }}
              >
                واتساب
              </a>

              <button
                onClick={() =>
                  editPatient(patient)
                }

                style={{
                  flex: 1,
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "12px"
                }}
              >
                تعديل
              </button>

              <button
                onClick={() =>
                  deletePatient(patient.id)
                }

                style={{
                  flex: 1,
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "12px"
                }}
              >
                حذف
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}
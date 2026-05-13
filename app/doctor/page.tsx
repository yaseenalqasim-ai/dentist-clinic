"use client";

import {
  useEffect,
  useState
} from "react";

import jsPDF
from "jspdf";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

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

const storage =
  getStorage(app);

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  const [darkMode, setDarkMode] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingPatient, setEditingPatient] =
    useState<any>(null);

  const [note, setNote] =
    useState("");

  const [uploading,setUploading] =
    useState(false);

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    if (role !== "doctor") {

      window.location.href =
        "/login";

    }

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

  }

  async function uploadImage(
    e:any,
    patient:any
  ){

    const file =
      e.target.files[0];

    if(!file) return;

    setUploading(true);

    const imageRef =
      ref(
        storage,
        `patients/${Date.now()}-${file.name}`
      );

    await uploadBytes(
      imageRef,
      file
    );

    const url =
      await getDownloadURL(
        imageRef
      );

    await updateDoc(
      doc(
        db,
        "bookings",
        patient.id
      ),
      {
        image:url
      }
    );

    setUploading(false);

  }

  function printPatient(
    patient:any
  ){

    const pdf =
      new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
      "Dental Clinic Report",
      20,
      20
    );

    pdf.setFontSize(13);

    pdf.text(
      `Name: ${patient.name}`,
      20,
      40
    );

    pdf.text(
      `Phone: ${patient.phone}`,
      20,
      55
    );

    pdf.text(
      `Review: ${patient.review}`,
      20,
      70
    );

    pdf.text(
      `Disease: ${patient.disease}`,
      20,
      85
    );

    pdf.text(
      `Complaint: ${patient.complaint}`,
      20,
      100
    );

    pdf.text(
      `Date: ${patient.date}`,
      20,
      115
    );

    pdf.text(
      `Status: ${patient.status}`,
      20,
      130
    );

    pdf.text(
      `Notes: ${patient.notes || "-"}`,
      20,
      145
    );

    pdf.save(
      `${patient.name}.pdf`
    );

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
          ?.includes(search);

      const matchesStatus =

        filterStatus === ""

        ||

        patient.status ===
        filterStatus;

      return (
        matchesSearch &&
        matchesStatus
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

      {/* الأعلى */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "30px",

          flexWrap: "wrap",

          gap: "15px"
        }}
      >

        <h1
          style={{
            fontSize: "45px"
          }}
        >

          🦷 واجهة الدكتور

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

      {/* البحث */}
      <div
        style={{
          display: "grid",

          gap: "15px",

          marginBottom: "30px"
        }}
      >

        <input
          placeholder=
            "🔍 البحث عن مريض"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <select
          value={filterStatus}

          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }

          style={inputStyle}
        >

          <option value="">
            📌 جميع الحالات
          </option>

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

      {/* رفع جاري */}
      {uploading && (

        <div
          style={{
            background:"#2563eb",

            color:"white",

            padding:"15px",

            borderRadius:"15px",

            marginBottom:"20px",

            textAlign:"center"
          }}
        >

          جاري رفع الصورة...

        </div>

      )}

      {/* الحجوزات */}
      {filteredPatients.map((patient) => (

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

            padding: "25px",

            borderRadius: "25px",

            marginBottom: "20px"
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

              gap: "15px"
            }}
          >

            <div
              style={{
                fontSize: "24px"
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

              style={inputStyle}
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

          <div
            style={{
              lineHeight: "2.3",

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

            {patient.visitType &&
              ` ← ${patient.visitType}`}

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

          {patient.notes && (

            <div
              style={{
                marginTop: "20px",

                background:
                  "rgba(255,255,255,0.12)",

                padding: "18px",

                borderRadius: "16px",

                lineHeight: "2"
              }}
            >

              📝
              {" "}
              {patient.notes}

            </div>

          )}

          {patient.image && (

            <img
              src={patient.image}

              alt="patient"

              style={{
                width:"100%",

                marginTop:"20px",

                borderRadius:"20px"
              }}
            />

          )}

          <div
            style={{
              display: "flex",

              gap: "12px",

              marginTop: "20px",

              flexWrap: "wrap"
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

                padding: "16px",

                borderRadius: "16px",

                textAlign: "center",

                textDecoration: "none",

                fontSize: "18px"
              }}
            >

              واتساب

            </a>

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
                flex: 1,

                background:
                  "#7c3aed",

                color: "white",

                border: "none",

                padding: "16px",

                borderRadius: "16px",

                fontSize: "18px"
              }}
            >

              📝 ملاحظة

            </button>

            <button
              onClick={() =>
                printPatient(patient)
              }

              style={{
                flex: 1,

                background:
                  "#2563eb",

                color: "white",

                border: "none",

                padding: "16px",

                borderRadius: "16px",

                fontSize: "18px"
              }}
            >

              🖨️ PDF

            </button>

          </div>

          <input
            type="file"

            accept="image/*"

            onChange={(e)=>
              uploadImage(
                e,
                patient
              )
            }

            style={{
              marginTop:"15px"
            }}
          />

        </div>

      ))}

      {/* الملاحظات */}
      {showModal && (

        <div
          style={{
            position: "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.6)",

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

              borderRadius: "25px",

              padding: "25px"
            }}
          >

            <h2
              style={{
                marginBottom: "20px"
              }}
            >

              📝 إدخال ملاحظة

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

                height: "220px",

                borderRadius: "18px",

                padding: "18px",

                fontSize: "20px",

                border: "none"
              }}
            />

            <div
              style={{
                display: "flex",

                gap: "12px",

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

                  padding: "18px",

                  borderRadius:
                    "18px",

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

                  padding: "18px",

                  borderRadius:
                    "18px",

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

const inputStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border: "none",

  fontSize: "18px"
};
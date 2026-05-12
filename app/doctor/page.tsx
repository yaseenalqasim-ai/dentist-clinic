"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {

  const [patients, setPatients] =
    useState<any[]>([];

  const [selectedPatient, setSelectedPatient] =
    useState<any>(null);

  const [darkMode, setDarkMode] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [visitType, setVisitType] =
    useState("");

  const [complaint, setComplaint] =
    useState("");

  const [date, setDate] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [doctorNotes, setDoctorNotes] =
    useState("");

  const [image, setImage] =
    useState<string | null>(null);

  useEffect(() => {

    const savedPatients =
      JSON.parse(
        localStorage.getItem("patients") || "[]"
      );

    setPatients(savedPatients);

  }, []);

  function openPatient(patient: any) {

    setSelectedPatient(patient);

    setName(patient.name || "");

    setPhone(patient.phone || "");

    setVisitType(
      patient.visitType === "زيارة أولى"
        ? `زيارة أولى ← ${patient.firstVisitType}`
        : patient.visitType
    );

    setComplaint(
      patient.complaint || ""
    );

    setDate(patient.date || "");

    setStatus(
      patient.status || ""
    );

    setDoctorNotes(
      patient.doctorNotes || ""
    );

    setImage(
      patient.image || null
    );
  }

  function handleImage(
    e: any
  ) {

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
  }

  function savePatient() {

    const updatedPatients =
      patients.map((p) => {

        if (
          p.phone ===
          selectedPatient.phone
        ) {

          return {
            ...p,

            name,

            phone,

            visitType,

            complaint,

            date,

            status,

            doctorNotes,

            image,
          };
        }

        return p;
      });

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

    alert(
      "تم حفظ الملاحظات والتعديلات"
    );

    setSelectedPatient(null);

  }

  return (
    <main
      dir="rtl"

      style={{
        minHeight: "100vh",

        background: darkMode
          ? "#111827"
          : "#f3f4f6",

        color: darkMode
          ? "white"
          : "black",

        padding: "20px",

        fontFamily: "sans-serif",
      }}
    >

      {/* الأعلى */}
      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >

        <h1
          style={{
            color: "#2563eb",
          }}
        >
          واجهة الدكتور
        </h1>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{
            border: "none",

            background:
              "transparent",

            fontSize: "28px",

            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

      {/* المرضى */}
      <div
        style={{
          marginTop: "30px",

          display: "grid",

          gap: "20px",
        }}
      >

        {patients.map(
          (patient, index) => (

            <div
              key={index}

              style={{
                background: darkMode
                  ? "#1f2937"
                  : "white",

                padding: "20px",

                borderRadius: "20px",

                boxShadow:
                  "0 0 10px rgba(0,0,0,0.1)",

                position: "relative",
              }}
            >

              {/* الحالة */}
              <div
                style={{
                  position:
                    "absolute",

                  top: "20px",

                  left: "20px",

                  background:
                    "#2563eb",

                  color: "white",

                  padding:
                    "8px 15px",

                  borderRadius:
                    "10px",

                  fontWeight:
                    "bold",
                }}
              >
                {patient.status}
              </div>

              <p>
                👤 {patient.name}
              </p>

              <p>
                📞 {patient.phone}
              </p>

              <p>
                🦷 {patient.visitType}
              </p>

              <p>
                ❗ {patient.complaint}
              </p>

              <p>
                🗓️ {patient.date}
              </p>

              <div
                style={{
                  display: "flex",

                  gap: "10px",

                  marginTop: "20px",
                }}
              >

                {/* واتساب */}
                <a
                  href={`https://wa.me/${patient.phone}`}

                  target="_blank"

                  style={{
                    flex: 1,

                    background:
                      "#25D366",

                    color: "white",

                    textDecoration:
                      "none",

                    borderRadius:
                      "12px",

                    padding:
                      "14px",

                    textAlign:
                      "center",

                    fontWeight:
                      "bold",
                  }}
                >
                  واتساب 💬
                </a>

                {/* الملاحظات */}
                <button
                  onClick={() =>
                    openPatient(patient)
                  }

                  style={{
                    flex: 1,

                    background:
                      "#7c3aed",

                    color: "white",

                    border: "none",

                    borderRadius:
                      "12px",

                    padding:
                      "14px",

                    cursor: "pointer",

                    fontWeight:
                      "bold",
                  }}
                >
                  ادخال ملاحظة 📝
                </button>

              </div>

            </div>
          )
        )}

      </div>

      {/* نافذة الملاحظات */}
      {selectedPatient && (

        <div
          style={{
            marginTop: "40px",

            background: darkMode
              ? "#1f2937"
              : "white",

            borderRadius: "25px",

            padding: "25px",

            boxShadow:
              "0 0 20px rgba(0,0,0,0.1)",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",

              color: "#7c3aed",
            }}
          >
            ملاحظات الدكتور 🦷
          </h2>

          <input
            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            placeholder="اسم المريض"

            style={inputStyle}
          />

          <input
            value={phone}

            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }

            placeholder="رقم المريض"

            style={inputStyle}
          />

          <input
            value={visitType}

            onChange={(e) =>
              setVisitType(
                e.target.value
              )
            }

            placeholder="نوع الزيارة"

            style={inputStyle}
          />

          <input
            value={complaint}

            onChange={(e) =>
              setComplaint(
                e.target.value
              )
            }

            placeholder="الشكوى"

            style={inputStyle}
          />

          <input
            value={date}

            onChange={(e) =>
              setDate(
                e.target.value
              )
            }

            placeholder="موعد الحجز"

            style={inputStyle}
          />

          {/* الحالة */}
          <select
            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }

            style={inputStyle}
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

          {/* الملاحظات */}
          <textarea
            value={doctorNotes}

            onChange={(e) =>
              setDoctorNotes(
                e.target.value
              )
            }

            placeholder="اكتب رسالتك هنا..."

            style={{
              width: "100%",

              minHeight: "220px",

              borderRadius:
                "20px",

              padding: "20px",

              fontSize: "20px",

              marginTop: "20px",

              border:
                "2px solid #ddd",

              color: "black",
            }}
          />

          {/* رفع ملف */}
          <div
            style={{
              marginTop: "30px",
            }}
          >

            <h2
              style={{
                color: "#7c3aed",
              }}
            >
              المرفقات 📎
            </h2>

            <input
              type="file"

              accept="image/*"

              capture="environment"

              onChange={handleImage}

              style={{
                marginTop: "15px",
              }}
            />

            {image && (
              <img
                src={image}

                style={{
                  width: "100%",

                  marginTop: "20px",

                  borderRadius:
                    "20px",
                }}
              />
            )}

          </div>

          {/* حفظ */}
          <button
            onClick={savePatient}

            style={{
              width: "100%",

              background:
                "#16a34a",

              color: "white",

              border: "none",

              padding: "18px",

              borderRadius:
                "15px",

              fontSize: "18px",

              fontWeight:
                "bold",

              marginTop: "30px",

              cursor: "pointer",
            }}
          >
            حفظ التعديلات ✅
          </button>

        </div>
      )}

    </main>
  );
}

const inputStyle = {

  width: "100%",

  padding: "16px",

  marginTop: "15px",

  borderRadius: "15px",

  border: "2px solid #ddd",

  fontSize: "17px",

  color: "black",
};
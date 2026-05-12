"use client";

import { useEffect, useState } from "react";

export default function SecretaryPage() {

  const [darkMode, setDarkMode] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [patients, setPatients] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [error, setError] =
    useState("");

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitType, setVisitType] =
    useState("");

  const [
    firstVisitType,
    setFirstVisitType,
  ] = useState("");

  const [disease, setDisease] =
    useState("");

  const [complaint, setComplaint] =
    useState("");

  const [date, setDate] = useState("");

  const [status, setStatus] =
    useState("🔵 حجز مُثبّت");

  useEffect(() => {
    const savedPatients =
      JSON.parse(
        localStorage.getItem("patients") ||
          "[]"
      );

    setPatients(savedPatients);
  }, []);

  function savePatients(
    updatedPatients: any[]
  ) {
    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );
  }

  function validateForm() {

    if (!name) {
      setError(
        "تركت الخانة (اسم المريض) فارغة"
      );

      return false;
    }

    if (!phone) {
      setError(
        "تركت الخانة (رقم المريض) فارغة"
      );

      return false;
    }

    if (!visitType) {
      setError(
        "تركت الخانة (رقم المراجعة) فارغة"
      );

      return false;
    }

    if (
      visitType === "زيارة أولى" &&
      !firstVisitType
    ) {
      setError(
        "تركت الخانة (نوع الزيارة) فارغة"
      );

      return false;
    }

    if (!disease) {
      setError(
        "تركت الخانة (الأمراض المزمنة) فارغة"
      );

      return false;
    }

    if (!complaint) {
      setError(
        "تركت الخانة (الشكوى الرئيسية) فارغة"
      );

      return false;
    }

    if (!date) {
      setError(
        "تركت الخانة (موعد الحجز) فارغة"
      );

      return false;
    }

    setError("");

    return true;
  }

  function addBooking() {

    if (!validateForm()) return;

    const newPatient = {
      name,
      phone,
      visitType,
      firstVisitType,
      disease,
      complaint,
      date,
      status,
    };

    let updatedPatients = [...patients];

    if (editingIndex !== null) {
      updatedPatients[editingIndex] =
        newPatient;
    } else {
      updatedPatients.push(newPatient);
    }

    savePatients(updatedPatients);

    resetForm();
  }

  function deleteBooking(index: number) {

    const updatedPatients =
      patients.filter(
        (_, i) => i !== index
      );

    savePatients(updatedPatients);
  }

  function editBooking(index: number) {

    const patient = patients[index];

    setName(patient.name);
    setPhone(patient.phone);
    setVisitType(patient.visitType);

    setFirstVisitType(
      patient.firstVisitType
    );

    setDisease(patient.disease);

    setComplaint(patient.complaint);

    setDate(patient.date);

    setStatus(patient.status);

    setEditingIndex(index);

    setShowForm(true);
  }

  function resetForm() {

    setName("");
    setPhone("");
    setVisitType("");
    setFirstVisitType("");
    setDisease("");
    setComplaint("");
    setDate("");

    setStatus("🔵 حجز مُثبّت");

    setEditingIndex(null);

    setError("");

    setShowForm(false);
  }

  const filteredPatients =
    patients.filter((patient) => {

      const text = `
      ${patient.name}
      ${patient.phone}
      ${patient.visitType}
      ${patient.firstVisitType}
      ${patient.date}
      `
        .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

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

        padding: "25px",

        fontFamily: "sans-serif",
      }}
    >

      {/* العنوان */}
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
          واجهة السكرتيرة
        </h1>

        {/* الثيم */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{
            border: "none",
            background: "transparent",

            fontSize: "30px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* البحث والإضافة */}
      <div
        style={{
          display: "flex",
          gap: "10px",

          marginTop: "20px",

          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() =>
            setShowForm(true)
          }

          style={buttonStyle}
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
            ...inputStyle,

            background: "white",

            color: "black",

            maxWidth: "300px",
          }}
        />
      </div>

      {/* الفورم */}
      {showForm && (
        <div style={cardStyle}>

          <button
            onClick={resetForm}

            style={{
              ...buttonStyle,

              background: "#6b7280",

              marginBottom: "20px",
            }}
          >
            ← رجوع
          </button>

          {/* الأخطاء */}
          {error && (
            <div
              style={{
                background: "#fee2e2",

                color: "red",

                padding: "12px",

                borderRadius: "10px",

                marginBottom: "15px",

                fontWeight: "bold",
              }}
            >
              {error}
            </div>
          )}

          <input
            placeholder="👤 اسم المريض"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            style={inputStyle}
          />

          <input
            placeholder="📞 رقم المريض"

            value={phone}

            onChange={(e) =>
              setPhone(e.target.value)
            }

            style={inputStyle}
          />

          <select
            value={visitType}

            onChange={(e) =>
              setVisitType(
                e.target.value
              )
            }

            style={inputStyle}
          >
            <option value="">
              🦷 رقم المراجعة
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

          {visitType ===
            "زيارة أولى" && (
            <select
              value={
                firstVisitType
              }

              onChange={(e) =>
                setFirstVisitType(
                  e.target.value
                )
              }

              style={inputStyle}
            >
              <option value="">
                🦷 نوع الزيارة
              </option>

              <option>كشف</option>

              <option>
                تنظيف
              </option>

              <option>قلع</option>

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
            value={disease}

            onChange={(e) =>
              setDisease(
                e.target.value
              )
            }

            style={inputStyle}
          >
            <option value="">
              🚨 الأمراض المزمنة
            </option>

            <option>
              لا يوجد
            </option>

            <option>سكري</option>

            <option>ضغط</option>

            <option>
              أمراض قلب
            </option>

            <option>
              مميعات دم
            </option>

            <option>
              حساسية بنج أو
              بنسلين
            </option>

            <option>حمل</option>

            <option>
              أخرى
            </option>
          </select>

          <textarea
            placeholder="❗️الشكوى الرئيسية"

            value={complaint}

            onChange={(e) =>
              setComplaint(
                e.target.value
              )
            }

            style={{
              ...inputStyle,

              height: "100px",
            }}
          />

          <input
            type="date"

            value={date}

            onChange={(e) =>
              setDate(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <button
            onClick={addBooking}

            style={{
              ...buttonStyle,

              background:
                "green",

              width: "100%",
            }}
          >
            {editingIndex !== null
              ? "حفظ التعديلات"
              : "حفظ الحجز"}
          </button>
        </div>
      )}

      {/* الحجوزات */}
      <div
        style={{
          marginTop: "40px",
        }}
      >

        {filteredPatients.map(
          (
            patient,
            index
          ) => (
            <div
              key={index}

              style={{
                ...cardStyle,

                color: darkMode
                  ? "white"
                  : "black",

                background:
                  darkMode
                    ? "#1f2937"
                    : "white",

                position:
                  "relative",
              }}
            >

              {/* الحالة */}
              <div
                style={{
                  position:
                    "absolute",

                  top: "20px",

                  left: "20px",
                }}
              >
                <select
                  value={
                    patient.status
                  }

                  onChange={(e) => {

                    const updated =
                      [
                        ...patients,
                      ];

                    updated[
                      index
                    ].status =
                      e.target.value;

                    savePatients(
                      updated
                    );
                  }}

                  style={{
                    padding:
                      "10px",

                    borderRadius:
                      "10px",

                    border:
                      "none",

                    background:
                      "#e5e7eb",
                  }}
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
              </div>

              <p>
                <strong>
                  👤 الاسم:
                </strong>{" "}

                {patient.name}
              </p>

              <p>
                <strong>
                  📞 الرقم:
                </strong>{" "}

                {patient.phone}
              </p>

              <p>
                <strong>
                  🦷 المراجعة:
                </strong>{" "}

                {patient.visitType ===
                "زيارة أولى"
                  ? `زيارة أولى ← ${patient.firstVisitType}`
                  : patient.visitType}
              </p>

              <p>
                <strong>
                  🚨 الأمراض:
                </strong>{" "}

                {patient.disease}
              </p>

              <p>
                <strong>
                  ❗️الشكوى:
                </strong>{" "}

                {patient.complaint}
              </p>

              <p>
                <strong>
                  🗓️ الموعد:
                </strong>{" "}

                {patient.date}
              </p>

              {/* الأزرار */}
              <div
                style={{
                  display:
                    "flex",

                  gap: "10px",

                  marginTop:
                    "20px",
                }}
              >

                <a
                  href={`https://wa.me/${patient.phone}`}

                  target="_blank"

                  style={{
                    flex: 1,

                    background:
                      "#25D366",

                    color:
                      "white",

                    textDecoration:
                      "none",

                    borderRadius:
                      "10px",

                    padding:
                      "12px",

                    textAlign:
                      "center",

                    fontWeight:
                      "bold",
                  }}
                >
                  واتساب 💬
                </a>

                <button
                  onClick={() =>
                    editBooking(
                      index
                    )
                  }

                  style={{
                    ...buttonStyle,

                    background:
                      "#2563eb",

                    flex: 1,
                  }}
                >
                  تعديل
                </button>

                <button
                  onClick={() =>
                    deleteBooking(
                      index
                    )
                  }

                  style={{
                    ...buttonStyle,

                    background:
                      "red",

                    flex: 1,
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

  padding: "14px",

  marginTop: "15px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "16px",

  color: "black",
};

const buttonStyle = {
  padding: "14px 20px",

  border: "none",

  borderRadius: "10px",

  background: "#2563eb",

  color: "white",

  fontSize: "16px",

  cursor: "pointer",
};

const cardStyle = {
  background: "white",

  padding: "20px",

  borderRadius: "15px",

  marginTop: "20px",

  maxWidth: "700px",

  boxShadow:
    "0 0 10px rgba(0,0,0,0.1)",
};
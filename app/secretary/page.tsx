"use client";

import { useEffect, useState } from "react";

export default function SecretaryPage() {
  const [showForm, setShowForm] = useState(false);

  const [patients, setPatients] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [visitType, setVisitType] = useState("");
  const [firstVisitType, setFirstVisitType] =
    useState("");

  const [disease, setDisease] = useState("");
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("مؤجل🟡");

  // تحميل الحجوزات
  useEffect(() => {
    const savedPatients =
      JSON.parse(
        localStorage.getItem("patients") || "[]"
      );

    setPatients(savedPatients);
  }, []);

  // حفظ الحجوزات
  function savePatients(updatedPatients: any[]) {
    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );
  }

  // إضافة أو تعديل
  function addBooking() {
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
      updatedPatients[editingIndex] = newPatient;
    } else {
      updatedPatients.push(newPatient);
    }

    savePatients(updatedPatients);

    resetForm();
  }

  // حذف
  function deleteBooking(index: number) {
    const updatedPatients = patients.filter(
      (_, i) => i !== index
    );

    savePatients(updatedPatients);
  }

  // تعديل
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

  // تنظيف
  function resetForm() {
    setName("");
    setPhone("");
    setVisitType("");
    setFirstVisitType("");
    setDisease("");
    setComplaint("");
    setDate("");
    setStatus("مؤجل🟡");

    setEditingIndex(null);

    setShowForm(false);
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          color: "#2563eb",
          marginBottom: "30px",
        }}
      >
        واجهة السكرتيرة
      </h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={buttonStyle}
        >
          + إضافة حجز
        </button>
      )}

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

          <input
            placeholder="👤 اسم المريض"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="📞 رقم المريض (واتساب)"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={inputStyle}
          />

          <select
            value={visitType}
            onChange={(e) =>
              setVisitType(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              🦷 رقم المراجعة
            </option>

            <option>زيارة أولى</option>
            <option>مراجعة</option>
            <option>إكمال علاج</option>
            <option>طوارئ</option>
            <option>مراجعة بعد قلع</option>
            <option>جلسة تقويم</option>
          </select>

          {visitType === "زيارة أولى" && (
            <select
              value={firstVisitType}
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
              <option>تنظيف</option>
              <option>قلع</option>
              <option>علاج عصب</option>
              <option>تقويم</option>
              <option>زراعة</option>
              <option>تجميل</option>
            </select>
          )}

          <select
            value={disease}
            onChange={(e) =>
              setDisease(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">
              🚨 الأمراض المزمنة
            </option>

            <option>لا يوجد</option>
            <option>سكري</option>
            <option>ضغط</option>
            <option>أمراض قلب</option>
            <option>مميعات دم</option>

            <option>
              حساسية بنج أو بنسلين
            </option>

            <option>حمل</option>

            <option>أخرى</option>
          </select>

          <textarea
            placeholder="❗️الشكوى الرئيسية"
            value={complaint}
            onChange={(e) =>
              setComplaint(e.target.value)
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
              setDate(e.target.value)
            }
            style={inputStyle}
          />

          {/* حالة الحجز */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={inputStyle}
          >
            <option>مؤجل🟡</option>
            <option>ملغي❌</option>
            <option>تم الوصول☑️</option>
            <option>تم التنفيذ✅</option>
          </select>

          <button
            onClick={addBooking}
            style={{
              ...buttonStyle,
              background: "green",
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
        {patients.map((patient, index) => (
          <div
            key={index}
            style={cardStyle}
          >
            <p>
              <strong>👤 الاسم:</strong>{" "}
              {patient.name}
            </p>

            <p>
              <strong>📞 الرقم:</strong>{" "}
              {patient.phone}
            </p>

            <p>
              <strong>🦷 المراجعة:</strong>{" "}
              {patient.visitType ===
              "زيارة أولى"
                ? `زيارة أولى ← ${patient.firstVisitType}`
                : patient.visitType}
            </p>

            <p>
              <strong>🚨 الأمراض:</strong>{" "}
              {patient.disease}
            </p>

            <p>
              <strong>❗️الشكوى:</strong>{" "}
              {patient.complaint}
            </p>

            <p>
              <strong>🗓️ الموعد:</strong>{" "}
              {patient.date}
            </p>

            <p>
              <strong>📌 الحالة:</strong>{" "}
              {patient.status}
            </p>

            {/* الأزرار */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  editBooking(index)
                }
                style={{
                  ...buttonStyle,
                  background: "#2563eb",
                  flex: 1,
                }}
              >
                تعديل
              </button>

              <button
                onClick={() =>
                  deleteBooking(index)
                }
                style={{
                  ...buttonStyle,
                  background: "red",
                  flex: 1,
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
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
  maxWidth: "650px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};
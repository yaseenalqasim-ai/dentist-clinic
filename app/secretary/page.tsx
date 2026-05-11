"use client";

import { useState } from "react";

export default function SecretaryPage() {
  const [showForm, setShowForm] = useState(false);

  const [patients, setPatients] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [date, setDate] = useState("");

  function addPatient() {
    if (!name || !number) return;

    const newPatient = {
      name,
      number,
      bookingType,
      date,
    };

    setPatients([...patients, newPatient]);

    setName("");
    setNumber("");
    setBookingType("");
    setDate("");

    setShowForm(false);
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#2563eb" }}>
        صفحة السكرتيرة
      </h1>

      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        إضافة مريض
      </button>

      {showForm && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "30px",
            maxWidth: "500px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <input
            type="text"
            placeholder="اسم المريض"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="رقم المريض"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="نوع الحجز"
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={addPatient}
            style={{
              padding: "12px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            حفظ المريض
          </button>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>قائمة المرضى</h2>

        {patients.map((patient, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "15px",
              maxWidth: "500px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <p><strong>الاسم:</strong> {patient.name}</p>
            <p><strong>الرقم:</strong> {patient.number}</p>
            <p><strong>نوع الحجز:</strong> {patient.bookingType}</p>
            <p><strong>التاريخ:</strong> {patient.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};
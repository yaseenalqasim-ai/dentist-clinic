"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appointments");

      if (saved) {
        setAppointments(JSON.parse(saved));
      }
    }
  }, []);

  const services = [
    "فحص أسنان",
    "تنظيف أسنان",
    "حشوة عادية",
    "حشوة عصب",
    "خلع سن / ضرس",
    "تقويم أسنان",
    "تبييض أسنان",
  ];

  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];

  const times = [
    "09:00 صباحًا",
    "10:00 صباحًا",
    "11:00 صباحًا",
    "12:00 ظهرًا",
    "01:00 ظهرًا",
    "02:00 ظهرًا",
  ];

  const availableTimes = times.filter((t) => {
    return !appointments.some(
      (a) => a.day === day && a.time === t
    );
  });

  function bookAppointment() {
    if (!name || !phone || !service || !day || !time) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const newAppointment = {
      name,
      phone,
      service,
      day,
      time,
    };

    const updated = [...appointments, newAppointment];

    setAppointments(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "appointments",
        JSON.stringify(updated)
      );
    }

    alert("✅ تم حجز الموعد بنجاح");

    setName("");
    setPhone("");
    setService("");
    setDay("");
    setTime("");
  }

  if (!mounted) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.avatar}>
          👨‍⚕️
        </div>

        <h1 style={styles.title}>
          الدكتور أحمد محمد
        </h1>

        <p style={styles.specialty}>
          أخصائي تجميل الأسنان
        </p>

        <p style={styles.text}>
          املأ استمارة الحجز عبر إدخال معلوماتك:
        </p>

        <input
          style={styles.input}
          placeholder="👤 الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="📞 الرقم"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          style={styles.input}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">
            🦷 نوع الحجز
          </option>

          {services.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <select
          style={styles.input}
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
            setTime("");
          }}
        >
          <option value="">
            🗓️ اليوم
          </option>

          {days.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>

        <select
          style={styles.input}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">
            ⏰ الوقت
          </option>

          {availableTimes.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        <button
          style={styles.button}
          onClick={bookAppointment}
        >
          تأكيد الحجز
        </button>

      </div>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    background: "#dff7ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    direction: "rtl",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "white",
    borderRadius: "25px",
    padding: "25px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#bbf7d0",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "45px",
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    color: "#166534",
  },

  specialty: {
    color: "#4b5563",
    marginBottom: "20px",
  },

  text: {
    marginBottom: "15px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};
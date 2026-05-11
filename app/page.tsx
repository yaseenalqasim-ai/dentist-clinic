"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // معلومات العيادة
  const [doctorName, setDoctorName] =
    useState("الدكتور أحمد محمد");

  const [specialty, setSpecialty] =
    useState("أخصائي تجميل الأسنان");

  const [address, setAddress] =
    useState("عنوان العيادة");

  const [website, setWebsite] =
    useState("");

  const [avatar, setAvatar] =
    useState<string | null>(null);

  const [banner, setBanner] =
    useState<string | null>(null);

  // تحميل إعدادات العيادة
  useEffect(() => {
    const settings =
      JSON.parse(localStorage.getItem("clinicSettings") || "{}");

    setDoctorName(
      settings.doctorName || "الدكتور أحمد محمد"
    );

    setSpecialty(
      settings.specialty || "أخصائي تجميل الأسنان"
    );

    setAddress(
      settings.address || "عنوان العيادة"
    );

    setWebsite(settings.website || "");

    setAvatar(settings.avatar || null);

    setBanner(settings.banner || null);
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

  const allTimes = [
    "09:00 صباحًا",
    "10:00 صباحًا",
    "11:00 صباحًا",
    "01:00 ظهرًا",
    "02:00 ظهرًا",
  ];

  // منع تضارب المواعيد
  const availableTimes = useMemo(() => {
    const saved =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    const bookedTimes = saved
      .filter((a: any) => a.day === day)
      .map((a: any) => a.time);

    return allTimes.filter(
      (time) => !bookedTimes.includes(time)
    );
  }, [day]);

  function send() {
    if (!name || !phone || !type || !day || !time) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    const newAppointment = {
      name,
      phone,
      type,
      day,
      time,
      status: "جديد",
    };

    const oldAppointments =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    oldAppointments.push(newAppointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(oldAppointments)
    );

    alert("✅ تم حجز الموعد بنجاح");

    setName("");
    setPhone("");
    setType("");
    setDay("");
    setTime("");
  }

  return (
    <div style={{ ...styles.page, direction: "rtl" }}>

      {/* البانر */}
      {banner && (
        <img src={banner} style={styles.banner} />
      )}

      {/* بطاقة الدكتور */}
      <div style={styles.header}>

        {avatar ? (
          <img src={avatar} style={styles.avatar} />
        ) : (
          <div style={styles.avatarPlaceholder}>
            👨‍⚕️
          </div>
        )}

        <h2>{doctorName}</h2>

        <p>{specialty}</p>

        <p style={styles.address}>
          📍 {address}
        </p>

        {website && (
          <a
            href={website}
            target="_blank"
            style={styles.website}
          >
            🌐 موقع العيادة
          </a>
        )}

      </div>

      {/* العنوان */}
      <p style={styles.title}>
        املأ استمارة الحجز عبر إدخال معلوماتك:
      </p>

      {/* النموذج */}
      <div style={styles.form}>

        <input
          placeholder="👤 الاسم"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="📞 الرقم"
          style={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          style={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">🦷 نوع الحجز</option>

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
          <option value="">🗓️ اليوم</option>

          {days.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>

        <select
          style={styles.input}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">⏰ الوقت المتاح</option>

          {availableTimes.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        {day && availableTimes.length === 0 && (
          <div style={styles.fullBox}>
            ❌ لا توجد أوقات متاحة بهذا اليوم
          </div>
        )}

        <button style={styles.button} onClick={send}>
          تأكيد الحجز
        </button>

      </div>

    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#dff5eb",
    padding: "20px",
    fontFamily: "Arial",
  },

  banner: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  header: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
    marginBottom: "15px",
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },

  avatarPlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    margin: "auto",
    marginBottom: "10px",
  },

  address: {
    color: "#4b5563",
  },

  website: {
    color: "#16a34a",
    textDecoration: "none",
    fontWeight: "bold",
  },

  title: {
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#14532d",
  },

  form: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  fullBox: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
};
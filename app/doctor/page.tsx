"use client";

import { useEffect, useState } from "react";

export default function DoctorPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");

  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  // تحميل البيانات
  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    setAppointments(savedAppointments);

    const settings =
      JSON.parse(localStorage.getItem("clinicSettings") || "{}");

    setDoctorName(settings.doctorName || "");
    setSpecialty(settings.specialty || "");
    setAddress(settings.address || "");
    setWebsite(settings.website || "");
    setAvatar(settings.avatar || null);
    setBanner(settings.banner || null);
  }, []);

  // حفظ الإعدادات
  function saveSettings() {
    localStorage.setItem(
      "clinicSettings",
      JSON.stringify({
        doctorName,
        specialty,
        address,
        website,
        avatar,
        banner,
      })
    );

    alert("✅ تم حفظ معلومات العيادة");
  }

  // رفع صورة
  function handleImage(
    e: any,
    type: "avatar" | "banner"
  ) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event: any) => {
      if (type === "avatar") {
        setAvatar(event.target.result);
      } else {
        setBanner(event.target.result);
      }
    };

    reader.readAsDataURL(file);
  }

  // حفظ الملاحظات
  function saveNote(index: number, note: string) {
    const updated = [...appointments];

    updated[index].note = note;

    setAppointments(updated);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updated)
    );
  }

  return (
    <div style={styles.page}>

      {/* البانر */}
      {banner && (
        <img src={banner} style={styles.banner} />
      )}

      {/* صورة الدكتور */}
      <div style={styles.profileSection}>

        {avatar ? (
          <img src={avatar} style={styles.avatar} />
        ) : (
          <div style={styles.avatarPlaceholder}>
            👨‍⚕️
          </div>
        )}

        <input
          type="file"
          onChange={(e) => handleImage(e, "avatar")}
        />

        <input
          type="file"
          onChange={(e) => handleImage(e, "banner")}
        />

      </div>

      {/* الإعدادات */}
      <div style={styles.settingsCard}>

        <h2>⚙️ معلومات العيادة</h2>

        <input
          placeholder="اسم الدكتور"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="الاختصاص"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="عنوان العيادة"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="رابط الموقع"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.saveBtn}
          onClick={saveSettings}
        >
          💾 حفظ المعلومات
        </button>

      </div>

      {/* المرضى */}
      <div style={styles.grid}>
        {appointments.map((appointment, index) => (
          <div key={index} style={styles.card}>

            <div style={styles.timeBox}>
              ⏰ {appointment.time}
            </div>

            <h3>
              👤 {appointment.name}
            </h3>

            <p>📞 {appointment.phone}</p>
            <p>🦷 {appointment.type}</p>
            <p>🗓️ {appointment.day}</p>

            <textarea
              placeholder="📝 ملاحظات الطبيب..."
              defaultValue={appointment.note || ""}
              onBlur={(e) =>
                saveNote(index, e.target.value)
              }
              style={styles.textarea}
            />

          </div>
        ))}
      </div>

    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#ecfdf5",
    padding: "20px",
    direction: "rtl",
    fontFamily: "Arial",
  },

  banner: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  profileSection: {
    textAlign: "center",
    marginBottom: "20px",
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

  settingsCard: {
    background: "white",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  saveBtn: {
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  timeBox: {
    background: "#dcfce7",
    color: "#166534",
    padding: "6px 10px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "10px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "10px",
  },
};
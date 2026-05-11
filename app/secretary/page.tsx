"use client";

import { useEffect, useState } from "react";

export default function SecretaryPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  function loadAppointments() {
    const saved =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    saved.sort((a: any, b: any) =>
      a.time.localeCompare(b.time)
    );

    setAppointments(saved);
  }

  // حفظ
  function save(updated: any[]) {
    setAppointments(updated);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updated)
    );
  }

  // حذف
  function deleteAppointment(index: number) {
    const updated = [...appointments];

    updated.splice(index, 1);

    save(updated);
  }

  // تغيير الحالة
  function changeStatus(index: number, status: string) {
    const updated = [...appointments];

    updated[index].status = status;

    save(updated);
  }

  // تحديث السعر
  function updatePrice(index: number, value: string) {
    const updated = [...appointments];

    updated[index].price = value;

    save(updated);
  }

  // تحديث المدفوع
  function updatePaid(index: number, value: string) {
    const updated = [...appointments];

    updated[index].paid = value;

    save(updated);
  }

  // البحث
  const filteredAppointments = appointments.filter((a) =>
    a.name.includes(search)
  );

  // لون الحالة
  function getStatusColor(status: string) {
    switch (status) {
      case "مؤكد":
        return "#22c55e";

      case "حضر":
        return "#3b82f6";

      case "ملغي":
        return "#ef4444";

      default:
        return "#eab308";
    }
  }

  return (
    <div style={styles.page}>

      {/* العنوان */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          🦷 لوحة السكرتيرة
        </h1>

        <p style={styles.subtitle}>
          إدارة الحجوزات والفواتير
        </p>
      </div>

      {/* البحث */}
      <div style={styles.searchBox}>
        <input
          placeholder="🔎 بحث عن مريض"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* لا توجد حجوزات */}
      {filteredAppointments.length === 0 && (
        <div style={styles.empty}>
          لا توجد حجوزات حالياً
        </div>
      )}

      {/* الجدول */}
      <div style={styles.timeline}>

        {filteredAppointments.map((appointment, index) => {
          const price =
            Number(appointment.price || 0);

          const paid =
            Number(appointment.paid || 0);

          const remaining = price - paid;

          return (
            <div key={index} style={styles.timelineCard}>

              {/* الوقت */}
              <div style={styles.leftSide}>
                <div style={styles.time}>
                  {appointment.time}
                </div>

                <div
                  style={{
                    ...styles.statusDot,
                    background:
                      getStatusColor(
                        appointment.status
                      ),
                  }}
                />
              </div>

              {/* البطاقة */}
              <div style={styles.card}>

                <div style={styles.topRow}>

                  <h3 style={styles.name}>
                    👤 {appointment.name}
                  </h3>

                  <div
                    style={{
                      ...styles.status,
                      background:
                        getStatusColor(
                          appointment.status
                        ),
                    }}
                  >
                    {appointment.status || "جديد"}
                  </div>

                </div>

                <p style={styles.info}>
                  📞 {appointment.phone}
                </p>

                <p style={styles.info}>
                  🦷 {appointment.type}
                </p>

                <p style={styles.info}>
                  🗓️ {appointment.day}
                </p>

                {/* الدفع */}
                <div style={styles.paymentBox}>

                  <input
                    type="number"
                    placeholder="💰 السعر الكامل"
                    value={appointment.price || ""}
                    onChange={(e) =>
                      updatePrice(
                        index,
                        e.target.value
                      )
                    }
                    style={styles.paymentInput}
                  />

                  <input
                    type="number"
                    placeholder="💵 المدفوع"
                    value={appointment.paid || ""}
                    onChange={(e) =>
                      updatePaid(
                        index,
                        e.target.value
                      )
                    }
                    style={styles.paymentInput}
                  />

                  <div style={styles.remaining}>
                    المتبقي: {remaining} د.ع
                  </div>

                </div>

                {/* الاتصال */}
                <div style={styles.actions}>

                  <a
                    href={`tel:${appointment.phone}`}
                    style={styles.callBtn}
                  >
                    📞 اتصال
                  </a>

                  <a
                    href={`https://wa.me/${appointment.phone}`}
                    target="_blank"
                    style={styles.whatsappBtn}
                  >
                    🟢 واتساب
                  </a>

                </div>

                {/* الحالات */}
                <div style={styles.statusButtons}>

                  <button
                    style={styles.confirmBtn}
                    onClick={() =>
                      changeStatus(
                        index,
                        "مؤكد"
                      )
                    }
                  >
                    تأكيد
                  </button>

                  <button
                    style={styles.arrivedBtn}
                    onClick={() =>
                      changeStatus(
                        index,
                        "حضر"
                      )
                    }
                  >
                    حضر
                  </button>

                  <button
                    style={styles.cancelBtn}
                    onClick={() =>
                      changeStatus(
                        index,
                        "ملغي"
                      )
                    }
                  >
                    إلغاء
                  </button>

                </div>

                {/* حذف */}
                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteAppointment(index)
                  }
                >
                  🗑️ حذف الموعد
                </button>

              </div>

            </div>
          );
        })}

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

  header: {
    marginBottom: "20px",
  },

  title: {
    color: "#14532d",
  },

  subtitle: {
    color: "#4b5563",
  },

  searchBox: {
    background: "white",
    padding: "15px",
    borderRadius: "16px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  empty: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  timelineCard: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },

  leftSide: {
    width: "90px",
    textAlign: "center",
  },

  time: {
    fontWeight: "bold",
    color: "#14532d",
    marginBottom: "8px",
  },

  statusDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    margin: "auto",
  },

  card: {
    flex: 1,
    background: "white",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  status: {
    color: "white",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "13px",
  },

  name: {
    margin: 0,
  },

  info: {
    color: "#4b5563",
    marginBottom: "5px",
  },

  paymentBox: {
    background: "#f0fdf4",
    padding: "12px",
    borderRadius: "12px",
    marginTop: "15px",
  },

  paymentInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  remaining: {
    fontWeight: "bold",
    color: "#14532d",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  callBtn: {
    flex: 1,
    background: "#16a34a",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  whatsappBtn: {
    flex: 1,
    background: "#25D366",
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  statusButtons: {
    display: "flex",
    gap: "8px",
    marginTop: "15px",
  },

  confirmBtn: {
    flex: 1,
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px",
  },

  arrivedBtn: {
    flex: 1,
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px",
  },

  cancelBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px",
  },

  deleteBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#111827",
    color: "white",
  },
};
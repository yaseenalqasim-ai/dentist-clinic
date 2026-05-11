"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    setAppointments(saved);
  }, []);

  // الإحصائيات
  const totalAppointments =
    appointments.length;

  const confirmed =
    appointments.filter(
      (a) => a.status === "مؤكد"
    ).length;

  const arrived =
    appointments.filter(
      (a) => a.status === "حضر"
    ).length;

  const canceled =
    appointments.filter(
      (a) => a.status === "ملغي"
    ).length;

  // الأرباح
  const totalRevenue =
    appointments.reduce(
      (sum, a) =>
        sum + Number(a.price || 0),
      0
    );

  const totalPaid =
    appointments.reduce(
      (sum, a) =>
        sum + Number(a.paid || 0),
      0
    );

  const totalRemaining =
    totalRevenue - totalPaid;

  return (
    <div style={styles.page}>

      {/* العنوان */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          📊 تقارير العيادة
        </h1>

        <p style={styles.subtitle}>
          الإحصائيات والأرباح
        </p>
      </div>

      {/* الإحصائيات */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h2>📅</h2>

          <h3>
            {totalAppointments}
          </h3>

          <p>إجمالي الحجوزات</p>
        </div>

        <div style={styles.card}>
          <h2>✅</h2>

          <h3>
            {confirmed}
          </h3>

          <p>مواعيد مؤكدة</p>
        </div>

        <div style={styles.card}>
          <h2>👨‍⚕️</h2>

          <h3>
            {arrived}
          </h3>

          <p>مرضى حضروا</p>
        </div>

        <div style={styles.card}>
          <h2>❌</h2>

          <h3>
            {canceled}
          </h3>

          <p>مواعيد ملغية</p>
        </div>

      </div>

      {/* الأرباح */}
      <div style={styles.moneySection}>

        <div style={styles.moneyCard}>
          <h3>💰 إجمالي الفواتير</h3>

          <p>
            {totalRevenue} د.ع
          </p>
        </div>

        <div style={styles.moneyCard}>
          <h3>💵 المدفوع</h3>

          <p>
            {totalPaid} د.ع
          </p>
        </div>

        <div style={styles.moneyCard}>
          <h3>📌 المتبقي</h3>

          <p>
            {totalRemaining} د.ع
          </p>
        </div>

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
    marginBottom: "25px",
  },

  title: {
    color: "#14532d",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#4b5563",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",

    gap: "15px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  moneySection: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",

    gap: "15px",
  },

  moneyCard: {
    background: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
};
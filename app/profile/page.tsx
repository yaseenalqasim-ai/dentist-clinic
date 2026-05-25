"use client";

import AuthGuard
from "../components/AuthGuard";

import BottomNav
from "../components/BottomNav";

import {
  useUser
} from "../context/UserContext";

export default function ProfilePage() {

  const {
    currentUser
  } = useUser();

  function getRoleLabel() {

    if (
      currentUser?.role ===
      "admin"
    ) {

      return "👑 مدير";

    }

    if (
      currentUser?.role ===
      "doctor"
    ) {

      return "👨‍⚕️ طبيب";

    }

    return "🧑‍💼 موظف";

  }

  return (

    <AuthGuard>

      <main
        dir="rtl"

        style={{
          minHeight: "100vh",

          background: "#f3f6fb",

          padding: "14px",

          paddingBottom: "100px"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",

            borderRadius: "30px",

            padding: "30px",

            color: "white",

            marginBottom: "20px",

            textAlign: "center"
          }}
        >

          <div
            style={{
              fontSize: "90px",
              marginBottom: "18px"
            }}
          >

            👤

          </div>

          <h1
            style={{
              fontSize: "36px",
              marginBottom: "12px"
            }}
          >

            {
              currentUser?.name ||
              "-"
            }

          </h1>

          <p
            style={{
              opacity: 0.9
            }}
          >

            {
              getRoleLabel()
            }

          </p>

        </div>

        <div
          style={{
            background: "white",

            borderRadius: "24px",

            padding: "22px",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.06)",

            display: "grid",

            gap: "18px"
          }}
        >

          <InfoCard
            label="البريد الإلكتروني"
            value={
              currentUser?.email ||
              "-"
            }
            icon="📧"
          />

          <InfoCard
            label="الدور"
            value={
              currentUser?.role ||
              "-"
            }
            icon="🪪"
          />

          {

            currentUser?.role === "doctor"

            &&

            <InfoCard
              label="التخصص"
              value={
(currentUser as any)?.specialty ||
"-"              }
              icon="🦷"
            />

          }

        </div>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}

function InfoCard({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: string;
}) {

  return (

    <div
      style={{
        background: "#f9fafb",

        borderRadius: "18px",

        padding: "18px"
      }}
    >

      <div
        style={{
          color: "#6b7280",

          marginBottom: "10px"
        }}
      >

        {icon} {label}

      </div>

      <div
        style={{
          fontSize: "20px",

          fontWeight: "bold",

          color: "#111827"
        }}
      >

        {value}

      </div>

    </div>

  );

}
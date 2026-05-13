"use client";

import { useEffect, useState } from "react";

import { useRouter }
from "next/navigation";

export default function LoginPage() {

  const router =
    useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    if (role === "doctor") {

      router.push("/doctor");

    }

    if (role === "secretary") {

      router.push("/secretary");

    }

  }, []);

  function login() {

    // الدكتور
    if (
      username === "doctor" &&
      password === "123456"
    ) {

      localStorage.setItem(
        "role",
        "doctor"
      );

      router.push("/doctor");

      return;
    }

    // السكرتير
    if (
      username === "secretary" &&
      password === "123456"
    ) {

      localStorage.setItem(
        "role",
        "secretary"
      );

      router.push("/secretary");

      return;
    }

    setError(
      "اسم المستخدم أو كلمة المرور خاطئة"
    );

  }

  return (

    <main
      dir="rtl"

      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px"
      }}
    >

      <div
        style={{
          width: "100%",

          maxWidth: "500px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(10px)",

          borderRadius: "30px",

          padding: "40px",

          color: "white"
        }}
      >

        <h1
          style={{
            textAlign: "center",

            fontSize: "50px",

            marginBottom: "10px"
          }}
        >

          🦷 تسجيل الدخول

        </h1>

        <p
          style={{
            textAlign: "center",

            color: "#ddd",

            marginBottom: "30px",

            fontSize: "20px"
          }}
        >

          نظام إدارة العيادة

        </p>

        {error && (

          <div
            style={{
              background: "#dc2626",

              padding: "15px",

              borderRadius: "14px",

              marginBottom: "20px",

              textAlign: "center"
            }}
          >

            {error}

          </div>

        )}

        <input
          placeholder=
            "اسم المستخدم"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <input
          type="password"

          placeholder=
            "كلمة المرور"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={inputStyle}
        />

        <button
          onClick={login}

          style={{
            width: "100%",

            background:
              "#2563eb",

            color: "white",

            border: "none",

            padding: "18px",

            borderRadius: "16px",

            fontSize: "22px",

            cursor: "pointer",

            marginTop: "10px"
          }}
        >

          دخول

        </button>

        {/* الحسابات */}
        <div
          style={{
            marginTop: "35px",

            background:
              "rgba(255,255,255,0.05)",

            padding: "20px",

            borderRadius: "18px",

            lineHeight: "2",

            color: "#ddd"
          }}
        >

          <h3>
            🔑 بيانات الدخول
          </h3>

          <div>
            👨‍⚕️ الدكتور:
            doctor
          </div>

          <div>
            👩‍💼 السكرتير:
            secretary
          </div>

          <div>
            🔒 كلمة المرور:
            123456
          </div>

        </div>

      </div>

    </main>

  );

}

const inputStyle = {

  width: "100%",

  padding: "16px",

  marginBottom: "18px",

  borderRadius: "14px",

  border: "none",

  fontSize: "18px"
};
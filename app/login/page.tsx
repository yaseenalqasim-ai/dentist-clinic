"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

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

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#071739"
      }}
    >

      <div
        style={{
          width: "90%",

          maxWidth: "450px",

          background: "#102542",

          padding: "30px",

          borderRadius: "20px"
        }}
      >

        <h1
          style={{
            textAlign: "center",

            color: "white",

            marginBottom: "30px"
          }}
        >

          🦷 تسجيل الدخول

        </h1>

        {error && (

          <div
            style={{
              background: "red",

              color: "white",

              padding: "12px",

              borderRadius: "10px",

              marginBottom: "15px"
            }}
          >

            {error}

          </div>

        )}

        <input
          placeholder="اسم المستخدم"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "16px",

            marginBottom: "15px",

            borderRadius: "12px",

            border: "none",

            fontSize: "18px"
          }}
        />

        <input
          type="password"

          placeholder="كلمة المرور"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={{
            width: "100%",

            padding: "16px",

            marginBottom: "20px",

            borderRadius: "12px",

            border: "none",

            fontSize: "18px"
          }}
        />

        <button
          onClick={login}

          style={{
            width: "100%",

            background: "#2563eb",

            color: "white",

            border: "none",

            padding: "18px",

            borderRadius: "12px",

            fontSize: "20px",

            cursor: "pointer"
          }}
        >

          دخول

        </button>

        <div
          style={{
            color: "#ccc",

            marginTop: "20px",

            lineHeight: "2"
          }}
        >

          <div>
            الدكتور:
            doctor
          </div>

          <div>
            السكرتير:
            secretary
          </div>

          <div>
            كلمة المرور:
            123456
          </div>

        </div>

      </div>

    </main>

  );

}
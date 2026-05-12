"use client";

export default function HomePage() {

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

          maxWidth: "700px",

          background:
            "rgba(255,255,255,0.05)",

          borderRadius: "30px",

          padding: "40px",

          backdropFilter:
            "blur(10px)",

          textAlign: "center",

          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "55px",

            marginBottom: "20px"
          }}
        >

          🦷 نظام العيادة

        </h1>

        <p
          style={{
            fontSize: "24px",

            lineHeight: "2",

            color: "#ddd"
          }}
        >

          نظام متكامل لإدارة
          الحجوزات والمرضى
          والدكتور والسكرتير

        </p>

        <div
          style={{
            display: "grid",

            gap: "20px",

            marginTop: "40px"
          }}
        >

          <a
            href="/login"

            style={{
              background: "#2563eb",

              color: "white",

              padding: "20px",

              borderRadius: "18px",

              textDecoration: "none",

              fontSize: "24px"
            }}
          >

            🔐 تسجيل الدخول

          </a>

          <a
            href="/booking"

            style={{
              background: "#22c55e",

              color: "white",

              padding: "20px",

              borderRadius: "18px",

              textDecoration: "none",

              fontSize: "24px"
            }}
          >

            📅 حجز موعد

          </a>

        </div>

      </div>

    </main>

  );

}
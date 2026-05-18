"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-blue-950
        to-blue-900
        p-4
      "
      dir="rtl"
    >

      <div
        className="
          bg-white/10
          backdrop-blur-md
          rounded-3xl
          p-6
          text-white
          shadow-2xl
          mb-6
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-2
          "
        >

          🏥 لوحة التحكم

        </h1>

        <p
          className="
            text-blue-100
            text-lg
          "
        >

          إدارة العيادة الطبية

        </p>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mb-6
        "
      >

        <div
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-center
            text-white
            shadow-xl
          "
        >

          <div className="text-5xl mb-3">
            👥
          </div>

          <div className="text-3xl font-bold">
            المرضى
          </div>

        </div>

        <div
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-center
            text-white
            shadow-xl
          "
        >

          <div className="text-5xl mb-3">
            📅
          </div>

          <div className="text-3xl font-bold">
            الحجوزات
          </div>

        </div>

      </div>

      <div
        className="
          grid
          gap-4
        "
      >

        <Link
          href="/booking"
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            rounded-3xl
            p-6
            text-white
            text-2xl
            font-bold
            shadow-2xl
            text-center
          "
        >

          📅 حجز موعد

        </Link>

        <Link
          href="/calendar"
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-white
            text-2xl
            font-bold
            shadow-2xl
            text-center
          "
        >

          🗓️ التقويم

        </Link>

        <Link
          href="/patients"
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-white
            text-2xl
            font-bold
            shadow-2xl
            text-center
          "
        >

          👥 المرضى

        </Link>

        <Link
          href="/doctors"
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-white
            text-2xl
            font-bold
            shadow-2xl
            text-center
          "
        >

          👨‍⚕️ الأطباء

        </Link>

        <Link
          href="/settings"
          className="
            bg-white/10
            backdrop-blur-md
            rounded-3xl
            p-6
            text-white
            text-2xl
            font-bold
            shadow-2xl
            text-center
          "
        >

          ⚙️ الإعدادات

        </Link>

      </div>

    </div>
  );
}
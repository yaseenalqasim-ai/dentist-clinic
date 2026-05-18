"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [bookingsCount, setBookingsCount] =
    useState(0);

  const [patientsCount, setPatientsCount] =
    useState(0);

  const [todayBookings, setTodayBookings] =
    useState(0);

  useEffect(() => {

    const bookings =
      JSON.parse(
        localStorage.getItem(
          "bookings"
        ) || "[]"
      );

    setBookingsCount(
      bookings.length
    );

    const uniquePatients =
      new Set(
        bookings.map(
          (booking:any)=>
            booking.phone
        )
      );

    setPatientsCount(
      uniquePatients.size
    );

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const todayData =
      bookings.filter(
        (booking:any)=>
          booking.date === today
      );

    setTodayBookings(
      todayData.length
    );

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-[#0b1b55]
        p-4
        pb-32
        text-white
      "
    >

      <div
        className="
          bg-[#2146e8]
          rounded-[35px]
          p-6
          shadow-2xl
          mb-6
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-3
            text-right
          "
        >

          🏥 لوحة التحكم

        </h1>

        <p
          className="
            text-gray-200
            text-right
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
            bg-white
            text-black
            rounded-[30px]
            p-5
            shadow-2xl
          "
        >

          <div
            className="
              text-4xl
              mb-3
            "
          >

            📅

          </div>

          <div
            className="
              text-3xl
              font-bold
            "
          >

            {
              bookingsCount
            }

          </div>

          <div
            className="
              text-gray-600
              mt-2
            "
          >

            الحجوزات

          </div>

        </div>

        <div
          className="
            bg-white
            text-black
            rounded-[30px]
            p-5
            shadow-2xl
          "
        >

          <div
            className="
              text-4xl
              mb-3
            "
          >

            👥

          </div>

          <div
            className="
              text-3xl
              font-bold
            "
          >

            {
              patientsCount
            }

          </div>

          <div
            className="
              text-gray-600
              mt-2
            "
          >

            المرضى

          </div>

        </div>

      </div>

      <div
        className="
          bg-white
          text-black
          rounded-[35px]
          p-6
          shadow-2xl
          mb-6
        "
      >

        <div
          className="
            text-2xl
            font-bold
            mb-3
            text-right
          "
        >

          🔥 حجوزات اليوم

        </div>

        <div
          className="
            text-5xl
            font-bold
            text-[#2146e8]
            text-center
          "
        >

          {
            todayBookings
          }

        </div>

      </div>

      <div
        className="
          grid
          gap-4
        "
      >

        <Link
          href="/calendar"

          className="
            h-20
            bg-white
            text-black
            rounded-[30px]
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-2xl
          "
        >

          📅 إدارة الحجوزات

        </Link>

        <Link
          href="/patients"

          className="
            h-20
            bg-white
            text-black
            rounded-[30px]
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-2xl
          "
        >

          👥 المرضى

        </Link>

        <Link
          href="/booking/dr-ahmed"

          className="
            h-20
            bg-[#2146e8]
            text-white
            rounded-[30px]
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-2xl
          "
        >

          ➕ إنشاء حجز

        </Link>

      </div>

    </main>
  );
}
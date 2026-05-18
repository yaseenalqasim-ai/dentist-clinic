"use client";

import { useEffect, useState } from "react";

export default function CalendarPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  useEffect(() => {

    const storedBookings =
      JSON.parse(
        localStorage.getItem(
          "bookings"
        ) || "[]"
      );

    setBookings(storedBookings);

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-[#f3f3f3]
        p-4
        pb-32
      "
    >

      <div
        className="
          bg-[#2146e8]
          text-white
          rounded-[35px]
          p-6
          mb-6
          shadow-2xl
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-2
            text-right
          "
        >

          📅 الحجوزات

        </h1>

        <p
          className="
            text-right
            text-gray-200
            text-lg
          "
        >

          جميع حجوزات العيادة

        </p>

      </div>

      {

        bookings.length === 0

        ?

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            text-2xl
            shadow-xl
          "
        >

          لا توجد حجوزات

        </div>

        :

        <div
          className="
            space-y-5
          "
        >

          {

            bookings.map(
              (
                booking,
                index
              )=>(

                <div

                  key={index}

                  className="
                    bg-white
                    rounded-[35px]
                    p-5
                    shadow-2xl
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mb-5
                    "
                  >

                    <div
                      className="
                        bg-yellow-100
                        text-yellow-700
                        px-4
                        py-2
                        rounded-full
                        font-bold
                      "
                    >

                      {
                        booking.status
                      }

                    </div>

                    <div
                      className="
                        text-2xl
                        font-bold
                        text-[#2146e8]
                      "
                    >

                      ⏰ {
                        booking.time
                      }

                    </div>

                  </div>

                  <div
                    className="
                      grid
                      gap-4
                      mb-5
                    "
                  >

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      👤 {
                        booking.patientName
                      }

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      📞 {
                        booking.phone
                      }

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      🦷 {
                        booking.service
                      }

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      👨‍⚕️ {
                        booking.doctorName
                      }

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      📅 {
                        booking.date
                      }

                    </div>

                  </div>

                  <a

                    href={`https://wa.me/${booking.phone}`}

                    target="_blank"

                    className="
                      w-full
                      h-16
                      bg-green-500
                      text-white
                      rounded-3xl
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-bold
                    "
                  >

                    💬 واتساب

                  </a>

                </div>

              )
            )

          }

        </div>

      }

    </main>
  );
}
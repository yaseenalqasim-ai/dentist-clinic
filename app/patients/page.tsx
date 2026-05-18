"use client";

import { useEffect, useState } from "react";

export default function PatientsPage() {

  const [patients, setPatients] =
    useState<any[]>([]);

  useEffect(() => {

    const bookings =
      JSON.parse(
        localStorage.getItem(
          "bookings"
        ) || "[]"
      );

    const uniquePatients =
      bookings.reduce(
        (
          acc:any[],
          booking:any
        ) => {

          const exists =
            acc.find(
              (patient)=>
                patient.phone ===
                booking.phone
            );

          if (!exists) {

            acc.push({
              patientName:
                booking.patientName,

              phone:
                booking.phone,

              doctorName:
                booking.doctorName,

              service:
                booking.service,

              lastVisit:
                booking.date,
            });

          }

          return acc;

        },
        []
      );

    setPatients(uniquePatients);

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

          👥 المرضى

        </h1>

        <p
          className="
            text-right
            text-gray-200
            text-lg
          "
        >

          جميع مرضى العيادة

        </p>

      </div>

      {

        patients.length === 0

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

          لا يوجد مرضى

        </div>

        :

        <div
          className="
            space-y-5
          "
        >

          {

            patients.map(
              (
                patient,
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
                      text-2xl
                      font-bold
                      text-[#2146e8]
                      text-right
                      mb-5
                    "
                  >

                    👤 {
                      patient.patientName
                    }

                  </div>

                  <div
                    className="
                      grid
                      gap-4
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

                      📞 {
                        patient.phone
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
                        patient.doctorName
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
                        patient.service
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
                        patient.lastVisit
                      }

                    </div>

                  </div>

                </div>

              )
            )

          }

        </div>

      }

    </main>
  );
}
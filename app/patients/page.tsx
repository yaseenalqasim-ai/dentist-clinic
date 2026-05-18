"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function PatientsPage() {

  const [bookings, setBookings] =
    useState<any[]>([]);

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(db, "bookings"),

        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setBookings(data);

        }
      );

    return () => unsubscribe();

  }, []);

  const patients =
    useMemo(() => {

      const grouped:any = {};

      bookings.forEach(
        (booking:any) => {

          const key =
            booking.phone;

          if (!grouped[key]) {

            grouped[key] = {
              patientName:
                booking.patientName,

              phone:
                booking.phone,

              doctorName:
                booking.doctorName,

              lastBooking:
                booking.date,

              bookingType:
                booking.bookingType,

              count: 1,
            };

          } else {

            grouped[key].count += 1;

            grouped[key].lastBooking =
              booking.date;

          }

        }
      );

      return Object.values(grouped);

    }, [bookings]);

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-5
      "
      dir="rtl"
    >

      <div
        className="
          bg-blue-700
          text-white
          rounded-3xl
          p-6
          shadow-xl
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

          المرضى

        </h1>

        <p
          className="
            text-blue-100
          "
        >

          سجل المرضى داخل العيادة

        </p>

      </div>

      {

        patients.length === 0

        ?

        <div
          className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-xl
          "
        >

          لا يوجد مرضى

        </div>

        :

        <div
          className="
            grid
            gap-5
          "
        >

          {

            patients.map(
              (
                patient:any,
                index:number
              )=>(

                <div
                  key={index}

                  className="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow-xl
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-start
                      mb-5
                    "
                  >

                    <div>

                      <div
                        className="
                          text-2xl
                          font-bold
                          text-blue-700
                        "
                      >

                        👤 {
                          patient.patientName
                        }

                      </div>

                      <div
                        className="
                          text-gray-500
                          mt-1
                        "
                      >

                        📞 {
                          patient.phone
                        }

                      </div>

                    </div>

                    <div
                      className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        font-bold
                      "
                    >

                      {
                        patient.count
                      } زيارة

                    </div>

                  </div>

                  <div
                    className="
                      grid
                      md:grid-cols-3
                      gap-4
                    "
                  >

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                      "
                    >

                      👨‍⚕️ الطبيب

                      <div
                        className="
                          font-bold
                          mt-2
                        "
                      >

                        {
                          patient.doctorName
                        }

                      </div>

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                      "
                    >

                      🦷 آخر حجز

                      <div
                        className="
                          font-bold
                          mt-2
                        "
                      >

                        {
                          patient.bookingType
                        }

                      </div>

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                      "
                    >

                      📅 آخر زيارة

                      <div
                        className="
                          font-bold
                          mt-2
                        "
                      >

                        {
                          patient.lastBooking
                        }

                      </div>

                    </div>

                  </div>

                </div>

              )
            )

          }

        </div>

      }

    </div>
  );
}
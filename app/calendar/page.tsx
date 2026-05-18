"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Booking {
  id: string;
  patientName: string;
  phone: string;
  doctorName: string;
  bookingType: string;
  date: string;
  time: string;
  status: string;
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "bookings"),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Booking[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Booking, "id">),
      }));

      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  const groupedBookings = bookings.reduce((acc: any, booking) => {
    if (!acc[booking.date]) {
      acc[booking.date] = [];
    }

    acc[booking.date].push(booking);

    return acc;
  }, {});

  const statusColor = (status: string) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-500";

      case "ملغي":
        return "bg-red-500";

      case "بالانتظار":
        return "bg-yellow-500";

      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <div className="bg-blue-700 text-white rounded-3xl p-6 mb-6 shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          الحجوزات
        </h1>

        <p className="text-blue-100">
          إدارة حجوزات العيادة
        </p>
      </div>

      {Object.keys(groupedBookings).length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-gray-500">
            لا توجد حجوزات
          </h2>
        </div>
      )}

      <div className="space-y-8">

        {Object.entries(groupedBookings).map(
          ([date, dayBookings]: any) => (

            <div key={date}>

              <div className="bg-black text-white rounded-2xl px-5 py-3 mb-4 text-xl font-bold shadow-lg">
                📅 {date}
              </div>

              <div className="grid gap-5">

                {dayBookings.map((booking: Booking) => (

                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl p-5 shadow-xl border border-gray-200"
                  >

                    <div className="flex justify-between items-start mb-5">

                      <div>

                        <div className="text-5xl font-bold text-blue-700">
                          {booking.time}
                        </div>

                        <div className="text-gray-500 mt-1">
                          وقت الحجز
                        </div>

                      </div>

                      <div
                        className={`${statusColor(
                          booking.status
                        )} text-white px-4 py-2 rounded-full text-sm font-bold`}
                      >
                        {booking.status || "بالانتظار"}
                      </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-lg">

                      <div className="bg-gray-100 rounded-2xl p-4">
                        👤 المريض:
                        <div className="font-bold mt-1">
                          {booking.patientName}
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-2xl p-4">
                        📞 الهاتف:
                        <div className="font-bold mt-1">
                          {booking.phone}
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-2xl p-4">
                        🦷 نوع الحجز:
                        <div className="font-bold mt-1">
                          {booking.bookingType}
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-2xl p-4">
                        👨‍⚕️ الطبيب:
                        <div className="font-bold mt-1">
                          {booking.doctorName}
                        </div>
                      </div>

                    </div>

                    <a
                      href={`https://wa.me/${booking.phone}`}
                      target="_blank"
                      className="mt-5 block bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-2xl text-xl font-bold transition"
                    >
                      واتساب
                    </a>

                  </div>

                ))}

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}
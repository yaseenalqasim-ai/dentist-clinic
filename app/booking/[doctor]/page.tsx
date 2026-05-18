"use client";

import { use } from "react";
import { useState } from "react";

type Props = {
  params: Promise<{
    doctor: string;
  }>;
};

export default function DoctorBookingPage(props: Props) {
  const params = use(props.params);

  const doctorName = decodeURIComponent(params.doctor);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    "كشف",
    "تنظيف",
    "حشوة",
    "قلع",
  ];

  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
  ];

  return (
    <main className="min-h-screen bg-[#f3f3f3] p-4 pb-32">

      <div className="max-w-2xl mx-auto">

        <div className="bg-[#2146e8] text-white rounded-[35px] shadow-2xl p-6 mb-6">

          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-right">
            استمارة حجز موعد
          </h1>

          <p className="text-right text-2xl text-gray-200">
            للدكتور "{doctorName}"
          </p>

        </div>

        <div className="bg-white rounded-[35px] shadow-2xl p-5">

          <div className="mb-6">
            <label className="block text-black text-xl font-bold mb-3 text-right">
              👤 الاسم
            </label>

            <input
              type="text"
              placeholder="اكتب الاسم الكامل"
              className="
                w-full
                h-16
                rounded-3xl
                border-2
                border-gray-300
                px-5
                text-right
                text-black
                text-lg
                bg-white
                placeholder-gray-600
                outline-none
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-black text-xl font-bold mb-3 text-right">
              📞 الرقم
            </label>

            <input
              type="tel"
              placeholder="07XXXXXXXXX"
              className="
                w-full
                h-16
                rounded-3xl
                border-2
                border-gray-300
                px-5
                text-right
                text-black
                text-lg
                bg-white
                placeholder-gray-600
                outline-none
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-black text-xl font-bold mb-3 text-right">
              🦷 نوع الحجز
            </label>

            <select
              className="
                w-full
                h-16
                rounded-3xl
                border-2
                border-gray-300
                px-5
                text-right
                text-black
                text-lg
                bg-white
                outline-none
              "
            >
              <option>
                اختر نوع الحجز
              </option>

              {services.map((service) => (
                <option key={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-black text-xl font-bold mb-3 text-right">
              📅 الموعد
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
              className="
                w-full
                h-16
                rounded-3xl
                border-2
                border-gray-300
                px-5
                text-right
                text-black
                text-lg
                bg-white
                outline-none
              "
            />
          </div>

          <div className="mb-8">
            <label className="block text-black text-xl font-bold mb-3 text-right">
              ⏰ الساعة
            </label>

            <select
              value={selectedTime}
              onChange={(e) =>
                setSelectedTime(e.target.value)
              }
              className="
                w-full
                h-16
                rounded-3xl
                border-2
                border-gray-300
                px-5
                text-right
                text-black
                text-lg
                bg-white
                outline-none
              "
            >
              <option value="">
                اختر الوقت
              </option>

              {availableTimes.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {time}
                </option>
              ))}
            </select>
          </div>

          <button
            className="
              w-full
              h-20
              bg-[#2146e8]
              text-white
              rounded-3xl
              text-3xl
              font-bold
              shadow-xl
            "
          >
            تأكيد الحجز
          </button>

        </div>

      </div>

    </main>
  );
}
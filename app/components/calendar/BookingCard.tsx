"use client";

import {
  useState,
} from "react";

import BookingDetailsModal
from "./BookingDetailsModal";

type Props = {
  booking:any;
};

export default function BookingCard({
  booking
}:Props){

  const [
    open,
    setOpen
  ] = useState(false);

  const statusBorders:any = {

    booked:
      "border-blue-500/20",

    completed:
      "border-emerald-500/20",

    cancelled:
      "border-red-500/20",

    waiting:
      "border-orange-500/20",

  };

  const statusGlow:any = {

    booked:
      "hover:shadow-[0_10px_40px_rgba(59,130,246,0.18)]",

    completed:
      "hover:shadow-[0_10px_40px_rgba(16,185,129,0.18)]",

    cancelled:
      "hover:shadow-[0_10px_40px_rgba(239,68,68,0.18)]",

    waiting:
      "hover:shadow-[0_10px_40px_rgba(249,115,22,0.18)]",

  };

  const statusLabels:any = {

    booked:"مؤكد",

    completed:"مكتمل",

    cancelled:"ملغي",

    waiting:"انتظار",

  };

  const statusColors:any = {

    booked:
      "bg-blue-500 text-white",

    completed:
      "bg-emerald-500 text-white",

    cancelled:
      "bg-red-500 text-white",

    waiting:
      "bg-orange-500 text-white",

  };

  return(

    <>

      {/* CARD */}

      <button

        onClick={()=>
          setOpen(true)
        }

        className={`

          w-full
          text-right

          min-h-[165px]

          rounded-[30px]

          border

          ${
            statusBorders[
              booking.status
            ] ||

            "border-white/10"
          }

          bg-gradient-to-b
          from-[#0b1930]
          to-[#071327]

          px-5
          py-5

          shadow-[0_10px_40px_rgba(0,0,0,0.45)]

          transition-all
          duration-300

          hover:scale-[1.015]

          ${
            statusGlow[
              booking.status
            ] || ""
          }

          active:scale-[0.99]

        `}
      >

        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between
            mb-6
          "
        >

          {/* STATUS */}

          <div
            className={`

              px-3
              py-1

              rounded-full

              text-[11px]
              font-black

              shadow-lg

              ${
                statusColors[
                  booking.status
                ] ||

                "bg-blue-500 text-white"
              }

            `}
          >

            {

              statusLabels[
                booking.status
              ] ||

              "مؤكد"

            }

          </div>

          {/* TIME */}

          <div
            className="
              text-right
            "
          >

            <p
              className="
                text-[34px]
                leading-none
                font-black
                text-blue-400
                tracking-tight
              "
            >

              {booking.time}

            </p>

          </div>

        </div>

        {/* BODY */}

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          {/* PATIENT */}

          <div>

            <p
              className="
                text-white
                text-[24px]
                font-black
                leading-none
                mb-1
              "
            >

              {booking.patientName}

            </p>

          </div>

          {/* TREATMENT */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
            "
          >

            <p
              className="
                text-zinc-200
                text-[15px]
                font-semibold
              "
            >

              {booking.treatment}

            </p>

            <span
              className="
                text-blue-400
                text-[16px]
              "
            >
              🦷
            </span>

          </div>

          {/* DOCTOR */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
            "
          >

            <p
              className="
                text-zinc-400
                text-[14px]
                font-medium
              "
            >

              {booking.doctorName}

            </p>

            <span
              className="
                text-zinc-500
              "
            >
              👨‍⚕️
            </span>

          </div>

          {/* FOOTER */}

          <div
            className="
              mt-2
              pt-3

              border-t
              border-white/5

              flex
              items-center
              justify-between
            "
          >

            <div
              className="
                text-zinc-600
                text-[12px]
              "
            >

              {booking.day}

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <p
                className="
                  text-zinc-500
                  text-[12px]
                  font-medium
                "
              >

                {booking.duration} دقيقة

              </p>

              <span
                className="
                  text-zinc-600
                "
              >
                ⏱
              </span>

            </div>

          </div>

        </div>

      </button>

      {/* MODAL */}

      <BookingDetailsModal

        booking={booking}

        open={open}

        onClose={()=>
          setOpen(false)
        }

      />

    </>

  );

}
"use client";

import {
  durationHeight,
  calculateEndTime,
} from "@/lib/calendar";

type Props = {
  booking:any;
  onOpenStatus:()=>void;
};

function statusColor(
  status:string
){

  switch(status){

    case "confirmed":
      return "border-blue-500";

    case "completed":
      return "border-green-500";

    case "cancelled":
      return "border-red-500";

    default:
      return "border-yellow-500";

  }

}

function statusLabel(
  status:string
){

  switch(status){

    case "confirmed":
      return "مؤكد";

    case "completed":
      return "مكتمل";

    case "cancelled":
      return "ملغي";

    default:
      return "انتظار";

  }

}

function statusBadge(
  status:string
){

  switch(status){

    case "confirmed":
      return "bg-blue-500 text-white";

    case "completed":
      return "bg-green-500 text-white";

    case "cancelled":
      return "bg-red-500 text-white";

    default:
      return "bg-yellow-500 text-black";

  }

}

function bookingPosition(
  time:string
){

  switch(time){

    case "09:00":
      return "20px";

    case "10:00":
      return "120px";

    case "11:00":
      return "220px";

    case "11:30":
      return "260px";

    case "12:00":
      return "320px";

    case "01:00":
      return "420px";

    case "02:00":
      return "520px";

    case "03:00":
      return "620px";

    case "04:00":
      return "720px";

    default:
      return "20px";

  }

}

export default function BookingCard({
  booking,
  onOpenStatus,
}:Props){

  return(

    <div

      className={`

        absolute
        right-4
        left-4
        rounded-3xl
        border-2
        p-4
        shadow-2xl
        hover:scale-[1.01]
        transition
        cursor-pointer
        bg-[#111c38]
        overflow-hidden

        ${statusColor(
          booking.status
        )}

      `}

      style={{

        top:
          bookingPosition(
            booking.time
          ),

        height:`

          ${
            durationHeight(
              booking.duration || 60
            )
          }px

        `,

      }}

    >

      {/* Top */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >

        <div
          className="
            text-xl
            font-black
            text-[#4b6bff]
            leading-8
          "
        >

          {booking.time}

          <span
            className="
              text-zinc-500
              mx-2
            "
          >

            -

          </span>

          {

            calculateEndTime(
              booking.time,
              booking.duration || 60
            )

          }

        </div>

        <div
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-bold

            ${statusBadge(
              booking.status
            )}
          `}
        >

          {

            statusLabel(
              booking.status
            )

          }

        </div>

      </div>

      {/* Patient */}

      <div
        className="
          text-2xl
          font-black
          text-white
          text-right
          mb-2
        "
      >

        👤 {
          booking.patientName
        }

      </div>

      {/* Treatment */}

      <div
        className="
          text-zinc-300
          text-right
          mb-3
          font-medium
        "
      >

        🦷 {
          booking.treatment
        }

      </div>

      {/* Doctor */}

      <div
        className="
          text-sm
          text-zinc-500
          text-right
          mb-4
        "
      >

        👨‍⚕️ {
          booking.doctorName
        }

      </div>

      {/* Duration */}

      <div
        className="
          text-xs
          text-zinc-500
          text-right
          mb-6
        "
      >

        مدة الجلسة:
        {" "}
        {
          booking.duration || 60
        }
        {" "}
        دقيقة

      </div>

      {/* Action */}

      <button

        onClick={onOpenStatus}

        className="
          absolute
          bottom-4
          right-4
          left-4
          h-12
          rounded-2xl
          bg-[#2146e8]
          text-white
          font-black
          hover:bg-[#3358ff]
          transition
        "
      >

        تغيير الحالة

      </button>

    </div>

  );

}
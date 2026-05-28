"use client";

import {
  useMemo,
  useState,
} from "react";

import CalendarHeader
from "@/app/components/calendar/CalendarHeader";

import WeeklyBoard
from "@/app/components/calendar/WeeklyBoard";

import StatusModal
from "@/app/components/calendar/StatusModal";

import QuickBookingModal
from "@/app/components/calendar/QuickBookingModal";

type Booking = {
  id:string;
  patientName:string;
  time:string;
  status:string;
  treatment:string;
  doctorName:string;
  duration:number;
  day:string;
};

export default function CalendarPage(){

  const [
    statusModal,
    setStatusModal
  ] = useState(false);

  const [
    quickBookingModal,
    setQuickBookingModal
  ] = useState(false);

  const [
    bookings,
    setBookings
  ] = useState<Booking[]>([

    {
      id:"1",
      patientName:"ياسين",
      time:"09:00",
      status:"confirmed",
      treatment:"تبييض الأسنان",
      doctorName:"د. أحمد",
      duration:120,
      day:"الأحد",
    },

    {
      id:"2",
      patientName:"محمد",
      time:"11:30",
      status:"completed",
      treatment:"تقويم",
      doctorName:"د. أحمد",
      duration:60,
      day:"الأحد",
    },

    {
      id:"3",
      patientName:"علي",
      time:"01:00",
      status:"booked",
      treatment:"قلع",
      doctorName:"د. محمد",
      duration:45,
      day:"الاثنين",
    },

  ]);

  const weeklyStats = useMemo(()=>{

    return {

      total:
        bookings.length,

      completed:
        bookings.filter(
          b => b.status === "completed"
        ).length,

      cancelled:
        bookings.filter(
          b => b.status === "cancelled"
        ).length,

    };

  },[bookings]);

  return(

    <main
      className="
        min-h-screen
        bg-[#071028]
        text-white
        p-4
        pb-32
      "
    >

      <div
        className="
          max-w-[1900px]
          mx-auto
        "
      >

        {/* Header */}

        <CalendarHeader

          onOpenBooking={()=>
            setQuickBookingModal(true)
          }

        />

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-3
            gap-4
            mb-6
          "
        >

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-zinc-400
                mb-2
              "
            >

              مرضى الأسبوع

            </p>

            <h2
              className="
                text-4xl
                font-black
              "
            >

              {weeklyStats.total}

            </h2>

          </div>

          <div
            className="
              bg-emerald-500/10
              border
              border-emerald-500/20
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-emerald-300
                mb-2
              "
            >

              مكتمل

            </p>

            <h2
              className="
                text-4xl
                font-black
              "
            >

              {weeklyStats.completed}

            </h2>

          </div>

          <div
            className="
              bg-red-500/10
              border
              border-red-500/20
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-red-300
                mb-2
              "
            >

              ملغي

            </p>

            <h2
              className="
                text-4xl
                font-black
              "
            >

              {weeklyStats.cancelled}

            </h2>

          </div>

        </div>

        {/* Weekly Board */}

        <WeeklyBoard

          bookings={bookings}

          onOpenStatus={()=>
            setStatusModal(true)
          }

        />

      </div>

      {/* Status Modal */}

      <StatusModal

        open={statusModal}

        onClose={()=>
          setStatusModal(false)
        }

      />

      {/* Quick Booking Modal */}

      <QuickBookingModal

        open={quickBookingModal}

        onClose={()=>
          setQuickBookingModal(false)
        }

      />

    </main>

  );

}
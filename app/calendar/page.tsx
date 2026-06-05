"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import {
  Plus,
} from "lucide-react";

import {
  db,
} from "@/lib/firebase";

import CalendarHeader
from "@/app/components/calendar/CalendarHeader";

import WeeklyBoard
from "@/app/components/calendar/WeeklyBoard";

import QuickBookingModal
from "@/app/components/calendar/QuickBookingModal";

import AuthGuard
from "@/app/components/auth/AuthGuard";

export default function CalendarPage(){

  const [
    bookings,
    setBookings
  ] = useState<any[]>([]);

  const [
    bookingModal,
    setBookingModal
  ] = useState(false);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(()=>{

    const q =
      query(

        collection(
          db,
          "bookings"
        ),

        orderBy(
          "createdAt",
          "desc"
        )

      );

    const unsubscribe =
      onSnapshot(q,(snapshot)=>{

        const data:any[] = [];

        snapshot.forEach((docItem)=>{

          data.push({

            id:docItem.id,

            ...docItem.data(),

          });

        });

        setBookings(data);

        setLoading(false);

      });

    return ()=>unsubscribe();

  },[]);

  const filteredBookings =
    useMemo(()=>{

      return bookings.filter((booking)=>{

        const text =
          search.toLowerCase();

        return(

          booking.patientName
          ?.toLowerCase()
          .includes(text)

          ||

          booking.treatment
          ?.toLowerCase()
          .includes(text)

          ||

          booking.doctorName
          ?.toLowerCase()
          .includes(text)

        );

      });

    },[
      bookings,
      search
    ]);

  const weeklyStats =
    useMemo(()=>{

      return {

        total:
          filteredBookings.length,

        completed:
          filteredBookings.filter(
            booking =>
              booking.status
              ===
              "completed"
          ).length,

        cancelled:
          filteredBookings.filter(
            booking =>
              booking.status
              ===
              "cancelled"
          ).length,

      };

    },[
      filteredBookings
    ]);

  if(loading){

    return(

      <main
        className="
          min-h-screen
          bg-[#071028]
          flex
          items-center
          justify-center
          text-white
          text-3xl
          font-black
        "
      >

        جاري تحميل الحجوزات...

      </main>

    );

  }

  return(

    <AuthGuard>

      <main
        className="
          min-h-screen
          bg-[#071028]
          text-white
          px-3
          md:px-6
          pt-4
          pb-40
        "
      >

        {/* BACKGROUND */}

        <div
          className="
            fixed
            top-[-150px]
            left-[-150px]
            w-[400px]
            h-[400px]
            rounded-full
            bg-blue-500/10
            blur-[120px]
            pointer-events-none
          "
        />

        <div
          className="
            fixed
            bottom-[-200px]
            right-[-150px]
            w-[400px]
            h-[400px]
            rounded-full
            bg-indigo-500/10
            blur-[140px]
            pointer-events-none
          "
        />

        <div
          className="
            relative
            max-w-[1900px]
            mx-auto
          "
        >

          {/* HEADER */}

          <CalendarHeader

            search={search}

            setSearch={setSearch}

          />

          {/* STATS */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-4
              mb-6
            "
          >

            <StatCard
              title="إجمالي الحجوزات"
              value={weeklyStats.total}
            />

            <StatCard
              title="الحجوزات المكتملة"
              value={weeklyStats.completed}
              green
            />

            <StatCard
              title="الحجوزات الملغية"
              value={weeklyStats.cancelled}
              red
            />

          </div>

          {/* BOARD */}

          <WeeklyBoard
            bookings={filteredBookings}
          />

        </div>

        {/* FLOATING BUTTON */}

        <button

          onClick={()=>
            setBookingModal(true)
          }

          className="
            fixed
            bottom-28
            right-5
            z-[90]
            w-[72px]
            h-[72px]
            rounded-full
            bg-gradient-to-br
            from-[#3257ff]
            to-[#5271ff]
            shadow-[0_20px_50px_rgba(50,87,255,0.45)]
            flex
            items-center
            justify-center
            hover:scale-110
            active:scale-95
            transition-all
            duration-300
          "
        >

          <Plus
            size={34}
            strokeWidth={3}
          />

        </button>

        {/* MODAL */}

        <QuickBookingModal

          open={bookingModal}

          onClose={()=>
            setBookingModal(false)
          }

          bookings={bookings}

        />

      </main>

    </AuthGuard>

  );

}

/* STAT CARD */

function StatCard({
  title,
  value,
  green,
  red,
}:any){

  return(

    <div
      className={`

        rounded-[32px]

        p-6

        border

        backdrop-blur-xl

        shadow-[0_15px_50px_rgba(0,0,0,0.35)]

        ${
          green
            ? "bg-emerald-500/10 border-emerald-500/20"
            : red
            ? "bg-red-500/10 border-red-500/20"
            : "bg-[#091427] border-white/10"
        }

      `}
    >

      <p
        className="
          text-zinc-500
          text-sm
          mb-3
        "
      >

        {title}

      </p>

      <h2
        className="
          text-white
          text-[52px]
          leading-none
          font-black
        "
      >

        {value}

      </h2>

    </div>

  );

}
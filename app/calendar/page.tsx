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
  ChevronLeft,
  ChevronRight,
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

  const [
    currentDate,
    setCurrentDate
  ] = useState(new Date());

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

  const monthName =
    currentDate.toLocaleDateString(
      "ar-EG",
      {
        month:"long",
        year:"numeric",
      }
    );

  function nextMonth(){

    const next =
      new Date(currentDate);

    next.setMonth(
      next.getMonth() + 1
    );

    setCurrentDate(next);

  }

  function prevMonth(){

    const prev =
      new Date(currentDate);

    prev.setMonth(
      prev.getMonth() - 1
    );

    setCurrentDate(prev);

  }

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

          {/* MONTH NAVIGATION */}

          <div
            className="
              mb-5

              rounded-[28px]

              bg-[#091427]

              border
              border-white/10

              px-4
              py-4

              flex
              items-center
              justify-between
            "
          >

            <button

              onClick={nextMonth}

              className="
                w-12
                h-12

                rounded-2xl

                bg-white/5

                flex
                items-center
                justify-center

                hover:bg-white/10

                transition-all
              "
            >

              <ChevronLeft size={24} />

            </button>

            <div
              className="
                text-center
              "
            >

              <p
                className="
                  text-zinc-500
                  text-sm
                  mb-1
                "
              >

                الشهر الحالي

              </p>

              <h2
                className="
                  text-white
                  text-[28px]
                  font-black
                "
              >

                {monthName}

              </h2>

            </div>

            <button

              onClick={prevMonth}

              className="
                w-12
                h-12

                rounded-2xl

                bg-white/5

                flex
                items-center
                justify-center

                hover:bg-white/10

                transition-all
              "
            >

              <ChevronRight size={24} />

            </button>

          </div>

          {/* STATS */}

          <div
            className="
              grid
              grid-cols-3

              gap-3

              mb-5
            "
          >

            <StatCard
              title="الكل"
              value={weeklyStats.total}
            />

            <StatCard
              title="مكتملة"
              value={weeklyStats.completed}
              green
            />

            <StatCard
              title="ملغية"
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

        rounded-[24px]

        px-3
        py-4

        border

        backdrop-blur-xl

        shadow-[0_10px_30px_rgba(0,0,0,0.25)]

        min-h-[105px]

        flex
        flex-col
        justify-between

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
          text-zinc-400

          text-[12px]
          md:text-sm

          text-right

          font-medium
        "
      >

        {title}

      </p>

      <h2
        className="
          text-white

          text-[38px]
          md:text-[52px]

          leading-none

          font-black

          text-left
        "
      >

        {value}

      </h2>

    </div>

  );

}
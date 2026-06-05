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

  /* LOADING */

  if(loading){

    return(

      <main
        className="
          min-h-screen
          bg-[#071028]

          p-4
          md:p-6
        "
      >

        <div
          className="
            max-w-[1900px]
            mx-auto
          "
        >

          {/* HEADER */}

          <div
            className="
              h-[140px]

              rounded-[36px]

              bg-[#091427]

              border
              border-white/10

              animate-pulse

              mb-8
            "
          />

          {/* STATS */}

          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-3

              gap-4

              mb-8
            "
          >

            {

              Array.from({
                length:3
              }).map((_,i)=>(

                <div

                  key={i}

                  className="
                    h-[130px]

                    rounded-[30px]

                    bg-[#091427]

                    border
                    border-white/10

                    animate-pulse
                  "
                />

              ))

            }

          </div>

          {/* BOARD */}

          <div
            className="
              flex
              gap-5

              overflow-hidden
            "
          >

            {

              Array.from({
                length:4
              }).map((_,i)=>(

                <div

                  key={i}

                  className="
                    w-[320px]

                    rounded-[34px]

                    bg-[#091427]

                    border
                    border-white/10

                    flex-shrink-0

                    overflow-hidden
                  "
                >

                  <div
                    className="
                      h-[90px]

                      bg-blue-500/20

                      animate-pulse
                    "
                  />

                  <div
                    className="
                      p-4

                      flex
                      flex-col
                      gap-4
                    "
                  >

                    {

                      Array.from({
                        length:3
                      }).map((_,x)=>(

                        <div

                          key={x}

                          className="
                            h-[170px]

                            rounded-[28px]

                            bg-[#0d1730]

                            animate-pulse
                          "
                        />

                      ))

                    }

                  </div>

                </div>

              ))

            }

          </div>

        </div>

      </main>

    );

  }

  /* PAGE */

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
          pb-36
        "
      >

        <div
          className="
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

              mb-7
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

          {/* ADD BUTTON */}

          <div
            className="
              flex
              justify-end
              mb-7
            "
          >

            <button

              onClick={()=>
                setBookingModal(true)
              }

              className="
                h-16

                px-7

                rounded-[24px]

                bg-gradient-to-r
                from-[#2948ff]
                to-[#3d63ff]

                shadow-[0_10px_30px_rgba(41,72,255,0.35)]

                hover:scale-[1.02]

                transition-all
                duration-300

                text-white
                text-[17px]
                font-black
              "
            >

              + حجز جديد

            </button>

          </div>

          {/* BOARD */}

          <WeeklyBoard
            bookings={filteredBookings}
          />

        </div>

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

        rounded-[30px]

        p-6

        shadow-[0_10px_40px_rgba(0,0,0,0.35)]

        border

        ${
          green

          ?

          "bg-emerald-500/10 border-emerald-500/20"

          :

          red

          ?

          "bg-red-500/10 border-red-500/20"

          :

          "bg-[#091427] border-white/10"

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
          text-[42px]
          font-black
          leading-none
        "
      >

        {value}

      </h2>

    </div>

  );

}
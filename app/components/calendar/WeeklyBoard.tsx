"use client";

import BookingCard
from "./BookingCard";

type Props = {
  bookings:any[];
};

const days = [

  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",

];

export default function WeeklyBoard({
  bookings,
}:Props){

  return(

    <div
      className="
        w-full

        overflow-x-auto

        pb-6

        snap-x
        snap-mandatory

        scroll-smooth

        scrollbar-thin
        scrollbar-thumb-blue-500/30
        scrollbar-track-transparent
      "
    >

      <div
        className="
          flex
          gap-4

          md:grid
          md:grid-cols-5

          md:min-w-0
        "
      >

        {

          days.map((day)=>{

            const dayBookings =
              bookings.filter(
                booking =>
                  booking.day
                  ===
                  day
              );

            return(

              <div

                key={day}

                className="
                  snap-center

                  min-w-[84vw]
                  max-w-[84vw]

                  md:min-w-0
                  md:max-w-none

                  md:w-full

                  bg-[#0d1730]

                  rounded-[36px]

                  border
                  border-white/10

                  overflow-hidden

                  flex
                  flex-col

                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                "
              >

                {/* HEADER */}

                <div
                  className="
                    bg-gradient-to-r
                    from-[#3257ff]
                    to-[#5271ff]

                    p-5

                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      w-16
                      h-16

                      rounded-[22px]

                      bg-white/10

                      flex
                      items-center
                      justify-center

                      text-3xl

                      shadow-inner
                    "
                  >
                    🗓️
                  </div>

                  <div
                    className="
                      text-right
                    "
                  >

                    <h2
                      className="
                        text-white

                        text-[30px]

                        font-black

                        leading-none

                        mb-2
                      "
                    >

                      {day}

                    </h2>

                    <p
                      className="
                        text-white/70

                        text-[15px]

                        font-medium
                      "
                    >

                      {
                        dayBookings.length
                      } حجوزات

                    </p>

                  </div>

                </div>

                {/* BODY */}

                <div
                  className="
                    p-3

                    min-h-[430px]

                    flex
                    flex-col
                    gap-4
                  "
                >

                  {

                    dayBookings.length
                    ===
                    0

                    ? (

                      <div
                        className="
                          flex-1

                          rounded-[28px]

                          border-2
                          border-dashed
                          border-white/5

                          flex
                          items-center
                          justify-center

                          text-zinc-600
                          text-xl
                          font-bold
                        "
                      >

                        لا توجد حجوزات

                      </div>

                    )

                    :

                    dayBookings.map(
                      (booking)=>(

                        <BookingCard

                          key={booking.id}

                          booking={booking}

                        />

                      )
                    )

                  }

                </div>

              </div>

            );

          })

        }

      </div>

    </div>

  );

}
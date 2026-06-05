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

    <div className="w-full">

      {/* MOBILE */}

      <div
        className="
          md:hidden

          flex
          gap-4

          overflow-x-scroll

          snap-x
          snap-mandatory

          pb-6

          scroll-smooth
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
                  min-w-[88vw]
                  max-w-[88vw]

                  snap-center

                  rounded-[34px]

                  bg-[#0d1730]

                  border
                  border-white/10

                  overflow-hidden

                  flex-shrink-0
                "
              >

                {/* HEADER */}

                <div
                  className="
                    h-[90px]

                    px-5

                    bg-gradient-to-r
                    from-[#3157ff]
                    to-[#4469ff]

                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      bg-white/10

                      flex
                      items-center
                      justify-center

                      text-2xl
                    "
                  >
                    🗓️
                  </div>

                  <div className="text-right">

                    <h2
                      className="
                        text-white
                        text-[32px]
                        font-black
                      "
                    >

                      {day}

                    </h2>

                    <p
                      className="
                        text-white/70
                        text-sm
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
                    p-4

                    flex
                    flex-col
                    gap-4

                    min-h-[500px]
                  "
                >

                  {

                    dayBookings.length
                    ===
                    0

                    ?

                    <div
                      className="
                        flex-1

                        rounded-[24px]

                        border
                        border-dashed
                        border-white/10

                        flex
                        items-center
                        justify-center

                        text-zinc-500
                      "
                    >

                      لا توجد حجوزات

                    </div>

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

      {/* DESKTOP */}

      <div
        className="
          hidden
          md:grid

          grid-cols-5
          gap-5
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
                  rounded-[34px]

                  bg-[#0d1730]

                  border
                  border-white/10

                  overflow-hidden
                "
              >

                <div
                  className="
                    h-[90px]

                    px-5

                    bg-gradient-to-r
                    from-[#3157ff]
                    to-[#4469ff]

                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      bg-white/10

                      flex
                      items-center
                      justify-center
                    "
                  >
                    🗓️
                  </div>

                  <div className="text-right">

                    <h2
                      className="
                        text-white
                        text-[30px]
                        font-black
                      "
                    >

                      {day}

                    </h2>

                    <p
                      className="
                        text-white/70
                        text-sm
                      "
                    >

                      {
                        dayBookings.length
                      } حجوزات

                    </p>

                  </div>

                </div>

                <div
                  className="
                    p-4

                    flex
                    flex-col
                    gap-4

                    min-h-[700px]
                  "
                >

                  {

                    dayBookings.length
                    ===
                    0

                    ?

                    <div
                      className="
                        flex-1

                        rounded-[24px]

                        border
                        border-dashed
                        border-white/10

                        flex
                        items-center
                        justify-center

                        text-zinc-500
                      "
                    >

                      لا توجد حجوزات

                    </div>

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
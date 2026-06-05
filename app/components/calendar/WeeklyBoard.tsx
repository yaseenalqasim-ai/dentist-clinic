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

  const noResults =
    bookings.length === 0;

  if(noResults){

    return(

      <div
        className="
          w-full

          min-h-[60vh]

          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            w-full
            max-w-xl

            bg-[#091427]

            border
            border-white/10

            rounded-[40px]

            p-10

            text-center

            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          "
        >

          <div
            className="
              text-7xl
              mb-6
            "
          >

            🔍

          </div>

          <h2
            className="
              text-white
              text-[34px]
              font-black
              mb-4
            "
          >

            لا توجد نتائج

          </h2>

          <p
            className="
              text-zinc-500
              text-lg
              leading-loose
            "
          >

            لم يتم العثور على أي حجوزات
            مطابقة لعملية البحث الحالية

          </p>

        </div>

      </div>

    );

  }

  return(

    <div
      className="
        w-full

        overflow-x-auto

        pb-40

        scrollbar-hide
      "
    >

      <div
        className="
          flex
          gap-4
          md:gap-6

          snap-x
          snap-mandatory

          min-w-max
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

                  w-[92vw]
                  md:w-[340px]

                  max-w-[340px]

                  bg-[#0c1830]

                  border
                  border-white/10

                  rounded-[34px]

                  overflow-hidden

                  flex
                  flex-col

                  shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                  flex-shrink-0
                "
              >

                {/* HEADER */}

                <div
                  className="
                    sticky
                    top-0
                    z-20

                    bg-gradient-to-r
                    from-[#2948ff]
                    to-[#375dff]

                    px-5
                    py-5

                    border-b
                    border-white/10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        text-white
                      "
                    >

                      <h2
                        className="
                          text-[28px]
                          font-black
                          leading-none
                        "
                      >

                        {day}

                      </h2>

                      <p
                        className="
                          text-blue-100/70
                          text-sm
                          mt-2
                        "
                      >

                        {
                          dayBookings.length
                        } حجوزات

                      </p>

                    </div>

                    <div
                      className="
                        w-12
                        h-12

                        rounded-2xl

                        bg-white/10

                        flex
                        items-center
                        justify-center

                        text-xl
                      "
                    >

                      📅

                    </div>

                  </div>

                </div>

                {/* BODY */}

                <div
                  className="
                    flex-1

                    p-4

                    flex
                    flex-col
                    gap-4

                    overflow-y-auto

                    max-h-[72vh]
                  "
                >

                  {

                    dayBookings.length === 0

                    ?

                    <div
                      className="
                        h-[220px]

                        rounded-3xl

                        border
                        border-dashed
                        border-white/10

                        flex
                        items-center
                        justify-center

                        text-zinc-500
                        text-sm
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
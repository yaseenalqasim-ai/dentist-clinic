"use client";

import BookingCard
from "./BookingCard";

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

type Props = {
  bookings:Booking[];
  onOpenStatus:()=>void;
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
  onOpenStatus,
}:Props){

  return(

    <div
      className="
        w-full
        overflow-x-auto
      "
    >

      <div
        className="
          min-w-[1700px]
          grid
          grid-cols-5
          gap-5
        "
      >

        {

          days.map((day)=>{

            const dayBookings =
              bookings.filter(
                booking =>
                  booking.day === day
              );

            return(

              <div

                key={day}

                className="
                  bg-[#0d1730]
                  rounded-3xl
                  border
                  border-white/10
                  min-h-[1200px]
                  flex
                  flex-col
                  overflow-hidden
                "
              >

                {/* Header */}

                <div
                  className="
                    sticky
                    top-0
                    z-10
                    bg-[#2146e8]
                    text-white
                    p-5
                    text-center
                    text-2xl
                    font-black
                  "
                >

                  {day}

                </div>

                {/* Timeline */}

                <div
                  className="
                    relative
                    flex-1
                  "
                >

                  {/* Hour Lines */}

                  {

                    Array.from({
                      length:12
                    }).map((_,i)=>(

                      <div

                        key={i}

                        className="
                          absolute
                          right-0
                          left-0
                          border-t
                          border-white/5
                        "

                        style={{
                          top:`${i*100}px`
                        }}
                      >

                        <div
                          className="
                            absolute
                            left-3
                            -top-3
                            text-xs
                            text-zinc-500
                          "
                        >

                          {
                            9 + i
                          }:00

                        </div>

                      </div>

                    ))

                  }

                  {/* Bookings */}

                  {

                    dayBookings.map(
                      (booking)=>(

                        <BookingCard

                          key={booking.id}

                          booking={booking}

                          onOpenStatus={
                            onOpenStatus
                          }

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
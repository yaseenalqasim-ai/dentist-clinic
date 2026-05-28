"use client";

type Props = {
  onOpenBooking:()=>void;
};

export default function CalendarHeader({
  onOpenBooking,
}:Props){

  return(

    <div
      className="
        sticky
        top-0
        z-40
        bg-[#071028]
        pb-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-5
        "
      >

        {/* Right */}

        <div>

          <h1
            className="
              text-4xl
              font-black
              text-white
              mb-2
            "
          >

            📅 الحجوزات الأسبوعية

          </h1>

          <p
            className="
              text-zinc-400
              text-lg
            "
          >

            إدارة مواعيد العيادة بشكل احترافي

          </p>

        </div>

        {/* Left */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <input

            placeholder="
              البحث عن مريض...
            "

            className="
              h-14
              w-[280px]
              rounded-2xl
              bg-[#111c38]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <button

            onClick={onOpenBooking}

            className="
              h-14
              px-6
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              font-black
            "
          >

            + حجز جديد

          </button>

        </div>

      </div>

    </div>

  );

}
"use client";

type Props = {

  search:string;

  setSearch:(value:string)=>void;

};

export default function CalendarHeader({
  search,
  setSearch,
}:Props){

  return(

    <div
      className="
        w-full

        mb-8

        flex
        flex-col
        lg:flex-row

        lg:items-center
        lg:justify-between

        gap-5

        bg-[#091427]

        border
        border-white/10

        rounded-[36px]

        px-5
        md:px-8

        py-6

        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
    >

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            w-14
            h-14

            rounded-2xl

            bg-gradient-to-br
            from-[#2948ff]
            to-[#4f6bff]

            flex
            items-center
            justify-center

            text-3xl

            shadow-xl
          "
        >

          🗓️

        </div>

        <div
          className="
            text-right
          "
        >

          <h1
            className="
              text-[34px]
              md:text-[42px]

              leading-none

              font-black

              text-white

              tracking-tight
            "
          >

            الحجوزات الأسبوعية

          </h1>

          <p
            className="
              text-zinc-400
              text-sm
              md:text-[15px]

              mt-2
              font-medium
            "
          >

            إدارة مواعيد العيادة بشكل احترافي

          </p>

        </div>

      </div>

      {/* LEFT */}

      <div
        className="
          flex
          flex-col
          md:flex-row

          items-stretch
          md:items-center

          gap-4
        "
      >

        {/* SEARCH */}

        <div
          className="
            w-full
            md:w-[320px]

            bg-[#0d1a31]

            border
            border-white/10

            rounded-2xl

            px-5
            h-14

            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              text-zinc-500
              text-lg
            "
          >

            🔍

          </span>

          <input

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

            placeholder="
              ابحث عن مريض أو علاج...
            "

            className="
              bg-transparent
              outline-none

              text-white
              placeholder:text-zinc-500

              w-full
            "
          />

        </div>

        {/* MONTH */}

        <div
          className="
            bg-[#0d1a31]

            border
            border-white/10

            rounded-2xl

            px-6
            h-14

            flex
            flex-col
            items-center
            justify-center

            text-center

            min-w-[140px]
          "
        >

          <p
            className="
              text-zinc-500
              text-[10px]
              mb-1
            "
          >

            الشهر الحالي

          </p>

          <h3
            className="
              text-white
              text-sm
              font-black
            "
          >

            يونيو 2026

          </h3>

        </div>

      </div>

    </div>

  );

}
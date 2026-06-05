"use client";

type Props = {
  search:string;
  setSearch:any;
};

export default function CalendarHeader({
  search,
  setSearch,
}:Props){

  return(

    <div
      className="
        rounded-[34px]

        border
        border-white/10

        bg-[#091427]

        p-5
        md:p-7

        mb-6
      "
    >

      {/* TOP */}

      <div
        className="
          flex
          items-center
          justify-between

          gap-4

          mb-5
        "
      >

        <div
          className="
            w-20
            h-20

            md:w-24
            md:h-24

            rounded-[28px]

            bg-gradient-to-br
            from-[#3d63ff]
            to-[#4b6fff]

            flex
            items-center
            justify-center

            text-4xl

            shadow-[0_15px_35px_rgba(61,99,255,0.35)]

            flex-shrink-0
          "
        >
          🗓️
        </div>

        <div
          className="
            text-right
            flex-1
          "
        >

          <h1
            className="
              text-white

              text-[42px]
              md:text-[64px]

              leading-none

              font-black

              mb-2
            "
          >

            الحجوزات الأسبوعية

          </h1>

          <p
            className="
              text-zinc-400

              text-[16px]
              md:text-[22px]
            "
          >

            إدارة مواعيد العيادة بشكل احترافي

          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div
        className="
          relative
          mb-4
        "
      >

        <input

          value={search}

          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }

          placeholder="ابحث عن مريض أو علاج..."

          className="
            w-full

            h-[72px]

            rounded-[24px]

            bg-[#0d1730]

            border
            border-white/10

            pr-6
            pl-16

            text-white
            text-[20px]

            outline-none

            focus:border-blue-500/50

            transition-all
          "
        />

        <div
          className="
            absolute

            left-5
            top-1/2
            -translate-y-1/2

            text-3xl
          "
        >
          🔍
        </div>

      </div>

      {/* MONTH */}

      <div
        className="
          h-[92px]

          rounded-[28px]

          border
          border-white/10

          bg-[#0d1730]

          flex
          flex-col
          items-center
          justify-center
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
            text-[26px]
            font-black
          "
        >
          يونيو 2026
        </h2>

      </div>

    </div>

  );

}
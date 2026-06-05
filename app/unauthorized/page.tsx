"use client";

import Link
from "next/link";

export default function UnauthorizedPage(){

  return(

    <main
      className="
        min-h-screen
        bg-[#071028]
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          rounded-[40px]
          bg-[#0d1730]
          border
          border-white/10
          p-10
          text-center
        "
      >

        {/* Icon */}

        <div
          className="
            text-8xl
            mb-6
          "
        >

          🔒

        </div>

        {/* Title */}

        <h1
          className="
            text-5xl
            font-black
            text-white
            mb-5
          "
        >

          غير مصرح لك

        </h1>

        {/* Description */}

        <p
          className="
            text-zinc-400
            text-xl
            leading-9
            mb-10
          "
        >

          ليس لديك صلاحية للوصول
          إلى هذه الصفحة.

        </p>

        {/* Actions */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-4
          "
        >

          <Link

            href="/"

            className="
              h-14
              px-8
              rounded-2xl
              bg-[#2146e8]
              hover:bg-[#3257ff]
              transition
              text-white
              font-black
              flex
              items-center
              justify-center
            "
          >

            العودة للرئيسية

          </Link>

          <Link

            href="/calendar"

            className="
              h-14
              px-8
              rounded-2xl
              bg-white/5
              border
              border-white/10
              hover:bg-white/10
              transition
              text-white
              font-black
              flex
              items-center
              justify-center
            "
          >

            الحجوزات

          </Link>

        </div>

      </div>

    </main>

  );

}
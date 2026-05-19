Skip to content
 
Search Gists
Search...
All gists
Back to GitHub
@yaseenalqasim-ai
yaseenalqasim-ai/page.tsx Secret
Created 24 minutes ago
Code
Revisions
1
Clone this repository at &lt;script src=&quot;https://gist.github.com/yaseenalqasim-ai/5d2eebd4246e912678cc3a11db5b1120.js&quot;&gt;&lt;/script&gt;
<script src="https://gist.github.com/yaseenalqasim-ai/5d2eebd4246e912678cc3a11db5b1120.js"></script>
Copied!
1
page.tsx
"use client";

import Link from "next/link";

import {

  Users,

  CalendarDays,

  Plus,

  Activity,

} from "lucide-react";

export default function HomePage() {

  return (

    <main
      className="
        min-h-screen
        bg-[#08144a]
        p-5
        pb-32
      "
    >

      <div
        className="
          bg-[#2146e8]
          rounded-[32px]
          p-6
          shadow-2xl
          mb-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-3
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-white/20
              flex
              items-center
              justify-center
            "
          >

            <Activity
              size={34}
              color="white"
            />

          </div>

          <div
            className="
              text-right
            "
          >

            <h1
              className="
                text-white
                text-4xl
                font-extrabold
                mb-2
              "
            >

              لوحة التحكم

            </h1>

            <p
              className="
                text-blue-100
                text-lg
              "
            >

              إدارة العيادة الطبية

            </p>

          </div>

        </div>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mb-6
        "
      >

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-2xl
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              mb-5
            "
          >

            <Users
              size={30}
              className="
                text-[#2146e8]
              "
            />

          </div>

          <div
            className="
              text-5xl
              font-extrabold
              text-black
              mb-2
            "
          >

            0

          </div>

          <div
            className="
              text-gray-500
              text-xl
              font-bold
            "
          >

            المرضى

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-2xl
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              mb-5
            "
          >

            <CalendarDays
              size={30}
              className="
                text-[#2146e8]
              "
            />

          </div>

          <div
            className="
              text-5xl
              font-extrabold
              text-black
              mb-2
            "
          >

            0

          </div>

          <div
            className="
              text-gray-500
              text-xl
              font-bold
            "
          >

            الحجوزات

          </div>

        </div>

      </div>

      <div
        className="
          bg-white
          rounded-[30px]
          p-6
          shadow-2xl
          mb-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-4
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-orange-100
              flex
              items-center
              justify-center
            "
          >

            <CalendarDays
              size={30}
              className="
                text-orange-500
              "
            />

          </div>

          <div
            className="
              text-right
            "
          >

            <div
              className="
                text-3xl
                font-extrabold
                text-black
              "
            >

              حجوزات اليوم

            </div>

            <div
              className="
                text-gray-500
                text-lg
                mt-1
              "
            >

              لا توجد حجوزات اليوم

            </div>

          </div>

        </div>

      </div>

      <div
        className="
          space-y-4
        "
      >

        <Link
          href="/calendar"
          className="
            h-24
            bg-white
            rounded-[30px]
            shadow-2xl
            flex
            items-center
            justify-between
            px-6
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
            "
          >

            <CalendarDays
              size={30}
              className="
                text-[#2146e8]
              "
            />

          </div>

          <div
            className="
              text-2xl
              font-extrabold
              text-black
            "
          >

            إدارة الحجوزات

          </div>

        </Link>

        <Link
          href="/patients"
          className="
            h-24
            bg-white
            rounded-[30px]
            shadow-2xl
            flex
            items-center
            justify-between
            px-6
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
            "
          >

            <Users
              size={30}
              className="
                text-[#2146e8]
              "
            />

          </div>

          <div
            className="
              text-2xl
              font-extrabold
              text-black
            "
          >

            المرضى

          </div>

        </Link>

      </div>

      <Link
        href="/booking/dr-ahmed"
        className="
          fixed
          bottom-28
          left-5
          right-5
          h-20
          bg-[#2146e8]
          rounded-[30px]
          shadow-2xl
          flex
          items-center
          justify-center
          gap-3
        "
      >

        <Plus
          size={32}
          color="white"
        />

        <span
          className="
            text-white
            text-2xl
            font-extrabold
          "
        >

          إنشاء حجز

        </span>

      </Link>

    </main>
  );
}
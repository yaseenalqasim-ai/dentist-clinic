import "./globals.css";

import Link from "next/link";

export const metadata = {
  title: "Clinic CRM",
  description: "Dental Clinic System",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="ar">

      <body
        className="
          bg-gray-100
          min-h-screen
        "
      >

        <div
          className="
            min-h-screen
            pb-24
          "
        >

          {children}

        </div>

        <nav
          className="
            fixed
            bottom-0
            left-0
            right-0
            bg-white
            border-t
            shadow-2xl
            z-50
          "
        >

          <div
            className="
              grid
              grid-cols-5
              text-center
            "
          >

            <Link
              href="/"
              className="
                p-3
                text-sm
                font-bold
                text-gray-700
              "
            >

              🏠
              <div>الرئيسية</div>

            </Link>

            <Link
              href="/calendar"
              className="
                p-3
                text-sm
                font-bold
                text-gray-700
              "
            >

              📅
              <div>الحجوزات</div>

            </Link>

            <Link
              href="/patients"
              className="
                p-3
                text-sm
                font-bold
                text-gray-700
              "
            >

              👥
              <div>المرضى</div>

            </Link>

            <Link
              href="/doctors"
              className="
                p-3
                text-sm
                font-bold
                text-gray-700
              "
            >

              👨‍⚕️
              <div>الأطباء</div>

            </Link>

            <Link
              href="/settings"
              className="
                p-3
                text-sm
                font-bold
                text-gray-700
              "
            >

              ⚙️
              <div>الإعدادات</div>

            </Link>

          </div>

        </nav>

      </body>

    </html>
  );
}
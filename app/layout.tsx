"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "الرئيسية",
      icon: "🏠",
      href: "/",
    },
    {
      name: "الحجوزات",
      icon: "📅",
      href: "/booking",
    },
    {
      name: "المرضى",
      icon: "👥",
      href: "/patients",
    },
    {
      name: "الأطباء",
      icon: "🧑‍⚕️",
      href: "/doctors",
    },
    {
      name: "الإعدادات",
      icon: "⚙️",
      href: "/settings",
    },
  ];

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0b1b55] text-white min-h-screen">

        <div className="pb-24">
          {children}
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
          <div className="grid grid-cols-5">

            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-3 text-sm transition
                  ${
                    active
                      ? "text-blue-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-2xl">
                    {item.icon}
                  </span>

                  <span className="mt-1">
                    {item.name}
                  </span>
                </Link>
              );
            })}

          </div>
        </nav>

      </body>
    </html>
  );
}
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {

  title:
    "Dental Clinic System",

  description:
    "نظام إدارة عيادة الأسنان",

  manifest:
    "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="ar">

      <body>

        {children}

      </body>

    </html>

  );

}
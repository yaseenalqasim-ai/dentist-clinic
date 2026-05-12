import type { Metadata } from "next";

import "./globals.css";

import InstallButton
from "./components/InstallButton";

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

        <InstallButton />

      </body>

    </html>

  );

}
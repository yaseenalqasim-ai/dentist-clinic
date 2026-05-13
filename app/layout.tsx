import type { Metadata }
from "next";

import "./globals.css";

import InstallButton
from "./components/InstallButton";

export const metadata: Metadata = {

  title:
    "Dental Clinic System",

  description:
    "نظام احترافي لإدارة عيادة الأسنان",

  manifest:
    "/manifest.json",

  themeColor:
    "#071739",

  icons: {

    icon:
      "/icon-192.png",

    apple:
      "/icon-192.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="ar"
      dir="rtl"
    >

      <body>

        {children}

        <InstallButton />

      </body>

    </html>

  );

}
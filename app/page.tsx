"use client";

import {
  useAuth,
} from "@/app/context/AuthContext";

import AuthGuard
from "@/app/components/auth/AuthGuard";

import RoleGuard
from "@/app/components/auth/RoleGuard";

import Link
from "next/link";

export default function HomePage(){

  const {
    role,
    userData,
  } = useAuth();

  return(

    <AuthGuard>

      {/* ADMIN */}

      {

        role === "admin"

        &&

        <RoleGuard
          allowedRoles={[
            "admin"
          ]}
        >

          <main
            className="
              min-h-screen
              bg-[#071028]
              text-white
              p-6
            "
          >

            <div
              className="
                max-w-[1800px]
                mx-auto
              "
            >

              <h1
                className="
                  text-5xl
                  font-black
                  mb-3
                "
              >

                لوحة الإدارة

              </h1>

              <p
                className="
                  text-zinc-400
                  text-xl
                  mb-10
                "
              >

                مرحبًا {
                  userData?.name
                }

              </p>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-5
                "
              >

                <Link

                  href="/calendar"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    🗓️

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    الحجوزات

                  </h2>

                </Link>

                <Link

                  href="/doctors"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    👨‍⚕️

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    الأطباء

                  </h2>

                </Link>

                <Link

                  href="/settings"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    ⚙️

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    الإعدادات

                  </h2>

                </Link>

              </div>

            </div>

          </main>

        </RoleGuard>

      }

      {/* DOCTOR */}

      {

        role === "doctor"

        &&

        <RoleGuard
          allowedRoles={[
            "doctor"
          ]}
        >

          <main
            className="
              min-h-screen
              bg-[#071028]
              text-white
              p-6
            "
          >

            <div
              className="
                max-w-[1800px]
                mx-auto
              "
            >

              <h1
                className="
                  text-5xl
                  font-black
                  mb-3
                "
              >

                لوحة الطبيب

              </h1>

              <p
                className="
                  text-zinc-400
                  text-xl
                  mb-10
                "
              >

                مرحبًا دكتور {
                  userData?.name
                }

              </p>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                "
              >

                <Link

                  href="/calendar"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    🗓️

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    الحجوزات

                  </h2>

                </Link>

                <Link

                  href="/patients"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    👥

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    المرضى

                  </h2>

                </Link>

              </div>

            </div>

          </main>

        </RoleGuard>

      }

      {/* SECRETARY */}

      {

        role === "secretary"

        &&

        <RoleGuard
          allowedRoles={[
            "secretary"
          ]}
        >

          <main
            className="
              min-h-screen
              bg-[#071028]
              text-white
              p-6
            "
          >

            <div
              className="
                max-w-[1800px]
                mx-auto
              "
            >

              <h1
                className="
                  text-5xl
                  font-black
                  mb-3
                "
              >

                لوحة السكرتير

              </h1>

              <p
                className="
                  text-zinc-400
                  text-xl
                  mb-10
                "
              >

                مرحبًا {
                  userData?.name
                }

              </p>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                "
              >

                <Link

                  href="/calendar"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    🗓️

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    الحجوزات

                  </h2>

                </Link>

                <Link

                  href="/patients"

                  className="
                    rounded-[32px]
                    bg-[#0d1730]
                    border
                    border-white/10
                    p-8
                    hover:border-blue-500
                    transition
                  "
                >

                  <div
                    className="
                      text-5xl
                      mb-5
                    "
                  >

                    👥

                  </div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      mb-3
                    "
                  >

                    المرضى

                  </h2>

                </Link>

              </div>

            </div>

          </main>

        </RoleGuard>

      }

    </AuthGuard>

  );

}
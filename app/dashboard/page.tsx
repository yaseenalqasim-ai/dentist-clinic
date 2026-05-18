"use client";

import {
  useMemo
} from "react";

import Link
from "next/link";

import AuthGuard
from "../components/AuthGuard";

import BottomNav
from "../components/BottomNav";

import useBookings
from "../hooks/useBookings";

export default function DashboardPage(){

  const {
    bookings,
    loading
  } = useBookings();

  const stats =
    useMemo(()=>{

      const today =
        new Date()
        .toISOString()
        .split("T")[0];

      const todayBookings =
        bookings.filter(
          (booking:any)=>

            booking.date ===
            today
        );

      const completed =
        bookings.filter(
          (booking:any)=>

            booking.status ===
            "🟢 تم التنفيذ"
        );

      const upcoming =
        bookings.filter(
          (booking:any)=>

            booking.status ===
            "🔵 قادم"
        );

      const patientsMap:any =
        {};

      bookings.forEach(
        (booking:any)=>{

          if(
            booking.phone
          ){

            patientsMap[
              booking.phone
            ] = true;

          }

        }
      );

      return {

        totalBookings:
          bookings.length,

        todayBookings:
          todayBookings.length,

        completed:
          completed.length,

        upcoming:
          upcoming.length,

        patients:
          Object.keys(
            patientsMap
          ).length

      };

    },[
      bookings
    ]);

  const latestBookings =
    useMemo(()=>{

      return [...bookings]

      .sort((a:any,b:any)=>{

        const dateCompare =

          (b.date || "")
          .localeCompare(
            a.date || ""
          );

        if(dateCompare !== 0){

          return dateCompare;

        }

        return (
          b.time || ""
        ).localeCompare(
          a.time || ""
        );

      })

      .slice(0,5);

    },[
      bookings
    ]);

  return(

    <AuthGuard>

      <main
        dir="rtl"

        style={{
          minHeight:"100vh",
          background:"#f3f6fb",
          padding:"14px",
          paddingBottom:"100px"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",

            borderRadius:"32px",

            padding:"30px",

            color:"white",

            marginBottom:"20px",

            boxShadow:
              "0 15px 40px rgba(37,99,235,0.25)"
          }}
        >

          <div
            style={{
              fontSize:"18px",
              opacity:0.9,
              marginBottom:"10px"
            }}
          >

            👋 أهلاً بك

          </div>

          <h1
            style={{
              fontSize:"36px",
              marginBottom:"14px",
              fontWeight:"bold"
            }}
          >

            Dental Clinic

          </h1>

          <p
            style={{
              opacity:0.9,
              lineHeight:"1.8"
            }}
          >

            لوحة تحكم إدارة العيادة الطبية

          </p>

        </div>

        {

          loading

          ?

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"40px",
              textAlign:"center",
              fontWeight:"bold"
            }}
          >

            جاري تحميل البيانات...

          </div>

          :

          <>

            <div
              style={{
                display:"grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(160px,1fr))",

                gap:"14px",

                marginBottom:"22px"
              }}
            >

              <StatCard
                title="إجمالي الحجوزات"
                value={stats.totalBookings}
                icon="📅"
              />

              <StatCard
                title="حجوزات اليوم"
                value={stats.todayBookings}
                icon="🕒"
              />

              <StatCard
                title="تم التنفيذ"
                value={stats.completed}
                icon="✅"
              />

              <StatCard
                title="القادمة"
                value={stats.upcoming}
                icon="🔵"
              />

              <StatCard
                title="المرضى"
                value={stats.patients}
                icon="🧑‍⚕️"
              />

            </div>

            <div
              style={{
                display:"grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",

                gap:"14px",

                marginBottom:"24px"
              }}
            >

              <QuickLink
                href="/booking"
                label="إضافة حجز"
                icon="➕"
              />

              <QuickLink
                href="/calendar"
                label="الحجوزات"
                icon="📅"
              />

              <QuickLink
                href="/patients"
                label="المرضى"
                icon="🧑‍⚕️"
              />

              <QuickLink
                href="/reports"
                label="التقارير"
                icon="📊"
              />

            </div>

            <div
              style={{
                background:"white",
                borderRadius:"28px",
                padding:"22px",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.06)"
              }}
            >

              <div
                style={{
                  display:"flex",
                  justifyContent:
                    "space-between",
                  alignItems:"center",
                  marginBottom:"20px"
                }}
              >

                <h2
                  style={{
                    fontSize:"26px",
                    fontWeight:"bold"
                  }}
                >

                  🕒 آخر الحجوزات

                </h2>

              </div>

              {

                latestBookings.length === 0

                ?

                <div
                  style={{
                    color:"#6b7280",
                    textAlign:"center",
                    padding:"20px"
                  }}
                >

                  لا توجد حجوزات

                </div>

                :

                <div
                  style={{
                    display:"grid",
                    gap:"14px"
                  }}
                >

                  {

                    latestBookings.map(
                      (booking:any)=>(

                        <div
                          key={booking.id}

                          style={{
                            background:"#f9fafb",
                            borderRadius:"20px",
                            padding:"16px"
                          }}
                        >

                          <div
                            style={{
                              display:"flex",
                              justifyContent:
                                "space-between",
                              alignItems:"center",
                              marginBottom:"12px"
                            }}
                          >

                            <div
                              style={{
                                fontWeight:"bold",
                                fontSize:"18px"
                              }}
                            >

                              👤 {
                                booking.patientName
                              }

                            </div>

                            <div
                              style={{
                                background:"#dbeafe",
                                color:"#1d4ed8",
                                padding:"8px 12px",
                                borderRadius:"12px",
                                fontSize:"13px",
                                fontWeight:"bold"
                              }}
                            >

                              {
                                booking.status
                              }

                            </div>

                          </div>

                          <div
                            style={{
                              color:"#6b7280",
                              marginBottom:"8px"
                            }}
                          >

                            👨‍⚕️ {
                              booking.doctorName
                            }

                          </div>

                          <div
                            style={{
                              color:"#6b7280",
                              marginBottom:"8px"
                            }}
                          >

                            📅 {
                              booking.date
                            }

                          </div>

                          <div
                            style={{
                              color:"#6b7280"
                            }}
                          >

                            ⏰ {
                              booking.time
                            }

                          </div>

                        </div>

                      )
                    )

                  }

                </div>

              }

            </div>

          </>

        }

        <BottomNav />

      </main>

    </AuthGuard>

  );

}

function StatCard({
  title,
  value,
  icon
}:any){

  return(

    <div
      style={{
        background:"white",

        borderRadius:"24px",

        padding:"20px",

        boxShadow:
          "0 4px 14px rgba(0,0,0,0.06)"
      }}
    >

      <div
        style={{
          fontSize:"34px",
          marginBottom:"14px"
        }}
      >

        {icon}

      </div>

      <div
        style={{
          color:"#6b7280",
          marginBottom:"10px"
        }}
      >

        {title}

      </div>

      <div
        style={{
          fontSize:"28px",
          fontWeight:"bold",
          color:"#111827"
        }}
      >

        {value}

      </div>

    </div>

  );

}

function QuickLink({
  href,
  label,
  icon
}:any){

  return(

    <Link
      href={href}

      style={{
        background:"white",

        borderRadius:"24px",

        padding:"22px",

        textDecoration:"none",

        color:"#111827",

        boxShadow:
          "0 4px 14px rgba(0,0,0,0.06)",

        display:"flex",

        flexDirection:"column",

        alignItems:"center",

        justifyContent:"center",

        gap:"12px",

        minHeight:"140px"
      }}
    >

      <div
        style={{
          fontSize:"40px"
        }}
      >

        {icon}

      </div>

      <div
        style={{
          fontWeight:"bold",
          fontSize:"18px"
        }}
      >

        {label}

      </div>

    </Link>

  );

}
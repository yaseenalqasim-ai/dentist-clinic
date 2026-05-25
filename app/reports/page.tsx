"use client";

import {
  useMemo
} from "react";

import AuthGuard
from "../components/AuthGuard";

import RoleGuard
from "../components/RoleGuard";

import BottomNav
from "../components/BottomNav";

import useBookings
from "../hooks/useBookings";

export default function ReportsPage(){

  const {
    bookings,
    loading
  } = useBookings();

  const report =
    useMemo(()=>{

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

      const canceled =
        bookings.filter(
          (booking:any)=>

            booking.status ===
            "🔴 ملغي"
        );

      const absent =
        bookings.filter(
          (booking:any)=>

            booking.status ===
            "🟠 لم يحضر"
        );

      const doctorStats:any =
        {};

      bookings.forEach(
        (booking:any)=>{

          if(
            !booking.doctorName
          ){

            return;

          }

          if(
            !doctorStats[
              booking.doctorName
            ]
          ){

            doctorStats[
              booking.doctorName
            ] = 0;

          }

          doctorStats[
            booking.doctorName
          ]++;

        }
      );

      const topDoctors =
        Object.entries(
          doctorStats
        )

        .sort(
          (a:any,b:any)=>

            b[1] - a[1]
        )

        .slice(0,5);

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

        total:
          bookings.length,

        completed:
          completed.length,

        upcoming:
          upcoming.length,

        canceled:
          canceled.length,

        absent:
          absent.length,

        patients:
          Object.keys(
            patientsMap
          ).length,

        topDoctors

      };

    },[
      bookings
    ]);

  return(

    <AuthGuard>

      <RoleGuard
        allow={[
          "admin"
        ]}
      >

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
                "linear-gradient(135deg,#111827,#1f2937)",

              borderRadius:"30px",

              padding:"28px",

              color:"white",

              marginBottom:"20px"
            }}
          >

            <h1
              style={{
                fontSize:"34px",
                marginBottom:"12px"
              }}
            >

              📊 التقارير

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              تقارير تشغيل وإدارة العيادة

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

              جاري تحميل التقارير...

            </div>

            :

            <>

              <div
                style={{
                  display:"grid",

                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",

                  gap:"14px",

                  marginBottom:"22px"
                }}
              >

                <ReportCard
                  title="إجمالي الحجوزات"
                  value={report.total}
                  icon="📅"
                />

                <ReportCard
                  title="تم التنفيذ"
                  value={report.completed}
                  icon="✅"
                />

                <ReportCard
                  title="القادمة"
                  value={report.upcoming}
                  icon="🔵"
                />

                <ReportCard
                  title="الملغية"
                  value={report.canceled}
                  icon="❌"
                />

                <ReportCard
                  title="لم يحضر"
                  value={report.absent}
                  icon="🟠"
                />

                <ReportCard
                  title="المرضى"
                  value={report.patients}
                  icon="🧑‍⚕️"
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

                <h2
                  style={{
                    fontSize:"26px",

                    marginBottom:"20px",

                    fontWeight:"bold"
                  }}
                >

                  👨‍⚕️ أكثر الأطباء حجوزات

                </h2>

                {

                  report.topDoctors
                  .length === 0

                  ?

                  <div
                    style={{
                      color:"#6b7280"
                    }}
                  >

                    لا توجد بيانات

                  </div>

                  :

                  <div
                    style={{
                      display:"grid",
                      gap:"14px"
                    }}
                  >

                    {

                      report.topDoctors.map(
                        (doctor:any,index:number)=>(

                          <div
                            key={index}

                            style={{
                              background:"#f9fafb",

                              borderRadius:"20px",

                              padding:"18px",

                              display:"flex",

                              justifyContent:
                                "space-between",

                              alignItems:"center"
                            }}
                          >

                            <div
                              style={{
                                fontWeight:"bold",
                                fontSize:"18px"
                              }}
                            >

                              👨‍⚕️ {
                                doctor[0]
                              }

                            </div>

                            <div
                              style={{
                                background:"#dbeafe",

                                color:"#1d4ed8",

                                padding:"8px 14px",

                                borderRadius:"12px",

                                fontWeight:"bold"
                              }}
                            >

                              {
                                doctor[1]
                              } حجز

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

      </RoleGuard>

    </AuthGuard>

  );

}

function ReportCard({
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
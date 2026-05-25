"use client";

import AuthGuard
from "../components/AuthGuard";

import BottomNav
from "../components/BottomNav";

export default function AboutPage(){

  const features = [

    "إدارة المرضى",

    "إدارة الحجوزات",

    "تقارير العيادة",

    "إدارة الأطباء",

    "إدارة الموظفين",

    "طباعة PDF",

    "صلاحيات المستخدمين",

    "واجهة احترافية"

  ];

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
              "linear-gradient(135deg,#111827,#1f2937)",

            borderRadius:"30px",

            padding:"30px",

            color:"white",

            marginBottom:"20px"
          }}
        >

          <div
            style={{
              fontSize:"70px",
              marginBottom:"16px"
            }}
          >

            🦷

          </div>

          <h1
            style={{
              fontSize:"38px",
              marginBottom:"14px"
            }}
          >

            Dental Clinic

          </h1>

          <p
            style={{
              opacity:0.9,
              lineHeight:"2"
            }}
          >

            نظام متكامل لإدارة العيادات الطبية
            وحجوزات المرضى والأطباء.

          </p>

        </div>

        <div
          style={{
            background:"white",

            borderRadius:"24px",

            padding:"22px",

            marginBottom:"20px",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.06)"
          }}
        >

          <h2
            style={{
              fontSize:"26px",

              marginBottom:"18px",

              fontWeight:"bold"
            }}
          >

            🚀 مميزات النظام

          </h2>

          <div
            style={{
              display:"grid",
              gap:"12px"
            }}
          >

            {

              features.map(
                (feature,index)=>(

                  <div
                    key={index}

                    style={{
                      background:"#f9fafb",

                      padding:"16px",

                      borderRadius:"16px",

                      fontWeight:"bold"
                    }}
                  >

                    ✅ {feature}

                  </div>

                )
              )

            }

          </div>

        </div>

        <div
          style={{
            background:"white",

            borderRadius:"24px",

            padding:"22px",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.06)"
          }}
        >

          <div
            style={{
              marginBottom:"14px"
            }}
          >

            <strong>
              الإصدار:
            </strong>

            {" "}
            1.0.0

          </div>

          <div
            style={{
              marginBottom:"14px"
            }}
          >

            <strong>
              التقنية:
            </strong>

            {" "}
            Next.js + Firebase

          </div>

          <div>

            <strong>
              الحالة:
            </strong>

            {" "}
            جاهز للعمل

          </div>

        </div>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}
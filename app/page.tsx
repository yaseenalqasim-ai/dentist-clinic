"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";

import {
  db
} from "../lib/firebase";

import {
  useUser
} from "./context/UserContext";

export default function DashboardPage(){

  const {
    currentUser
  } = useUser();

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    stats,
    setStats
  ] = useState({

    patients:0,

    bookings:0,

    todayBookings:0,

    doctors:0

  });

  const [
    latestBookings,
    setLatestBookings
  ] = useState<any[]>([]);

  useEffect(()=>{

    async function loadDashboard(){

      if(
        !currentUser?.clinicId
      ){
        return;
      }

      try{

        const clinicId =
          currentUser.clinicId;

        const patientsQuery =
          query(

            collection(
              db,
              "patients"
            ),

            where(
              "clinicId",
              "==",
              clinicId
            )

          );

        const bookingsQuery =
          query(

            collection(
              db,
              "bookings"
            ),

            where(
              "clinicId",
              "==",
              clinicId
            )

          );

        const doctorsQuery =
          query(

            collection(
              db,
              "users"
            ),

            where(
              "clinicId",
              "==",
              clinicId
            ),

            where(
              "role",
              "==",
              "doctor"
            )

          );

        const latestBookingsQuery =
          query(

            collection(
              db,
              "bookings"
            ),

            where(
              "clinicId",
              "==",
              clinicId
            ),

            orderBy(
              "createdAt",
              "desc"
            ),

            limit(5)

          );

        const [
          patientsSnap,
          bookingsSnap,
          doctorsSnap,
          latestSnap
        ] = await Promise.all([

          getDocs(
            patientsQuery
          ),

          getDocs(
            bookingsQuery
          ),

          getDocs(
            doctorsQuery
          ),

          getDocs(
            latestBookingsQuery
          )

        ]);

        const today =
          new Date()
            .toISOString()
            .split("T")[0];

        const todayCount =
          bookingsSnap.docs.filter(
            (doc)=>{

              const data:any =
                doc.data();

              return (
                data.date === today
              );

            }
          ).length;

        setStats({

          patients:
            patientsSnap.size,

          bookings:
            bookingsSnap.size,

          todayBookings:
            todayCount,

          doctors:
            doctorsSnap.size

        });

        const latestData =
          latestSnap.docs.map(
            (doc)=>({

              id:doc.id,

              ...doc.data()

            })
          );

        setLatestBookings(
          latestData
        );

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    loadDashboard();

  },[
    currentUser
  ]);

  if(loading){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
          bg-[#f3f3f3]
        "
      >

        جاري التحميل...

      </main>

    );

  }

  return(

    <main
      className="
        min-h-screen
        bg-[#f3f3f3]
        p-4
        pb-32
      "
    >

      <div
        className="
          bg-[#2146e8]
          rounded-[35px]
          p-6
          text-white
          shadow-2xl
          mb-6
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-right
            mb-3
          "
        >

          🦷 Dashboard

        </h1>

        <p
          className="
            text-right
            text-xl
            text-blue-100
          "
        >

          مرحبًا {
            currentUser?.name
          }

        </p>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mb-6
        "
      >

        <StatCard
          title="المرضى"
          value={stats.patients}
          icon="👥"
        />

        <StatCard
          title="الحجوزات"
          value={stats.bookings}
          icon="📅"
        />

        <StatCard
          title="حجوزات اليوم"
          value={stats.todayBookings}
          icon="⏰"
        />

        <StatCard
          title="الأطباء"
          value={stats.doctors}
          icon="👨‍⚕️"
        />

      </div>

      <div
        className="
          bg-white
          rounded-[35px]
          p-5
          shadow-2xl
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-right
            mb-5
          "
        >

          آخر الحجوزات

        </h2>

        <div
          className="
            space-y-4
          "
        >

          {

            latestBookings.map(
              (booking:any)=>(

                <div

                  key={booking.id}

                  className="
                    bg-gray-100
                    rounded-2xl
                    p-4
                    text-right
                  "
                >

                  <div
                    className="
                      text-xl
                      font-bold
                      mb-2
                    "
                  >

                    👤 {
                      booking.patientName
                    }

                  </div>

                  <div
                    className="
                      text-gray-700
                    "
                  >

                    📅 {
                      booking.date
                    }

                    {" - "}

                    ⏰ {
                      booking.time
                    }

                  </div>

                </div>

              )
            )

          }

        </div>

      </div>

    </main>

  );

}

function StatCard({
  title,
  value,
  icon
}:any){

  return(

    <div
      className="
        bg-white
        rounded-[30px]
        p-5
        shadow-2xl
        text-center
      "
    >

      <div
        className="
          text-5xl
          mb-3
        "
      >

        {icon}

      </div>

      <div
        className="
          text-3xl
          font-bold
          text-[#2146e8]
          mb-2
        "
      >

        {value}

      </div>

      <div
        className="
          text-gray-600
          text-lg
        "
      >

        {title}

      </div>

    </div>

  );

}
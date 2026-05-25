"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

import {
  useUser
} from "../context/UserContext";

export default function DoctorsPage(){

  const {
    currentUser
  } = useUser();

  const [
    bookings,
    setBookings
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    if(
      !currentUser?.clinicId
    ){
      return;
    }

    const bookingsQuery =
      query(

        collection(
          db,
          "bookings"
        ),

        where(
          "clinicId",
          "==",
          currentUser.clinicId
        )

      );

    const unsubscribe =
      onSnapshot(

        bookingsQuery,

        (snapshot)=>{

          const data =
            snapshot.docs.map(
              (doc)=>({

                id:doc.id,

                ...doc.data()

              })
            );

          setBookings(
            data
          );

          setLoading(false);

        }

      );

    return ()=>unsubscribe();

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
          text-white
          rounded-[35px]
          p-6
          mb-6
          shadow-2xl
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

          👨‍⚕️ الطبيب

        </h1>

        <p
          className="
            text-right
            text-xl
            text-blue-100
          "
        >

          الحجوزات اليومية

        </p>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {

          bookings.map(
            (booking:any)=>(

              <div

                key={booking.id}

                className="
                  bg-white
                  rounded-[35px]
                  p-5
                  shadow-2xl
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-5
                  "
                >

                  <div
                    className="
                      bg-[#2146e8]
                      text-white
                      px-4
                      py-2
                      rounded-full
                      font-bold
                    "
                  >

                    {
                      booking.status
                    }

                  </div>

                  <div
                    className="
                      text-2xl
                      font-bold
                      text-[#2146e8]
                    "
                  >

                    ⏰ {
                      booking.time
                    }

                  </div>

                </div>

                <div
                  className="
                    grid
                    gap-4
                  "
                >

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-lg
                      text-right
                    "
                  >

                    👤 {
                      booking.patientName
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-lg
                      text-right
                    "
                  >

                    📞 {
                      booking.phone
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-lg
                      text-right
                    "
                  >

                    🦷 {
                      booking.bookingType
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-lg
                      text-right
                    "
                  >

                    📅 {
                      booking.date
                    }

                  </div>

                </div>

              </div>

            )
          )

        }

      </div>

    </main>

  );

}
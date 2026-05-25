"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

import {
  useUser
} from "../context/UserContext";

export default function CalendarPage() {

  const {
    currentUser
  } = useUser();

  const [
    bookings,
    setBookings
  ] = useState<any[]>([]);

  const [
    filter,
    setFilter
  ] = useState("الكل");

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

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

          const bookingsData:any[] = [];

          snapshot.forEach((docItem)=>{

            bookingsData.push({

              id:docItem.id,

              ...docItem.data()

            });

          });

          setBookings(
            bookingsData
          );

          setLoading(false);

        }

      );

    return ()=>unsubscribe();

  },[
    currentUser
  ]);

  async function updateStatus(
    bookingId:string,
    status:string
  ){

    try{

      await updateDoc(

        doc(
          db,
          "bookings",
          bookingId
        ),

        {
          status
        }

      );

    }catch(error){

      console.error(error);

    }

  }

  async function deleteBooking(
    bookingId:string
  ){

    const confirmDelete =
      confirm(
        "هل تريد حذف الحجز؟"
      );

    if(!confirmDelete){
      return;
    }

    try{

      await deleteDoc(

        doc(
          db,
          "bookings",
          bookingId
        )

      );

    }catch(error){

      console.error(error);

    }

  }

  const filteredBookings =

    filter === "الكل"

    ?

    bookings

    :

    bookings.filter(
      (booking)=>
        booking.status === filter
    );

  return (

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
            mb-2
            text-right
          "
        >

          📅 الحجوزات

        </h1>

        <p
          className="
            text-right
            text-gray-200
            text-lg
          "
        >

          جميع حجوزات العيادة

        </p>

      </div>

      <div
        className="
          grid
          grid-cols-4
          gap-3
          mb-6
        "
      >

        {

          [
            "الكل",
            "بالانتظار",
            "مكتمل",
            "ملغي",
          ].map(
            (item)=>(

              <button

                key={item}

                onClick={()=>
                  setFilter(item)
                }

                className={`
                  h-14
                  rounded-2xl
                  font-bold

                  ${
                    filter === item

                    ?

                    "bg-[#2146e8] text-white"

                    :

                    "bg-white text-black"
                  }
                `}
              >

                {item}

              </button>

            )
          )

        }

      </div>

      {

        loading

        ?

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            text-2xl
            shadow-xl
          "
        >

          جاري التحميل...

        </div>

        :

        filteredBookings.length === 0

        ?

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            text-2xl
            shadow-xl
          "
        >

          لا توجد حجوزات

        </div>

        :

        <div
          className="
            space-y-5
          "
        >

          {

            filteredBookings.map(
              (
                booking
              )=>(

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
                      className={`
                        px-4
                        py-2
                        rounded-full
                        font-bold

                        ${
                          booking.status ===
                          "مكتمل"

                          ?

                          "bg-green-100 text-green-700"

                          :

                          booking.status ===
                          "ملغي"

                          ?

                          "bg-red-100 text-red-700"

                          :

                          "bg-yellow-100 text-yellow-700"
                        }
                      `}
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
                      mb-5
                    "
                  >

                    <div className="bg-gray-100 rounded-2xl p-4 text-lg text-right">
                      👤 {booking.patientName}
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4 text-lg text-right">
                      📞 {booking.phone}
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4 text-lg text-right">
                      🦷 {booking.service}
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4 text-lg text-right">
                      👨‍⚕️ {booking.doctorName}
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4 text-lg text-right">
                      📅 {booking.date}
                    </div>

                  </div>

                  <div
                    className="
                      grid
                      grid-cols-3
                      gap-3
                      mb-4
                    "
                  >

                    <button

                      onClick={()=>
                        updateStatus(
                          booking.id,
                          "بالانتظار"
                        )
                      }

                      className="
                        h-14
                        bg-yellow-400
                        text-white
                        rounded-2xl
                        font-bold
                      "
                    >

                      انتظار

                    </button>

                    <button

                      onClick={()=>
                        updateStatus(
                          booking.id,
                          "مكتمل"
                        )
                      }

                      className="
                        h-14
                        bg-green-500
                        text-white
                        rounded-2xl
                        font-bold
                      "
                    >

                      مكتمل

                    </button>

                    <button

                      onClick={()=>
                        updateStatus(
                          booking.id,
                          "ملغي"
                        )
                      }

                      className="
                        h-14
                        bg-red-500
                        text-white
                        rounded-2xl
                        font-bold
                      "
                    >

                      ملغي

                    </button>

                  </div>

                  <button

                    onClick={()=>
                      deleteBooking(
                        booking.id
                      )
                    }

                    className="
                      w-full
                      h-16
                      bg-red-500
                      text-white
                      rounded-3xl
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-bold
                      mb-4
                    "
                  >

                    🗑 حذف الحجز

                  </button>

                  <a

                    href={`https://wa.me/964${
                      booking.phone?.replace(
                        /^0/,
                        ""
                      )
                    }?text=${encodeURIComponent(

                      `مرحباً ${booking.patientName}

نذكرك بموعدك في عيادة ${booking.doctorName}

📅 التاريخ:
${booking.date}

⏰ الوقت:
${booking.time}

نرجو الحضور قبل الموعد بـ10 دقائق 🌹`

                    )}`}

                    target="_blank"

                    className="
                      w-full
                      bg-green-500
                      text-white
                      rounded-3xl
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-bold
                      p-5
                    "
                  >

                    💬 إرسال تذكير واتساب

                  </a>

                </div>

              )
            )

          }

        </div>

      }

    </main>
  );
}
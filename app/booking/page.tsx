"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

const bookingTypes = [
  "كشف",
  "حشوة",
  "قلع",
  "تنظيف",
  "تقويم",
  "استشارة",
  "مراجعة",
  "طارئ",
];

const allTimeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
];

export default function BookingPage() {

  const [patientName,setPatientName] =
    useState("");

  const [phone,setPhone] =
    useState("");

  const [bookingType,setBookingType] =
    useState("");

  const [date,setDate] =
    useState("");

  const [time,setTime] =
    useState("");

  const [bookings,setBookings] =
    useState<any[]>([]);

  const clinicId = "clinic_1";

  useEffect(()=>{

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

    const unsubscribe =
      onSnapshot(

        bookingsQuery,

        (snapshot)=>{

          const data =
            snapshot.docs.map(
              (docItem)=>({

                id:docItem.id,

                ...docItem.data()

              })
            );

          setBookings(data);

        }

      );

    return ()=>unsubscribe();

  },[]);

  const unavailableTimes =
    useMemo(()=>{

      return bookings

        .filter(
          (booking:any)=>

            booking.date === date
        )

        .map(
          (booking:any)=>
            booking.time
        );

    },[
      bookings,
      date
    ]);

  const availableTimes =
    allTimeSlots.filter(
      (slot)=>

        !unavailableTimes.includes(
          slot
        )
    );

  async function createBooking(){

    if(

      !patientName ||
      !phone ||
      !bookingType ||
      !date ||
      !time

    ){

      alert(
        "يرجى ملء جميع الحقول"
      );

      return;

    }

    try{

      const patientsQuery =
        query(

          collection(
            db,
            "patients"
          ),

          where(
            "phone",
            "==",
            phone
          )

        );

      const patientsSnapshot =
        await getDocs(
          patientsQuery
        );

      if(
        patientsSnapshot.empty
      ){

        await addDoc(

          collection(
            db,
            "patients"
          ),

          {
            clinicId,

            name:
              patientName,

            phone,

            createdAt:
              new Date()

          }

        );

      }

      await addDoc(

        collection(
          db,
          "bookings"
        ),

        {

          clinicId,

          patientName,

          phone,

          bookingType,

          doctorName:
            "الدكتور محمد",

          date,

          time,

          status:
            "بالانتظار",

          createdAt:
            new Date()

        }

      );

      alert(
        "تم الحجز بنجاح"
      );

      setPatientName("");
      setPhone("");
      setBookingType("");
      setDate("");
      setTime("");

    }catch(error){

      console.error(error);

      alert(
        "حدث خطأ أثناء الحجز"
      );

    }

  }

  return(

    <div
      className="
        min-h-screen
        bg-gray-100
        p-4
      "
      dir="rtl"
    >

      <div
        className="
          max-w-2xl
          mx-auto
        "
      >

        <div
          className="
            bg-blue-700
            text-white
            rounded-3xl
            p-7
            shadow-xl
            mb-6
          "
        >

          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              mb-3
            "
          >

            استمارة حجز موعد

          </h1>

          <p
            className="
              text-blue-100
              text-lg
            "
          >

            للدكتور محمد

          </p>

        </div>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-6
            space-y-5
          "
        >

          <div>

            <div
              className="
                mb-2
                text-lg
                font-bold
              "
            >

              👤 الاسم

            </div>

            <input
              type="text"

              value={patientName}

              onChange={(e)=>
                setPatientName(
                  e.target.value
                )
              }

              placeholder="
                اكتب الاسم الكامل
              "

              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                text-lg
                outline-none
                focus:ring-4
                focus:ring-blue-300
              "
            />

          </div>

          <div>

            <div
              className="
                mb-2
                text-lg
                font-bold
              "
            >

              📞 الرقم

            </div>

            <input
              type="text"

              value={phone}

              onChange={(e)=>
                setPhone(
                  e.target.value
                )
              }

              placeholder="
                07xxxxxxxxx
              "

              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                text-lg
                outline-none
                focus:ring-4
                focus:ring-blue-300
              "
            />

          </div>

          <div>

            <div
              className="
                mb-2
                text-lg
                font-bold
              "
            >

              🦷 نوع الحجز

            </div>

            <select

              value={bookingType}

              onChange={(e)=>
                setBookingType(
                  e.target.value
                )
              }

              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                text-lg
                outline-none
                focus:ring-4
                focus:ring-blue-300
              "
            >

              <option value="">
                اختر نوع الحجز
              </option>

              {

                bookingTypes.map(
                  (type)=>(

                    <option
                      key={type}
                      value={type}
                    >

                      {type}

                    </option>

                  )
                )

              }

            </select>

          </div>

          <div>

            <div
              className="
                mb-2
                text-lg
                font-bold
              "
            >

              📅 الموعد

            </div>

            <input
              type="date"

              value={date}

              onChange={(e)=>
                setDate(
                  e.target.value
                )
              }

              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-4
                text-lg
                outline-none
                focus:ring-4
                focus:ring-blue-300
              "
            />

          </div>

          <div>

            <div
              className="
                mb-3
                text-lg
                font-bold
              "
            >

              ⏰ الساعة

            </div>

            {

              date === ""

              ?

              <div
                className="
                  bg-gray-100
                  rounded-2xl
                  p-5
                  text-center
                  text-gray-500
                "
              >

                اختر التاريخ أولًا

              </div>

              :

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  gap-3
                "
              >

                {

                  availableTimes.length === 0 &&

                  <div
                    className="
                      col-span-full
                      bg-red-100
                      text-red-600
                      rounded-2xl
                      p-5
                      text-center
                      font-bold
                    "
                  >

                    لا توجد ساعات شاغرة

                  </div>

                }

                {

                  availableTimes.map(
                    (slot)=>(

                      <button

                        key={slot}

                        onClick={()=>
                          setTime(slot)
                        }

                        className={`
                          p-4
                          rounded-2xl
                          font-bold
                          text-lg
                          transition

                          ${
                            time === slot

                            ?

                            "bg-blue-700 text-white"

                            :

                            "bg-gray-200 hover:bg-gray-300"
                          }
                        `}
                      >

                        {slot}

                      </button>

                    )
                  )

                }

              </div>

            }

          </div>

          <button

            onClick={createBooking}

            className="
              w-full
              bg-blue-700
              hover:bg-blue-800
              transition
              text-white
              rounded-2xl
              p-5
              text-2xl
              font-bold
            "
          >

            تأكيد الحجز

          </button>

        </div>

      </div>

    </div>
  );

}
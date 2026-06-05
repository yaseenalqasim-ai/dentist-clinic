"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

type Props = {

  open:boolean;

  onClose:()=>void;

  bookings:any[];

};

type Treatment = {

  id:string;

  name:string;

  duration:number;

};

const treatments:Treatment[] = [

  {
    id:"1",
    name:"فحص",
    duration:30,
  },

  {
    id:"2",
    name:"تنظيف",
    duration:45,
  },

  {
    id:"3",
    name:"تبييض الأسنان",
    duration:60,
  },

  {
    id:"4",
    name:"تقويم",
    duration:60,
  },

  {
    id:"5",
    name:"زراعة",
    duration:90,
  },

  {
    id:"6",
    name:"قلع",
    duration:30,
  },

  {
    id:"7",
    name:"حشوة",
    duration:45,
  },

  {
    id:"8",
    name:"علاج عصب",
    duration:60,
  },

];

export default function QuickBookingModal({
  open,
  onClose,
  bookings,
}:Props){

  const [
    patientName,
    setPatientName
  ] = useState("");

  const [
    doctorId,
    setDoctorId
  ] = useState("");

  const [
    doctorName,
    setDoctorName
  ] = useState("");

  const [
    day,
    setDay
  ] = useState("الأحد");

  const [
    time,
    setTime
  ] = useState("09:00");

  const [
    treatment,
    setTreatment
  ] = useState("");

  const [
    duration,
    setDuration
  ] = useState(30);

  const [
    doctors,
    setDoctors
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(false);

  function convertToMinutes(
    time:string
  ){

    const [
      hours,
      minutes
    ] = time.split(":");

    return (
      Number(hours) * 60
      +
      Number(minutes)
    );

  }

  useEffect(()=>{

    async function loadDoctors(){

      const snapshot =
        await getDocs(
          collection(
            db,
            "users"
          )
        );

      const doctorsData:any[] = [];

      snapshot.forEach((docItem)=>{

        const data =
          docItem.data();

        if(
          data.role === "doctor"
        ){

          doctorsData.push({

            id:docItem.id,

            ...data,

          });

        }

      });

      setDoctors(doctorsData);

    }

    if(open){
      loadDoctors();
    }

  },[open]);

  useEffect(()=>{

    const selectedTreatment =
      treatments.find(
        (item)=>
          item.name === treatment
      );

    if(selectedTreatment){

      setDuration(
        selectedTreatment.duration
      );

    }

  },[
    treatment,
  ]);

  async function createBooking(){

    if(
      !patientName
      ||
      !doctorId
      ||
      !treatment
    ){
      return;
    }

    try{

      setLoading(true);

      const bookingConflict =
        bookings.find((booking)=>{

          if(
            booking.doctorId
            !==
            doctorId
          ){
            return false;
          }

          if(
            booking.day
            !==
            day
          ){
            return false;
          }

          const newStart =
            convertToMinutes(time);

          const newEnd =
            newStart + duration;

          const oldStart =
            convertToMinutes(
              booking.time
            );

          const oldEnd =
            oldStart
            +
            booking.duration;

          return(

            newStart < oldEnd

            &&

            newEnd > oldStart

          );

        });

      if(bookingConflict){

        alert(
          "يوجد حجز متعارض مع هذا الموعد"
        );

        setLoading(false);

        return;

      }

      await addDoc(

        collection(
          db,
          "bookings"
        ),

        {

          patientName,

          doctorId,

          doctorName,

          treatment,

          duration,

          day,

          time,

          status:"booked",

          createdAt:
            Date.now(),

        }

      );

      onClose();

      setPatientName("");
      setDoctorId("");
      setDoctorName("");
      setTreatment("");
      setDuration(30);
      setDay("الأحد");
      setTime("09:00");

    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  }

  if(!open){
    return null;
  }

  return(

    <div
      className="
        fixed
        inset-0
        z-[100]

        bg-black/70
        backdrop-blur-md

        flex
        items-center
        justify-center

        p-3
        md:p-6
      "
    >

      <div
        className="
          w-full
          max-w-2xl

          max-h-[95vh]
          overflow-y-auto

          rounded-[38px]

          bg-gradient-to-b
          from-[#0d1730]
          to-[#091427]

          border
          border-white/10

          shadow-[0_20px_80px_rgba(0,0,0,0.45)]

          p-5
          md:p-8
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between

            mb-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-gradient-to-br
                from-[#2948ff]
                to-[#4d6cff]

                flex
                items-center
                justify-center

                text-2xl

                shadow-xl
              "
            >

              🦷

            </div>

            <div>

              <h2
                className="
                  text-white
                  text-[34px]
                  font-black
                  leading-none
                "
              >

                حجز جديد

              </h2>

              <p
                className="
                  text-zinc-400
                  text-sm
                  mt-2
                "
              >

                إنشاء موعد جديد للمريض

              </p>

            </div>

          </div>

          <button

            onClick={onClose}

            className="
              w-12
              h-12

              rounded-2xl

              bg-white/5

              hover:bg-white/10

              transition-all

              text-white
              text-xl
            "
          >

            ✕

          </button>

        </div>

        {/* FORM */}

        <div
          className="
            grid
            gap-5
          "
        >

          {/* PATIENT */}

          <input

            value={patientName}

            onChange={(e)=>
              setPatientName(
                e.target.value
              )
            }

            placeholder="
              اسم المريض
            "

            className="
              h-16

              rounded-[24px]

              bg-[#071028]

              border
              border-white/10

              px-5

              text-white
              placeholder:text-zinc-500

              outline-none

              focus:border-blue-500/50
              focus:ring-4
              focus:ring-blue-500/10

              transition-all
            "
          />

          {/* DOCTOR + TREATMENT */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >

            <select

              value={doctorId}

              onChange={(e)=>{

                const selected =
                  doctors.find(
                    doctor =>
                      doctor.id
                      ===
                      e.target.value
                  );

                setDoctorId(
                  e.target.value
                );

                setDoctorName(
                  selected?.name || ""
                );

              }}

              className="
                h-16

                rounded-[24px]

                bg-[#071028]

                border
                border-white/10

                px-5

                text-white

                outline-none

                focus:border-blue-500/50
                focus:ring-4
                focus:ring-blue-500/10
              "
            >

              <option value="">
                اختر الطبيب
              </option>

              {

                doctors.map(
                  (doctor)=>(

                    <option
                      key={doctor.id}
                      value={doctor.id}
                    >

                      {
                        doctor.name
                      }

                    </option>

                  )
                )

              }

            </select>

            <select

              value={treatment}

              onChange={(e)=>
                setTreatment(
                  e.target.value
                )
              }

              className="
                h-16

                rounded-[24px]

                bg-[#071028]

                border
                border-white/10

                px-5

                text-white

                outline-none

                focus:border-blue-500/50
                focus:ring-4
                focus:ring-blue-500/10
              "
            >

              <option value="">
                اختر العلاج
              </option>

              {

                treatments.map((item)=>{

                  return(

                    <option
                      key={item.id}
                      value={item.name}
                    >

                      {item.name}

                    </option>

                  );

                })

              }

            </select>

          </div>

          {/* DURATION */}

          <div
            className="
              rounded-[28px]

              bg-blue-500/10

              border
              border-blue-500/20

              p-5

              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-zinc-400
                  text-sm
                  mb-2
                "
              >

                مدة الجلسة

              </p>

              <h3
                className="
                  text-white
                  text-[30px]
                  font-black
                  leading-none
                "
              >

                {duration} دقيقة

              </h3>

            </div>

            <div
              className="
                w-16
                h-16

                rounded-3xl

                bg-blue-500/20

                flex
                items-center
                justify-center

                text-3xl
              "
            >

              ⏱

            </div>

          </div>

          {/* DAY + TIME */}

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >

            <select

              value={day}

              onChange={(e)=>
                setDay(
                  e.target.value
                )
              }

              className="
                h-16

                rounded-[24px]

                bg-[#071028]

                border
                border-white/10

                px-5

                text-white

                outline-none

                focus:border-blue-500/50
                focus:ring-4
                focus:ring-blue-500/10
              "
            >

              <option>
                الأحد
              </option>

              <option>
                الاثنين
              </option>

              <option>
                الثلاثاء
              </option>

              <option>
                الأربعاء
              </option>

              <option>
                الخميس
              </option>

            </select>

            <input

              type="time"

              value={time}

              onChange={(e)=>
                setTime(
                  e.target.value
                )
              }

              className="
                h-16

                rounded-[24px]

                bg-[#071028]

                border
                border-white/10

                px-5

                text-white

                outline-none

                focus:border-blue-500/50
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>

        </div>

        {/* CTA */}

        <button

          onClick={createBooking}

          disabled={loading}

          className="
            mt-8

            w-full
            h-16

            rounded-[24px]

            bg-gradient-to-r
            from-[#2948ff]
            to-[#4166ff]

            hover:scale-[1.01]

            transition-all
            duration-300

            shadow-[0_10px_30px_rgba(41,72,255,0.35)]

            text-white
            text-[18px]
            font-black

            disabled:opacity-50
          "
        >

          {

            loading
            ?
            "جاري إنشاء الحجز..."
            :
            "إنشاء الحجز"

          }

        </button>

      </div>

    </div>

  );

}
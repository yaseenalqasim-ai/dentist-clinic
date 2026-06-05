"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";

type Props = {

  open:boolean;

  onClose:()=>void;

  booking:any;

};

const treatments = [

  {
    id:"cleaning",
    name:"تنظيف",
    duration:30,
  },

  {
    id:"whitening",
    name:"تبييض الأسنان",
    duration:120,
  },

  {
    id:"extraction",
    name:"قلع",
    duration:45,
  },

  {
    id:"ortho",
    name:"تقويم",
    duration:60,
  },

];

export default function EditBookingModal({
  open,
  onClose,
  booking,
}:Props){

  const [
    patientName,
    setPatientName
  ] = useState("");

  const [
    doctorName,
    setDoctorName
  ] = useState("");

  const [
    day,
    setDay
  ] = useState("");

  const [
    time,
    setTime
  ] = useState("");

  const [
    treatment,
    setTreatment
  ] = useState<any>(
    treatments[0]
  );

  const [
    loading,
    setLoading
  ] = useState(false);

  useEffect(()=>{

    if(booking){

      setPatientName(
        booking.patientName
      );

      setDoctorName(
        booking.doctorName
      );

      setDay(
        booking.day
      );

      setTime(
        booking.time
      );

      const foundTreatment =
        treatments.find(
          t =>
            t.name
            ===
            booking.treatment
        );

      if(foundTreatment){
        setTreatment(
          foundTreatment
        );
      }

    }

  },[booking]);

  if(
    !open
    ||
    !booking
  ){
    return null;
  }

  async function saveBooking(){

    try{

      setLoading(true);

      await updateDoc(

        doc(
          db,
          "bookings",
          booking.id
        ),

        {

          patientName,

          doctorName,

          day,

          time,

          treatment:
            treatment.name,

          duration:
            treatment.duration,

        }

      );

      onClose();

    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  }

  return(

    <div
      className="
        fixed
        inset-0
        z-[400]
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          rounded-[36px]
          bg-[#111c38]
          border
          border-white/10
          p-8
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-4xl
                font-black
                text-white
                mb-2
              "
            >

              تعديل الحجز

            </h2>

            <p
              className="
                text-zinc-400
              "
            >

              تحديث بيانات الموعد

            </p>

          </div>

          <button

            onClick={onClose}

            className="
              text-zinc-500
              text-3xl
            "
          >

            ✕

          </button>

        </div>

        {/* Form */}

        <div
          className="
            grid
            gap-5
          "
        >

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
              rounded-2xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <select

            value={doctorName}

            onChange={(e)=>
              setDoctorName(
                e.target.value
              )
            }

            className="
              h-16
              rounded-2xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          >

            <option>
              د. أحمد
            </option>

            <option>
              د. محمد
            </option>

          </select>

          <select

            value={day}

            onChange={(e)=>
              setDay(
                e.target.value
              )
            }

            className="
              h-16
              rounded-2xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
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
              rounded-2xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          />

          <select

            value={treatment.id}

            onChange={(e)=>{

              const found =
                treatments.find(
                  t =>
                    t.id
                    ===
                    e.target.value
                );

              if(found){
                setTreatment(found);
              }

            }}

            className="
              h-16
              rounded-2xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          >

            {

              treatments.map(
                (t)=>(

                  <option
                    key={t.id}
                    value={t.id}
                  >

                    {t.name}

                  </option>

                )
              )

            }

          </select>

          {/* Duration */}

          <div
            className="
              rounded-3xl
              bg-blue-500/10
              border
              border-blue-500/20
              p-5
            "
          >

            <p
              className="
                text-blue-300
                mb-2
              "
            >

              مدة الجلسة

            </p>

            <h3
              className="
                text-4xl
                font-black
                text-white
              "
            >

              {
                treatment.duration
              }

              {" "}
              دقيقة

            </h3>

          </div>

          {/* Actions */}

          <div
            className="
              flex
              gap-4
              pt-4
            "
          >

            <button

              onClick={onClose}

              className="
                flex-1
                h-16
                rounded-2xl
                bg-zinc-700
                text-white
                font-black
              "
            >

              إلغاء

            </button>

            <button

              onClick={saveBooking}

              disabled={loading}

              className="
                flex-1
                h-16
                rounded-2xl
                bg-[#2146e8]
                text-white
                font-black
                disabled:opacity-50
              "
            >

              {
                loading
                ?
                "جاري الحفظ..."
                :
                "حفظ التعديلات"
              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
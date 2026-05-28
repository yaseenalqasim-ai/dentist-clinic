"use client";

import {
  useState
} from "react";

type Props = {
  open:boolean;
  onClose:()=>void;

  onCreateBooking:(booking:any)=>void;
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

export default function QuickBookingModal({
  open,
  onClose,
  onCreateBooking,
}:Props){

  const [
    patientName,
    setPatientName
  ] = useState("");

  const [
    selectedTreatment,
    setSelectedTreatment
  ] = useState<any>(
    treatments[0]
  );

  const [
    startTime,
    setStartTime
  ] = useState("09:00");

  const [
    selectedDay,
    setSelectedDay
  ] = useState("الأحد");

  const [
    doctorName,
    setDoctorName
  ] = useState("د. أحمد");

  if(!open){
    return null;
  }

  function createBooking(){

    if(
      !patientName
    ){
      return;
    }

    const booking = {

      id:
        Date.now().toString(),

      patientName,

      time:startTime,

      status:"booked",

      treatment:
        selectedTreatment.name,

      doctorName,

      duration:
        selectedTreatment.duration,

      day:selectedDay,

    };

    onCreateBooking(
      booking
    );

    setPatientName("");

    setStartTime("09:00");

    setSelectedDay("الأحد");

    setDoctorName("د. أحمد");

    setSelectedTreatment(
      treatments[0]
    );

    onClose();

  }

  return(

    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-black/70
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
          rounded-[40px]
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

              حجز جديد

            </h2>

            <p
              className="
                text-zinc-400
              "
            >

              إنشاء موعد بسرعة

            </p>

          </div>

          <button

            onClick={onClose}

            className="
              text-zinc-400
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
            gap-6
          "
        >

          {/* Patient */}

          <div>

            <label
              className="
                block
                text-white
                mb-3
                font-bold
              "
            >

              اسم المريض

            </label>

            <input

              value={patientName}

              onChange={(e)=>
                setPatientName(
                  e.target.value
                )
              }

              placeholder="
                أدخل اسم المريض
              "

              className="
                w-full
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

          </div>

          {/* Doctor */}

          <div>

            <label
              className="
                block
                text-white
                mb-3
                font-bold
              "
            >

              الطبيب

            </label>

            <select

              value={doctorName}

              onChange={(e)=>
                setDoctorName(
                  e.target.value
                )
              }

              className="
                w-full
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

          </div>

          {/* Day */}

          <div>

            <label
              className="
                block
                text-white
                mb-3
                font-bold
              "
            >

              اليوم

            </label>

            <select

              value={selectedDay}

              onChange={(e)=>
                setSelectedDay(
                  e.target.value
                )
              }

              className="
                w-full
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

          </div>

          {/* Treatment */}

          <div>

            <label
              className="
                block
                text-white
                mb-3
                font-bold
              "
            >

              العلاج

            </label>

            <select

              value={
                selectedTreatment.id
              }

              onChange={(e)=>{

                const treatment =
                  treatments.find(
                    t =>
                      t.id
                      ===
                      e.target.value
                  );

                setSelectedTreatment(
                  treatment
                );

              }}

              className="
                w-full
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
                  (treatment)=>(

                    <option
                      key={treatment.id}
                      value={treatment.id}
                    >

                      {
                        treatment.name
                      }

                    </option>

                  )
                )

              }

            </select>

          </div>

          {/* Time */}

          <div>

            <label
              className="
                block
                text-white
                mb-3
                font-bold
              "
            >

              وقت البداية

            </label>

            <input

              type="time"

              value={startTime}

              onChange={(e)=>
                setStartTime(
                  e.target.value
                )
              }

              className="
                w-full
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

          </div>

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
                selectedTreatment.duration
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
                hover:bg-zinc-600
                transition
                text-white
                font-black
              "
            >

              إلغاء

            </button>

            <button

              onClick={createBooking}

              className="
                flex-1
                h-16
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                transition
                text-white
                font-black
              "
            >

              إنشاء الحجز

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
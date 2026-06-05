"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

import {
  useAuth,
} from "@/app/context/AuthContext";

type Props = {

  booking:any;

  open:boolean;

  onClose:()=>void;

};

export default function BookingDetailsModal({
  booking,
  open,
  onClose,
}:Props){

  const {
    role,
  } = useAuth();

  const [
    statusMenu,
    setStatusMenu
  ] = useState(false);

  const [
    editMode,
    setEditMode
  ] = useState(false);

  const [
    patientName,
    setPatientName
  ] = useState("");

  const [
    treatment,
    setTreatment
  ] = useState("");

  const [
    day,
    setDay
  ] = useState("");

  const [
    time,
    setTime
  ] = useState("");

  const menuRef =
    useRef<any>(null);

  useEffect(()=>{

    if(booking){

      setPatientName(
        booking.patientName || ""
      );

      setTreatment(
        booking.treatment || ""
      );

      setDay(
        booking.day || ""
      );

      setTime(
        booking.time || ""
      );

    }

  },[booking]);

  useEffect(()=>{

    function handleClickOutside(
      event:any
    ){

      if(

        menuRef.current

        &&

        !menuRef.current.contains(
          event.target
        )

      ){

        setStatusMenu(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  },[]);

  if(!open){
    return null;
  }

  async function changeStatus(
    status:string
  ){

    try{

      await updateDoc(

        doc(
          db,
          "bookings",
          booking.id
        ),

        {
          status,
        }

      );

      setStatusMenu(false);

    }catch(error){

      console.error(error);

    }

  }

  async function saveChanges(){

    try{

      await updateDoc(

        doc(
          db,
          "bookings",
          booking.id
        ),

        {

          patientName,

          treatment,

          day,

          time,

        }

      );

      setEditMode(false);

    }catch(error){

      console.error(error);

    }

  }

  async function deleteBooking(){

    const confirmed =
      confirm(
        "هل أنت متأكد من حذف الحجز؟"
      );

    if(!confirmed){
      return;
    }

    try{

      await deleteDoc(

        doc(
          db,
          "bookings",
          booking.id
        )

      );

      onClose();

    }catch(error){

      console.error(error);

    }

  }

  const statusStyles:any = {

    booked:
      "bg-blue-500 text-white border-blue-400/40",

    arrived:
      "bg-cyan-500 text-white border-cyan-400/40",

    in_session:
      "bg-purple-500 text-white border-purple-400/40",

    completed:
      "bg-emerald-500 text-white border-emerald-400/40",

    postponed:
      "bg-yellow-500 text-black border-yellow-300/40",

    cancelled:
      "bg-red-500 text-white border-red-400/40",

  };

  const statusLabels:any = {

    booked:"حجز",

    arrived:"وصل المريض",

    in_session:"داخل الجلسة",

    completed:"مكتمل",

    postponed:"مؤجل",

    cancelled:"ملغي",

  };

  return(

    <div
      className="
        fixed
        inset-0
        z-[120]

        bg-black/70
        backdrop-blur-md

        flex
        items-center
        justify-center

        p-4
      "
    >

      <div
        className="
          w-full
          max-w-lg

          rounded-[36px]

          bg-[#091427]

          border
          border-white/10

          p-7

          shadow-[0_20px_80px_rgba(0,0,0,0.45)]

          relative
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            mb-8
          "
        >

          <button

            onClick={onClose}

            className="
              w-11
              h-11

              rounded-2xl

              bg-white/5

              text-white
              text-xl

              hover:bg-white/10

              transition-all
            "
          >

            ✕

          </button>

          <div
            className="
              text-right
            "
          >

            <h2
              className="
                text-white
                text-[30px]
                font-black
              "
            >

              تفاصيل الحجز

            </h2>

            <p
              className="
                text-zinc-500
                text-sm
              "
            >

              إدارة بيانات الموعد

            </p>

          </div>

        </div>

        {/* STATUS */}

        <div
          className="
            mb-7
            flex
            justify-end
            relative
          "
        >

          <button

            onClick={()=>
              setStatusMenu(
                !statusMenu
              )
            }

            className={`

              px-4
              py-2

              rounded-full

              text-sm
              font-black

              border

              transition-all

              hover:scale-[1.03]

              ${
                statusStyles[
                  booking.status
                ] ||

                "bg-blue-500 text-white border-blue-400/40"
              }

            `}
          >

            {

              statusLabels[
                booking.status
              ] ||

              "حجز"

            }

          </button>

          {

            statusMenu && (

              <div

                ref={menuRef}

                className="
                  absolute
                  top-14
                  right-0

                  w-[220px]

                  rounded-[24px]

                  bg-[#101d36]

                  border
                  border-white/10

                  p-2

                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]

                  z-50
                "
              >

                <StatusButton
                  label="وصل المريض"
                  color="text-cyan-400"
                  onClick={()=>
                    changeStatus(
                      "arrived"
                    )
                  }
                />

                <StatusButton
                  label="داخل الجلسة"
                  color="text-purple-400"
                  onClick={()=>
                    changeStatus(
                      "in_session"
                    )
                  }
                />

                <StatusButton
                  label="مكتمل"
                  color="text-emerald-400"
                  onClick={()=>
                    changeStatus(
                      "completed"
                    )
                  }
                />

                <StatusButton
                  label="مؤجل"
                  color="text-yellow-400"
                  onClick={()=>
                    changeStatus(
                      "postponed"
                    )
                  }
                />

                <StatusButton
                  label="ملغي"
                  color="text-red-400"
                  onClick={()=>
                    changeStatus(
                      "cancelled"
                    )
                  }
                />

              </div>

            )

          }

        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-col
            gap-5
          "
        >

          {

            editMode

            ?

            <>

              <EditInput
                label="المريض"
                value={patientName}
                onChange={setPatientName}
              />

              <EditInput
                label="العلاج"
                value={treatment}
                onChange={setTreatment}
              />

              <EditInput
                label="اليوم"
                value={day}
                onChange={setDay}
              />

              <EditInput
                label="الوقت"
                value={time}
                onChange={setTime}
              />

            </>

            :

            <>

              <InfoRow
                label="المريض"
                value={patientName}
              />

              <InfoRow
                label="العلاج"
                value={treatment}
              />

              <InfoRow
                label="الطبيب"
                value={booking.doctorName}
              />

              <InfoRow
                label="اليوم"
                value={day}
              />

              <InfoRow
                label="الوقت"
                value={time}
              />

              <InfoRow
                label="المدة"
                value={`${booking.duration} دقيقة`}
              />

            </>

          }

        </div>

        {/* ACTIONS */}

        {

          role !== "doctor" && (

            <div
              className="
                grid
                grid-cols-2
                gap-4

                mt-8
              "
            >

              <button

                onClick={deleteBooking}

                className="
                  h-14

                  rounded-[22px]

                  bg-red-500/15

                  border
                  border-red-500/20

                  text-red-400
                  font-black

                  hover:bg-red-500/20

                  transition-all
                "
              >

                حذف الحجز

              </button>

              {

                editMode

                ?

                <button

                  onClick={saveChanges}

                  className="
                    h-14

                    rounded-[22px]

                    bg-emerald-500

                    text-white
                    font-black

                    hover:scale-[1.02]

                    transition-all
                  "
                >

                  حفظ التعديلات

                </button>

                :

                <button

                  onClick={()=>
                    setEditMode(true)
                  }

                  className="
                    h-14

                    rounded-[22px]

                    bg-blue-500

                    text-white
                    font-black

                    hover:scale-[1.02]

                    transition-all
                  "
                >

                  تعديل الحجز

                </button>

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

/* STATUS BUTTON */

function StatusButton({
  label,
  color,
  onClick,
}:any){

  return(

    <button

      onClick={onClick}

      className={`

        w-full
        h-12

        rounded-2xl

        px-4

        flex
        items-center
        justify-end

        hover:bg-white/5

        transition-all

        font-bold

        ${color}

      `}
    >

      {label}

    </button>

  );

}

/* INFO ROW */

function InfoRow({
  label,
  value,
}:{
  label:string;
  value:string;
}){

  return(

    <div
      className="
        bg-[#071028]

        border
        border-white/5

        rounded-[24px]

        px-5
        py-4

        flex
        items-center
        justify-between
      "
    >

      <p
        className="
          text-white
          font-bold
        "
      >

        {value}

      </p>

      <p
        className="
          text-zinc-500
          text-sm
        "
      >

        {label}

      </p>

    </div>

  );

}

/* EDIT INPUT */

function EditInput({
  label,
  value,
  onChange,
}:any){

  return(

    <div
      className="
        flex
        flex-col
        gap-2
      "
    >

      <p
        className="
          text-zinc-500
          text-sm
          text-right
        "
      >

        {label}

      </p>

      <input

        value={value}

        onChange={(e)=>
          onChange(
            e.target.value
          )
        }

        className="
          h-14

          rounded-[22px]

          bg-[#071028]

          border
          border-white/10

          px-4

          text-white

          outline-none

          focus:border-blue-500/40
        "
      />

    </div>

  );

}
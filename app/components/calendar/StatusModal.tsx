"use client";

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

  bookingId?:string;
};

const statuses = [

  {
    id:"booked",
    label:"انتظار",
    color:"bg-yellow-500",
  },

  {
    id:"confirmed",
    label:"مؤكد",
    color:"bg-blue-500",
  },

  {
    id:"completed",
    label:"مكتمل",
    color:"bg-emerald-500",
  },

  {
    id:"cancelled",
    label:"ملغي",
    color:"bg-red-500",
  },

];

export default function StatusModal({
  open,
  onClose,
  bookingId,
}:Props){

  if(!open){
    return null;
  }

  async function updateStatus(
    status:string
  ){

    if(!bookingId){
      return;
    }

    try{

      await updateDoc(

        doc(
          db,
          "bookings",
          bookingId
        ),

        {
          status,
        }

      );

      onClose();

    }catch(error){

      console.error(error);

    }

  }

  return(

    <div
      className="
        fixed
        inset-0
        z-[300]
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
          max-w-lg
          rounded-[32px]
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
                text-3xl
                font-black
                text-white
                mb-2
              "
            >

              تغيير حالة الحجز

            </h2>

            <p
              className="
                text-zinc-400
              "
            >

              اختر الحالة الجديدة

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

        {/* Statuses */}

        <div
          className="
            grid
            gap-4
          "
        >

          {

            statuses.map(
              (status)=>(

                <button

                  key={status.id}

                  onClick={()=>
                    updateStatus(
                      status.id
                    )
                  }

                  className="
                    h-16
                    rounded-2xl
                    bg-[#0d1730]
                    border
                    border-white/10
                    hover:border-blue-500
                    transition
                    flex
                    items-center
                    justify-between
                    px-5
                  "
                >

                  <div
                    className="
                      text-white
                      text-xl
                      font-black
                    "
                  >

                    {status.label}

                  </div>

                  <div
                    className={`
                      w-5
                      h-5
                      rounded-full

                      ${status.color}
                    `}
                  />

                </button>

              )
            )

          }

        </div>

      </div>

    </div>

  );

}
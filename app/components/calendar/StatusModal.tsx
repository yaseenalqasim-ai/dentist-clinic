"use client";

type Props = {
  open:boolean;
  onClose:()=>void;
};

const statuses = [

  {
    label:"مؤكد",
    value:"confirmed",
    color:"bg-blue-500",
    icon:"🔵",
  },

  {
    label:"مكتمل",
    value:"completed",
    color:"bg-green-500",
    icon:"✅",
  },

  {
    label:"ملغي",
    value:"cancelled",
    color:"bg-red-500",
    icon:"❌",
  },

  {
    label:"لم يحضر",
    value:"noshow",
    color:"bg-zinc-500",
    icon:"⚠️",
  },

];

export default function StatusModal({
  open,
  onClose,
}:Props){

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
        flex
        items-end
        justify-center
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-[#111c38]
          rounded-t-[40px]
          p-6
          border-t
          border-white/10
          animate-in
          slide-in-from-bottom
          duration-300
        "
      >

        <div
          className="
            w-24
            h-2
            rounded-full
            bg-zinc-600
            mx-auto
            mb-6
          "
        />

        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >

          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >

            تغيير حالة الحجز

          </h2>

          <button
            onClick={onClose}
            className="
              text-zinc-400
              text-2xl
            "
          >

            ✕

          </button>

        </div>

        <div
          className="
            grid
            gap-4
          "
        >

          {

            statuses.map((status)=>(

              <button

                key={status.value}

                className={`
                  h-20
                  rounded-3xl
                  flex
                  items-center
                  justify-between
                  px-6
                  text-white
                  text-xl
                  font-black
                  transition
                  hover:scale-[1.01]

                  ${status.color}
                `}
              >

                <span>

                  {status.label}

                </span>

                <span
                  className="
                    text-3xl
                  "
                >

                  {status.icon}

                </span>

              </button>

            ))

          }

        </div>

      </div>

    </div>

  );

}
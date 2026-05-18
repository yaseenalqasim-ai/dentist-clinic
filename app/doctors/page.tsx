"use client";

const doctors = [

  {
    name: "د. أحمد",
    slug: "dr-ahmed",
    specialty: "طب الأسنان",
  },

  {
    name: "د. محمد",
    slug: "dr-mohammed",
    specialty: "تقويم الأسنان",
  },

];

export default function DoctorsPage() {

  const copyLink = (
    slug:string
  ) => {

    const url =
      `${window.location.origin}/booking/${slug}`;

    navigator.clipboard.writeText(url);

    alert(
      "تم نسخ رابط الحجز"
    );
  };

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

          👨‍⚕️ الأطباء

        </h1>

        <p
          className="
            text-right
            text-gray-200
            text-lg
          "
        >

          إدارة أطباء العيادة

        </p>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {

          doctors.map(
            (
              doctor,
              index
            )=>(

              <div

                key={index}

                className="
                  bg-white
                  rounded-[35px]
                  p-5
                  shadow-2xl
                "
              >

                <div
                  className="
                    text-3xl
                    font-bold
                    text-[#2146e8]
                    text-right
                    mb-3
                  "
                >

                  👨‍⚕️ {
                    doctor.name
                  }

                </div>

                <div
                  className="
                    bg-gray-100
                    rounded-2xl
                    p-4
                    text-lg
                    text-right
                    mb-5
                  "
                >

                  🦷 {
                    doctor.specialty
                  }

                </div>

                <div
                  className="
                    bg-gray-100
                    rounded-2xl
                    p-4
                    text-sm
                    text-right
                    mb-5
                    break-all
                  "
                >

                  🔗

                  {
                    `${window.location.origin}/booking/${doctor.slug}`
                  }

                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >

                  <button

                    onClick={()=>
                      copyLink(
                        doctor.slug
                      )
                    }

                    className="
                      h-16
                      bg-[#2146e8]
                      text-white
                      rounded-3xl
                      text-xl
                      font-bold
                    "
                  >

                    📋 نسخ الرابط

                  </button>

                  <a

                    href={`/booking/${doctor.slug}`}

                    className="
                      h-16
                      bg-green-500
                      text-white
                      rounded-3xl
                      flex
                      items-center
                      justify-center
                      text-xl
                      font-bold
                    "
                  >

                    🚀 فتح

                  </a>

                </div>

              </div>

            )
          )

        }

      </div>

    </main>
  );
}
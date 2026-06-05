"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  signOut,
} from "firebase/auth";

import {
  useRouter,
} from "next/navigation";

import {
  db,
  auth,
} from "@/lib/firebase";

type Treatment = {
  id:string;
  name:string;
  duration:number;
};

export default function SettingsPage(){

  const router =
    useRouter();

  const [
    doctors,
    setDoctors
  ] = useState<any[]>([]);

  const [
    selectedDoctor,
    setSelectedDoctor
  ] = useState("");

  const [
    treatments,
    setTreatments
  ] = useState<Treatment[]>([
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

  ]);

  const [
    saving,
    setSaving
  ] = useState(false);

  useEffect(()=>{

    async function loadDoctors(){

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "users"
          )
        );

      const doctorsData:any[] = [];

      querySnapshot.forEach((docItem)=>{

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

      if(
        doctorsData.length > 0
      ){

        setSelectedDoctor(
          doctorsData[0].id
        );

      }

    }

    loadDoctors();

  },[]);

  function updateDuration(
    treatmentId:string,
    duration:number
  ){

    setTreatments((prev)=>

      prev.map((treatment)=>{

        if(
          treatment.id
          ===
          treatmentId
        ){

          return {
            ...treatment,
            duration,
          };

        }

        return treatment;

      })

    );

  }

  async function saveSettings(){

    if(!selectedDoctor){
      return;
    }

    try{

      setSaving(true);

      await setDoc(

        doc(
          db,
          "doctorSettings",
          selectedDoctor
        ),

        {
          treatments,
        }

      );

    }catch(error){

      console.error(error);

    }finally{

      setSaving(false);

    }

  }

  async function logout(){

    await signOut(auth);

    router.push("/login");

  }

  return(

    <main
      className="
        min-h-screen
        bg-[#071028]
        text-white
        p-6
        pb-32
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        {/* Header */}

        <div
          className="
            mb-10
          "
        >

          <h1
            className="
              text-5xl
              font-black
              mb-3
            "
          >

            إعدادات العلاجات

          </h1>

          <p
            className="
              text-zinc-400
              text-xl
            "
          >

            تحديد مدة كل علاج لكل دكتور

          </p>

        </div>

        {/* Doctor Select */}

        <div
          className="
            mb-8
          "
        >

          <select

            value={selectedDoctor}

            onChange={(e)=>
              setSelectedDoctor(
                e.target.value
              )
            }

            className="
              w-full
              h-16
              rounded-3xl
              bg-[#0d1730]
              border
              border-white/10
              px-5
              text-white
              outline-none
            "
          >

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

        </div>

        {/* Treatments */}

        <div
          className="
            grid
            gap-5
          "
        >

          {

            treatments.map(
              (treatment)=>{

                return(

                  <div

                    key={treatment.id}

                    className="
                      rounded-[32px]
                      bg-[#0d1730]
                      border
                      border-white/10
                      p-6
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div>

                        <h2
                          className="
                            text-2xl
                            font-black
                            mb-2
                          "
                        >

                          {
                            treatment.name
                          }

                        </h2>

                        <p
                          className="
                            text-zinc-500
                          "
                        >

                          مدة الجلسة بالدقائق

                        </p>

                      </div>

                      <input

                        type="number"

                        min={5}

                        value={
                          treatment.duration
                        }

                        onChange={(e)=>
                          updateDuration(

                            treatment.id,

                            Number(
                              e.target.value
                            )

                          )
                        }

                        className="
                          w-32
                          h-14
                          rounded-2xl
                          bg-[#071028]
                          border
                          border-white/10
                          px-4
                          text-center
                          text-2xl
                          font-black
                          outline-none
                        "
                      />

                    </div>

                  </div>

                );

              }
            )

          }

        </div>

        {/* Save */}

        <button

          onClick={saveSettings}

          disabled={saving}

          className="
            mt-10
            w-full
            h-16
            rounded-3xl
            bg-[#2146e8]
            hover:bg-[#3257ff]
            transition
            text-white
            text-xl
            font-black
            disabled:opacity-50
          "
        >

          {

            saving
            ?
            "جاري الحفظ..."
            :
            "حفظ الإعدادات"

          }

        </button>

        {/* Logout */}

        <button

          onClick={logout}

          className="
            mt-5
            w-full
            h-16
            rounded-3xl
            bg-red-500
            hover:bg-red-600
            transition
            text-white
            text-xl
            font-black
          "
        >

          تسجيل الخروج

        </button>

      </div>

    </main>

  );

}
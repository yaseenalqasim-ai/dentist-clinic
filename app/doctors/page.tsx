"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

type Doctor = {

  id:string;

  name:string;

  email:string;

};

export default function DoctorsPage(){

  const [
    doctors,
    setDoctors
  ] = useState<Doctor[]>([]);

  const [
    name,
    setName
  ] = useState("");

  const [
    email,
    setEmail
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    pageLoading,
    setPageLoading
  ] = useState(true);

  async function loadDoctors(){

    try{

      const snapshot =
        await getDocs(
          collection(
            db,
            "users"
          )
        );

      const data:any[] = [];

      snapshot.forEach((docItem)=>{

        const doctor =
          docItem.data();

        if(
          doctor.role
          ===
          "doctor"
        ){

          data.push({

            id:docItem.id,

            ...doctor,

          });

        }

      });

      setDoctors(data);

    }catch(error){

      console.error(error);

    }finally{

      setPageLoading(false);

    }

  }

  useEffect(()=>{

    loadDoctors();

  },[]);

  async function createDoctor(){

    if(
      !name
      ||
      !email
    ){
      return;
    }

    try{

      setLoading(true);

      await addDoc(

        collection(
          db,
          "users"
        ),

        {

          name,

          email,

          role:"doctor",

          createdAt:
            Date.now(),

        }

      );

      setName("");
      setEmail("");

      loadDoctors();

    }catch(error){

      console.error(error);

    }finally{

      setLoading(false);

    }

  }

  async function removeDoctor(
    id:string
  ){

    const confirmDelete =
      confirm(
        "حذف الطبيب؟"
      );

    if(!confirmDelete){
      return;
    }

    try{

      await deleteDoc(

        doc(
          db,
          "users",
          id
        )

      );

      loadDoctors();

    }catch(error){

      console.error(error);

    }

  }

  if(pageLoading){

    return(

      <main
        className="
          min-h-screen
          bg-[#071028]
          flex
          items-center
          justify-center
          text-white
          text-3xl
          font-black
        "
      >

        جاري التحميل...

      </main>

    );

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
          max-w-6xl
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

            إدارة الأطباء

          </h1>

          <p
            className="
              text-zinc-400
              text-xl
            "
          >

            إضافة وإدارة الأطباء

          </p>

        </div>

        {/* Create */}

        <div
          className="
            rounded-[32px]
            bg-[#0d1730]
            border
            border-white/10
            p-6
            mb-8
          "
        >

          <div
            className="
              grid
              grid-cols-2
              gap-5
              mb-5
            "
          >

            <input

              value={name}

              onChange={(e)=>
                setName(
                  e.target.value
                )
              }

              placeholder="
                اسم الطبيب
              "

              className="
                h-16
                rounded-3xl
                bg-[#071028]
                border
                border-white/10
                px-5
                text-white
                outline-none
              "
            />

            <input

              value={email}

              onChange={(e)=>
                setEmail(
                  e.target.value
                )
              }

              placeholder="
                البريد الإلكتروني
              "

              className="
                h-16
                rounded-3xl
                bg-[#071028]
                border
                border-white/10
                px-5
                text-white
                outline-none
              "
            />

          </div>

          <button

            onClick={createDoctor}

            disabled={loading}

            className="
              w-full
              h-16
              rounded-3xl
              bg-[#2146e8]
              hover:bg-[#3257ff]
              transition
              text-xl
              font-black
              disabled:opacity-50
            "
          >

            {

              loading
              ?
              "جاري الإنشاء..."
              :
              "إضافة طبيب"

            }

          </button>

        </div>

        {/* Doctors */}

        <div
          className="
            grid
            gap-5
          "
        >

          {

            doctors.map(
              (doctor)=>{

                return(

                  <div

                    key={doctor.id}

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
                            text-3xl
                            font-black
                            mb-2
                          "
                        >

                          👨‍⚕️ {
                            doctor.name
                          }

                        </h2>

                        <p
                          className="
                            text-zinc-400
                          "
                        >

                          {
                            doctor.email
                          }

                        </p>

                      </div>

                      <button

                        onClick={()=>
                          removeDoctor(
                            doctor.id
                          )
                        }

                        className="
                          h-12
                          px-5
                          rounded-2xl
                          bg-red-500
                          hover:bg-red-600
                          transition
                          font-black
                        "
                      >

                        حذف

                      </button>

                    </div>

                  </div>

                );

              }
            )

          }

        </div>

      </div>

    </main>

  );

}
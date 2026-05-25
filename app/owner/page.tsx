"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

export default function OwnerPage(){

  const [
    clinics,
    setClinics
  ] = useState<any[]>([]);

  async function loadClinics(){

    const snapshot =
      await getDocs(

        collection(
          db,
          "clinics"
        )

      );

    const data =
      snapshot.docs.map(
        (docItem)=>({

          id:docItem.id,

          ...docItem.data()

        })
      );

    setClinics(data);

  }

  useEffect(()=>{

    loadClinics();

  },[]);

  async function activateClinic(
    clinicId:string
  ){

    await updateDoc(

      doc(
        db,
        "clinics",
        clinicId
      ),

      {
        subscriptionStatus:
          "active"
      }

    );

    loadClinics();

  }

  async function blockClinic(
    clinicId:string
  ){

    await updateDoc(

      doc(
        db,
        "clinics",
        clinicId
      ),

      {
        subscriptionStatus:
          "blocked"
      }

    );

    loadClinics();

  }

  return(

    <main
      className="
        min-h-screen
        bg-[#f3f3f3]
        p-4
      "
    >

      <div
        className="
          bg-black
          text-white
          rounded-[35px]
          p-6
          mb-6
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-right
          "
        >

          👑 Owner Panel

        </h1>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {

          clinics.map(
            (clinic:any)=>(

              <div

                key={clinic.id}

                className="
                  bg-white
                  rounded-[35px]
                  p-5
                  shadow-xl
                "
              >

                <div
                  className="
                    text-3xl
                    font-bold
                    mb-5
                    text-right
                  "
                >

                  🏥 {
                    clinic.clinicName
                  }

                </div>

                <div
                  className="
                    space-y-3
                    mb-5
                  "
                >

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-right
                    "
                  >

                    الخطة:
                    {
                      clinic.plan
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-right
                    "
                  >

                    الاشتراك:
                    {
                      clinic.subscriptionStatus
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                      text-right
                    "
                  >

                    الانتهاء:
                    {
                      clinic.subscriptionEnd
                    }

                  </div>

                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                  "
                >

                  <button
                    onClick={()=>activateClinic(
                      clinic.id
                    )}

                    className="
                      bg-green-500
                      text-white
                      rounded-2xl
                      p-4
                      text-xl
                      font-bold
                    "
                  >

                    تفعيل

                  </button>

                  <button
                    onClick={()=>blockClinic(
                      clinic.id
                    )}

                    className="
                      bg-red-500
                      text-white
                      rounded-2xl
                      p-4
                      text-xl
                      font-bold
                    "
                  >

                    حظر

                  </button>

                </div>

              </div>

            )
          )

        }

      </div>

    </main>

  );

}
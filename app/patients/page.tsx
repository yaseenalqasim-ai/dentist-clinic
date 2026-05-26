"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

import {
  useUser
} from "../context/UserContext";

import ProtectedPage
from "../components/ProtectedPage";

export default function PatientsPage() {

  const router =
    useRouter();

  const {
    currentUser
  } = useUser();

  const [
    patients,
    setPatients
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    async function loadPatients() {

      if(
        !currentUser?.clinicId
      ){
        return;
      }

      try{

        const patientsQuery =
          query(

            collection(
              db,
              "patients"
            ),

            where(
              "clinicId",
              "==",
              currentUser.clinicId
            )

          );

        const snapshot =
          await getDocs(
            patientsQuery
          );

        const patientsData =
          snapshot.docs.map(
            (doc)=>({

              id: doc.id,

              ...doc.data()

            })
          );

        setPatients(
          patientsData
        );

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    loadPatients();

  },[
    currentUser
  ]);

  return (

  <ProtectedPage>

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

          👥 المرضى

        </h1>

        <p
          className="
            text-right
            text-gray-200
            text-lg
          "
        >

          جميع مرضى العيادة

        </p>

      </div>

      {

        loading

        ?

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            text-2xl
            shadow-xl
          "
        >

          جاري التحميل...

        </div>

        :

        patients.length === 0

        ?

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            text-2xl
            shadow-xl
          "
        >

          لا يوجد مرضى

        </div>

        :

        <div
          className="
            space-y-5
          "
        >

          {

            patients.map(
              (
                patient,
                index
              )=>(

                <div

                  key={index}

                  onClick={()=>
                    router.push(
                      `/patients/${patient.id}`
                    )
                  }

                  className="
                    bg-white
                    rounded-[35px]
                    p-5
                    shadow-2xl
                    cursor-pointer
                    transition
                    hover:scale-[1.01]
                  "
                >

                  <div
                    className="
                      text-2xl
                      font-bold
                      text-[#2146e8]
                      text-right
                      mb-5
                    "
                  >

                    👤 {
                      patient.name
                    }

                  </div>

                  <div
                    className="
                      grid
                      gap-4
                    "
                  >

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      📞 {
                        patient.phone
                      }

                    </div>

                    <div
                      className="
                        bg-gray-100
                        rounded-2xl
                        p-4
                        text-lg
                        text-right
                      "
                    >

                      🏥 {
                        patient.clinicId
                      }

                    </div>

                  </div>

                </div>

              )
            )

          }

        </div>

      }

    </main>
 </ProtectedPage> );
}
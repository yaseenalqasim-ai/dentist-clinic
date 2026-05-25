"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import {
  db
} from "../../../lib/firebase";

export default function PatientProfilePage(){

  const params =
    useParams();

  const patientId =
    params.id as string;

  const [
    patient,
    setPatient
  ] = useState<any>(null);

  const [
    bookings,
    setBookings
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    async function loadData(){

      try{

        const patientRef =
          doc(
            db,
            "patients",
            patientId
          );

        const patientSnap =
          await getDoc(
            patientRef
          );

        if(
          patientSnap.exists()
        ){

          const patientData:any = {

  id:
    patientSnap.id,

  ...patientSnap.data()

};

          const bookingsQuery =
            query(

              collection(
                db,
                "bookings"
              ),

              where(
                "phone",
                "==",
                patientData.phone
              )

            );

          const bookingsSnap =
            await getDocs(
              bookingsQuery
            );

          const bookingsData =
            bookingsSnap.docs.map(
              (doc)=>({

                id: doc.id,

                ...doc.data()

              })
            );

          setBookings(
            bookingsData
          );

        }

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    loadData();

  },[
    patientId
  ]);

  if(loading){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
        "
      >

        جاري التحميل...

      </main>

    );

  }

  if(!patient){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
        "
      >

        المريض غير موجود

      </main>

    );

  }

  return(

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
          text-right
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-3
          "
        >

          👤 {patient.name}

        </h1>

        <p
          className="
            text-xl
          "
        >

          📞 {patient.phone}

        </p>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {

          bookings.map(
            (booking)=>(

              <div

                key={booking.id}

                className="
                  bg-white
                  rounded-[30px]
                  p-5
                  shadow-xl
                  text-right
                "
              >

                <div
                  className="
                    text-2xl
                    font-bold
                    text-[#2146e8]
                    mb-4
                  "
                >

                  🦷 {
                    booking.bookingType
                  }

                </div>

                <div
                  className="
                    grid
                    gap-3
                  "
                >

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                    "
                  >

                    👨‍⚕️ {
                      booking.doctorName
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                    "
                  >

                    📅 {
                      booking.date
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                    "
                  >

                    ⏰ {
                      booking.time
                    }

                  </div>

                  <div
                    className="
                      bg-gray-100
                      rounded-2xl
                      p-4
                    "
                  >

                    📌 {
                      booking.status
                    }

                  </div>

                </div>

              </div>

            )
          )

        }

      </div>

    </main>

  );

}
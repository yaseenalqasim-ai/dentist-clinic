"use client";

import {
  useEffect,
  useState
}
from "react";

import {
  collection,
  getDocs
}
from "firebase/firestore";

import {
  db
}
from "@/lib/firebase";

export default function SecretaryPage(){

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    patients,
    setPatients
  ] = useState<any[]>([]);

  useEffect(()=>{

    loadPatients();

  },[]);

  async function loadPatients(){

    try{

      const snapshot =

        await getDocs(
          collection(
            db,
            "patients"
          )
        );

      const data =

        snapshot.docs.map(
          doc=>({

            id:doc.id,

            ...doc.data()
          })
        );

      setPatients(data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  }

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:"#f3f6fb",

        padding:"20px"
      }}
    >

      <h1
        style={{
          fontSize:"34px",

          marginBottom:"20px"
        }}
      >

        🧑‍💼 لوحة السكرتير

      </h1>

      {

        loading

        ?

        (

          <div>

            جاري التحميل...

          </div>

        )

        :

        (

          <div
            style={{
              display:"grid",

              gap:"14px"
            }}
          >

            {

              patients.length === 0

              ?

              (

                <div
                  style={{
                    background:"white",

                    padding:"20px",

                    borderRadius:"20px"
                  }}
                >

                  لا يوجد مرضى حاليًا

                </div>

              )

              :

              (

                patients.map(
                  (patient:any)=>(

                    <div
                      key={patient.id}

                      style={{
                        background:"white",

                        padding:"20px",

                        borderRadius:"20px",

                        boxShadow:
                          "0 4px 14px rgba(0,0,0,0.06)"
                      }}
                    >

                      <div
                        style={{
                          fontWeight:"bold",

                          fontSize:"20px",

                          marginBottom:"8px"
                        }}
                      >

                        {patient.name || "مريض"}

                      </div>

                      <div>

                        📞 {patient.phone || "-"}

                      </div>

                    </div>

                  )
                )

              )

            }

          </div>

        )

      }

    </main>

  );

}
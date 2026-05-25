"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

import AuthGuard
from "../components/AuthGuard";
import RoleGuard
from "../components/RoleGuard";

import BottomNav
from "../components/BottomNav";

import useBookings
from "../hooks/useBookings";

export default function DoctorsPage(){

  const {
    bookings
  } = useBookings();

  const [
    doctors,
    setDoctors
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    search,
    setSearch
  ] = useState("");

  useEffect(()=>{

    async function fetchDoctors(){

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

          const user:any =
            docItem.data();

          if(
            user.role ===
            "doctor"
          ){

            data.push(user);

          }

        });

        setDoctors(data);

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    fetchDoctors();

  },[]);

  const filteredDoctors =
    useMemo(()=>{

      return doctors.filter(
        (doctor:any)=>{

          const q =
            search.toLowerCase();

          return(

            doctor.name
            ?.toLowerCase()
            .includes(q)

            ||

            doctor.specialty
            ?.toLowerCase()
            .includes(q)

          );

        }
      );

    },[
      doctors,
      search
    ]);

  function getDoctorBookings(
    doctorId:string
  ){

    return bookings.filter(
      (booking:any)=>

        booking.doctorId ===
        doctorId
    ).length;

  }

  return(

    <AuthGuard>

      <RoleGuard
        allow={[
          "admin"
        ]}
      >

        <main
          dir="rtl"

          style={{
            minHeight:"100vh",
            background:"#f3f6fb",
            padding:"14px",
            paddingBottom:"100px"
          }}
        >

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              borderRadius:"30px",

              padding:"28px",

              color:"white",

              marginBottom:"20px"
            }}
          >

            <h1
              style={{
                fontSize:"34px",
                marginBottom:"12px"
              }}
            >

              👨‍⚕️ الأطباء

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              إدارة أطباء العيادة

            </p>

          </div>

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"16px",
              marginBottom:"20px"
            }}
          >

            <input
              placeholder="
                بحث بالاسم أو التخصص
              "

              value={search}

              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }

              style={{
                width:"100%",
                padding:"16px",
                borderRadius:"16px",
                border:"1px solid #d1d5db",
                fontSize:"16px"
              }}
            />

          </div>

          {

            loading

            ?

            <div
              style={{
                background:"white",
                borderRadius:"24px",
                padding:"40px",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >

              جاري تحميل الأطباء...

            </div>

            :

            <div
              style={{
                display:"grid",
                gap:"16px"
              }}
            >

              {

                filteredDoctors.length === 0

                ?

                <div
                  style={{
                    background:"white",
                    borderRadius:"24px",
                    padding:"30px",
                    textAlign:"center",
                    color:"#6b7280"
                  }}
                >

                  لا يوجد أطباء

                </div>

                :

                filteredDoctors.map(
                  (doctor:any)=>(

                    <div
                      key={doctor.doctorId}

                      style={{
                        background:"white",
                        borderRadius:"24px",
                        padding:"20px",
                        boxShadow:
                          "0 4px 14px rgba(0,0,0,0.06)"
                      }}
                    >

                      <div
                        style={{
                          display:"flex",
                          justifyContent:
                            "space-between",
                          alignItems:"center",
                          marginBottom:"16px"
                        }}
                      >

                        <div
                          style={{
                            fontSize:"24px",
                            fontWeight:"bold"
                          }}
                        >

                          👨‍⚕️ {
                            doctor.name
                          }

                        </div>

                        <div
                          style={{
                            background:"#dbeafe",
                            color:"#1d4ed8",
                            padding:"8px 12px",
                            borderRadius:"12px",
                            fontWeight:"bold",
                            fontSize:"13px"
                          }}
                        >

                          {
                            getDoctorBookings(
                              doctor.doctorId
                            )
                          } حجز

                        </div>

                      </div>

                      <div
                        style={{
                          color:"#6b7280",
                          marginBottom:"10px"
                        }}
                      >

                        🦷 {
                          doctor.specialty ||
                          "طبيب أسنان"
                        }

                      </div>

                      <div
                        style={{
                          color:"#6b7280"
                        }}
                      >

                        📧 {
                          doctor.email
                        }

                      </div>

                    </div>

                  )
                )

              }

            </div>

          }

          <BottomNav />

        </main>

      </RoleGuard>

    </AuthGuard>

  );

}
"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
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

export default function DoctorsPage(){

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    doctors,
    setDoctors
  ] = useState<any[]>([]);

  const [
    form,
    setForm
  ] = useState({

    name:"",
    email:"",
    doctorId:""

  });

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

        const doctor:any =
          docItem.data();

        if(
          doctor.role ===
          "doctor"
        ){

          data.push({

            id:docItem.id,

            ...doctor

          });

        }

      });

      setDoctors(data);

    }catch(error){

      console.error(error);

    }

  }

  useEffect(()=>{

    fetchDoctors();

  },[]);

  async function createDoctor(){

    if(
      !form.name ||
      !form.email ||
      !form.doctorId
    ){

      alert(
        "يرجى ملء جميع الحقول"
      );

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

          ...form,

          role:"doctor",

          createdAt:
            Date.now()

        }

      );

      alert(
        "✅ تم إضافة الطبيب"
      );

      setForm({

        name:"",
        email:"",
        doctorId:""

      });

      fetchDoctors();

    }catch(error){

      console.error(error);

      alert(
        "حدث خطأ"
      );

    }finally{

      setLoading(false);

    }

  }

  async function deleteDoctor(
    doctorDocId:string
  ){

    const confirmed =
      confirm(
        "هل تريد حذف الطبيب؟"
      );

    if(!confirmed)
      return;

    try{

      await deleteDoc(

        doc(
          db,
          "users",
          doctorDocId
        )

      );

      alert(
        "🗑️ تم حذف الطبيب"
      );

      fetchDoctors();

    }catch(error){

      console.error(error);

    }

  }

  return(

    <AuthGuard>

      <RoleGuard
        allow={["admin"]}
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

              👨‍⚕️ إدارة الأطباء

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              إضافة وإدارة أطباء العيادة

            </p>

          </div>

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"20px",
              display:"grid",
              gap:"14px",
              marginBottom:"20px"
            }}
          >

            <input
              placeholder="اسم الطبيب"

              value={form.name}

              onChange={(e)=>

                setForm({

                  ...form,

                  name:
                    e.target.value

                })

              }

              style={inputStyle}
            />

            <input
              placeholder="البريد الإلكتروني"

              value={form.email}

              onChange={(e)=>

                setForm({

                  ...form,

                  email:
                    e.target.value

                })

              }

              style={inputStyle}
            />

            <input
              placeholder="Doctor ID"

              value={form.doctorId}

              onChange={(e)=>

                setForm({

                  ...form,

                  doctorId:
                    e.target.value

                })

              }

              style={inputStyle}
            />

            <button
              onClick={
                createDoctor
              }

              disabled={loading}

              style={{
                background:

                  loading

                  ?

                  "#93c5fd"

                  :

                  "#2563eb",

                color:"white",

                border:"none",

                padding:"18px",

                borderRadius:"16px",

                fontSize:"18px",

                fontWeight:"bold"
              }}
            >

              {

                loading

                ?

                "جاري الإضافة..."

                :

                "إضافة طبيب"

              }

            </button>

          </div>

          <div
            style={{
              display:"grid",
              gap:"14px"
            }}
          >

            {

              doctors.map(
                (doctor:any)=>(

                  <div
                    key={doctor.id}

                    style={{
                      background:"white",
                      borderRadius:"22px",
                      padding:"18px",
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
                        marginBottom:"12px"
                      }}
                    >

                      <h2
                        style={{
                          fontSize:"22px",
                          fontWeight:"bold"
                        }}
                      >

                        {
                          doctor.name
                        }

                      </h2>

                      <button
                        onClick={()=>
                          deleteDoctor(
                            doctor.id
                          )
                        }

                        style={{
                          background:"#ef4444",
                          color:"white",
                          border:"none",
                          padding:"10px 14px",
                          borderRadius:"12px",
                          fontWeight:"bold"
                        }}
                      >

                        حذف

                      </button>

                    </div>

                    <p
                      style={{
                        marginBottom:"10px",
                        color:"#4b5563"
                      }}
                    >

                      📧 {
                        doctor.email
                      }

                    </p>

                    <div
                      style={{
                        background:"#eef2ff",
                        color:"#1d4ed8",
                        padding:"12px",
                        borderRadius:"14px",
                        textAlign:"center",
                        fontWeight:"bold"
                      }}
                    >

                      {
                        doctor.doctorId
                      }

                    </div>

                  </div>

                )
              )

            }

          </div>

          <BottomNav />

        </main>

      </RoleGuard>

    </AuthGuard>

  );

}

const inputStyle:any = {

  width:"100%",

  padding:"16px",

  borderRadius:"14px",

  border:"1px solid #d1d5db",

  fontSize:"16px",

  background:"white"
};
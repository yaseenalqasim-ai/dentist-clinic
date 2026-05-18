"use client";

import {
  useEffect,
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

import EmptyState
from "../components/EmptyState";

export default function StaffPage(){

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    staff,
    setStaff
  ] = useState<any[]>([]);

  useEffect(()=>{

    async function fetchStaff(){

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
            "staff"
          ){

            data.push(user);

          }

        });

        setStaff(data);

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    fetchStaff();

  },[]);

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
                "linear-gradient(135deg,#111827,#1f2937)",

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

              🧑‍💼 الموظفون

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              إدارة موظفي العيادة

            </p>

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

              جاري تحميل الموظفين...

            </div>

            :

            staff.length === 0

            ?

            <EmptyState
              icon="🧑‍💼"
              title="لا يوجد موظفون"
              description="
                لم يتم إضافة أي موظف
                داخل النظام بعد
              "
            />

            :

            <div
              style={{
                display:"grid",
                gap:"16px"
              }}
            >

              {

                staff.map(
                  (employee:any,index:number)=>(

                    <div
                      key={index}

                      style={{
                        background:"white",

                        borderRadius:"24px",

                        padding:"22px",

                        boxShadow:
                          "0 4px 14px rgba(0,0,0,0.06)"
                      }}
                    >

                      <div
                        style={{
                          fontSize:"24px",

                          fontWeight:"bold",

                          marginBottom:"14px"
                        }}
                      >

                        🧑‍💼 {
                          employee.name
                        }

                      </div>

                      <div
                        style={{
                          color:"#6b7280"
                        }}
                      >

                        📧 {
                          employee.email
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
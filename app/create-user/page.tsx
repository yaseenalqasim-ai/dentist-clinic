"use client";

import {
  useState
} from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../../lib/firebase";

import AuthGuard
from "../components/AuthGuard";
import RoleGuard
from "../components/RoleGuard";

import BottomNav
from "../components/BottomNav";

import Toast
from "../components/Toast";

export default function CreateUserPage(){

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    toast,
    setToast
  ] = useState<any>(null);

  const [
    form,
    setForm
  ] = useState({

    name:"",
    email:"",
    password:"",
    role:"staff",
    specialty:""

  });

  function showToast(
    message:string,
    type:any="info"
  ){

    setToast({
      message,
      type
    });

    setTimeout(()=>{

      setToast(null);

    },3000);

  }

  async function createUser(){

    if(

      !form.name ||
      !form.email ||
      !form.password

    ){

      showToast(
        "يرجى تعبئة الحقول",
        "error"
      );

      return;

    }

    try{

      setLoading(true);

      const result =
        await createUserWithEmailAndPassword(

          auth,

          form.email,

          form.password

        );

      const user =
        result.user;

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {

          uid:
            user.uid,

          name:
            form.name,

          email:
            form.email,

          role:
            form.role,

          specialty:
            form.specialty,

          doctorId:
            user.uid,

          createdAt:
            Date.now()

        }

      );

      showToast(
        "✅ تم إنشاء المستخدم",
        "success"
      );

      setForm({

        name:"",
        email:"",
        password:"",
        role:"staff",
        specialty:""

      });

    }catch(error:any){

      console.error(error);

      showToast(
        "فشل إنشاء المستخدم",
        "error"
      );

    }finally{

      setLoading(false);

    }

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

          {

            toast &&

            <Toast
              message={
                toast.message
              }

              type={
                toast.type
              }
            />

          }

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

              ➕ إنشاء مستخدم

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              إضافة طبيب أو موظف جديد

            </p>

          </div>

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"20px",
              display:"grid",
              gap:"14px"
            }}
          >

            <input
              placeholder="الاسم"

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
              type="email"

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
              type="password"

              placeholder="كلمة المرور"

              value={form.password}

              onChange={(e)=>

                setForm({

                  ...form,

                  password:
                    e.target.value

                })

              }

              style={inputStyle}
            />

            <select
              value={form.role}

              onChange={(e)=>

                setForm({

                  ...form,

                  role:
                    e.target.value

                })

              }

              style={inputStyle}
            >

              <option value="staff">
                موظف
              </option>

              <option value="doctor">
                طبيب
              </option>

              <option value="admin">
                مدير
              </option>

            </select>

            {

              form.role ===
              "doctor"

              &&

              <input
                placeholder="التخصص"

                value={form.specialty}

                onChange={(e)=>

                  setForm({

                    ...form,

                    specialty:
                      e.target.value

                  })

                }

                style={inputStyle}
              />

            }

            <button
              onClick={
                createUser
              }

              disabled={loading}

              style={{
                background:

                  loading

                  ?

                  "#9ca3af"

                  :

                  "#111827",

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

                "جاري الإنشاء..."

                :

                "إنشاء المستخدم"

              }

            </button>

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
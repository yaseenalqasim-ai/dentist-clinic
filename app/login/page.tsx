"use client";

import {
  useState
} from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  useRouter
} from "next/navigation";

import {
  auth
} from "../../lib/firebase";

export default function LoginPage(){

  const router =
    useRouter();

  const [
    email,
    setEmail
  ] = useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  async function login(){

    if(
      !email ||
      !password
    ){

      setError(
        "يرجى تعبئة جميع الحقول"
      );

      return;

    }

    try{

      setLoading(true);

      setError("");

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const uid =
        userCredential.user.uid;

      const response =
        await fetch(
          "/api/get-user-role",
          {
            method:"POST",

            headers:{
              "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
              uid
            })
          }
        );

      const data =
        await response.json();

      if(
        data.role === "admin"
      ){

        router.replace(
          "/dashboard"
        );

      }else if(
        data.role === "doctor"
      ){

        router.replace(
          "/doctor"
        );

      }else{

        router.replace(
          "/calendar"
        );

      }

    }catch(error:any){

      console.error(error);

      if(
        error.code ===
        "auth/invalid-credential"
      ){

        setError(
          "البريد أو كلمة المرور غير صحيحة"
        );

      }else{

        setError(
          "حدث خطأ أثناء تسجيل الدخول"
        );

      }

    }finally{

      setLoading(false);

    }

  }

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        padding:"20px"
      }}
    >

      <div
        style={{
          width:"100%",
          maxWidth:"460px",

          background:"rgba(255,255,255,0.96)",

          borderRadius:"36px",

          padding:"38px",

          boxShadow:
            "0 25px 80px rgba(0,0,0,0.25)",

          backdropFilter:"blur(10px)"
        }}
      >

        <div
          style={{
            textAlign:"center",
            marginBottom:"34px"
          }}
        >

          <div
            style={{
              width:"110px",
              height:"110px",

              margin:"0 auto 20px",

              borderRadius:"30px",

              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              display:"flex",

              alignItems:"center",

              justifyContent:"center",

              fontSize:"58px",

              boxShadow:
                "0 12px 30px rgba(37,99,235,0.35)"
            }}
          >

            🦷

          </div>

          <h1
            style={{
              fontSize:"36px",
              fontWeight:"900",
              marginBottom:"12px",
              color:"#0f172a",
              lineHeight:"1.5"
            }}
          >

            نظام المواعيد المطور
            <br />
            لأطباء الأسنان

          </h1>

          <p
            style={{
              color:"#64748b",
              fontSize:"17px",
              lineHeight:"1.8"
            }}
          >

            منصة ذكية لإدارة الحجوزات
            والمرضى والأطباء داخل العيادة

          </p>

        </div>

        {

          error &&

          <div
            style={{
              background:"#fee2e2",
              color:"#991b1b",
              padding:"14px",
              borderRadius:"16px",
              marginBottom:"18px",
              textAlign:"center",
              fontWeight:"bold"
            }}
          >

            {error}

          </div>

        }

        <div
          style={{
            display:"grid",
            gap:"18px"
          }}
        >

          <input
            type="email"

            placeholder="البريد الإلكتروني"

            value={email}

            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <input
            type="password"

            placeholder="كلمة المرور"

            value={password}

            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }

            style={inputStyle}
          />

          <button
            onClick={login}

            disabled={loading}

            style={{
              background:

                loading

                ?

                "#93c5fd"

                :

                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              color:"white",

              border:"none",

              padding:"18px",

              borderRadius:"18px",

              fontSize:"19px",

              fontWeight:"bold",

              cursor:"pointer",

              transition:"0.2s",

              boxShadow:
                "0 10px 25px rgba(37,99,235,0.35)"
            }}
          >

            {

              loading

              ?

              "جاري تسجيل الدخول..."

              :

              "تسجيل الدخول"

            }

          </button>

        </div>

      </div>

    </main>

  );

}

const inputStyle:any = {

  width:"100%",

  padding:"18px",

  borderRadius:"16px",

  border:"1px solid #dbeafe",

  fontSize:"16px",

  outline:"none",

  background:"#f8fafc",

  color:"#111827"
};
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

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.replace(
        "/dashboard"
      );

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
          "linear-gradient(135deg,#2563eb,#1d4ed8)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        padding:"20px"
      }}
    >

      <div
        style={{
          width:"100%",
          maxWidth:"420px",

          background:"white",

          borderRadius:"30px",

          padding:"30px",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.15)"
        }}
      >

        <div
          style={{
            textAlign:"center",
            marginBottom:"30px"
          }}
        >

          <div
            style={{
              fontSize:"70px",
              marginBottom:"14px"
            }}
          >

            🦷

          </div>

          <h1
            style={{
              fontSize:"34px",
              marginBottom:"10px",
              color:"#111827"
            }}
          >

            Dental Clinic

          </h1>

          <p
            style={{
              color:"#6b7280"
            }}
          >

            تسجيل الدخول إلى النظام

          </p>

        </div>

        {

          error &&

          <div
            style={{
              background:"#fee2e2",
              color:"#991b1b",
              padding:"14px",
              borderRadius:"14px",
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
            gap:"16px"
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

                "#2563eb",

              color:"white",

              border:"none",

              padding:"18px",

              borderRadius:"16px",

              fontSize:"18px",

              fontWeight:"bold",

              cursor:"pointer",

              transition:"0.2s"
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

  padding:"16px",

  borderRadius:"14px",

  border:"1px solid #d1d5db",

  fontSize:"16px",

  outline:"none",

  background:"#f9fafb"
};
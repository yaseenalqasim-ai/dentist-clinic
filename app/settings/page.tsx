"use client";

import Link
from "next/link";

import {
  useState
} from "react";

import {
  signOut
} from "firebase/auth";

import {
  useRouter
} from "next/navigation";

import {
  auth
} from "../../lib/firebase";

import {
  useUser
} from "../context/UserContext";

import AuthGuard
from "../components/AuthGuard";

import BottomNav
from "../components/BottomNav";

import Toast
from "../components/Toast";

export default function SettingsPage(){

  const router =
    useRouter();

  const {
    currentUser
  } = useUser();

  const [
    toast,
    setToast
  ] = useState<any>(null);

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

  async function logout(){

    const confirmed =
      confirm(
        "هل تريد تسجيل الخروج؟"
      );

    if(!confirmed)
      return;

    try{

      await signOut(
        auth
      );

      router.replace(
        "/login"
      );

    }catch(error){

      console.error(error);

      showToast(
        "فشل تسجيل الخروج",
        "error"
      );

    }

  }

  return(

    <AuthGuard>

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

            ⚙️ الإعدادات

          </h1>

          <p
            style={{
              opacity:0.9
            }}
          >

            إدارة الحساب والنظام

          </p>

        </div>

        <div
          style={{
            background:"white",
            borderRadius:"24px",
            padding:"20px",
            marginBottom:"20px"
          }}
        >

          <div
            style={{
              fontSize:"24px",
              fontWeight:"bold",
              marginBottom:"12px"
            }}
          >

            👤 {
              currentUser?.name ||
              "-"
            }

          </div>

          <div
            style={{
              color:"#6b7280",
              marginBottom:"10px"
            }}
          >

            📧 {
              currentUser?.email ||
              "-"
            }

          </div>

          <div
            style={{
              color:"#6b7280"
            }}
          >

            🪪 {
              currentUser?.role ||
              "-"
            }

          </div>

        </div>

        <div
          style={{
            display:"grid",
            gap:"14px",
            marginBottom:"20px"
          }}
        >

          <Link
            href="/profile"

            style={linkStyle}
          >

            👤 الملف الشخصي

          </Link>

          <Link
            href="/about"

            style={linkStyle}
          >

            ℹ️ معلومات النظام

          </Link>

        </div>

        <button
          onClick={logout}

          style={{
            width:"100%",

            background:"#ef4444",

            color:"white",

            border:"none",

            padding:"18px",

            borderRadius:"18px",

            fontSize:"18px",

            fontWeight:"bold"
          }}
        >

          🚪 تسجيل الخروج

        </button>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}

const linkStyle:any = {

  background:"white",

  borderRadius:"18px",

  padding:"18px",

  textDecoration:"none",

  color:"#111827",

  fontWeight:"bold",

  boxShadow:
    "0 4px 14px rgba(0,0,0,0.06)"
};
"use client";

import {
  useEffect
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  useUser
} from "../context/UserContext";

export default function RoleGuard({
  children,
  allow
}:{
  children:React.ReactNode;
  allow:string[];
}){

  const router =
    useRouter();

  const {
    currentUser,
    loading
  } = useUser();

  useEffect(()=>{

    if(loading)
      return;

    if(
      !currentUser
    ){

      router.replace(
        "/login"
      );

      return;

    }

    if(

      !allow.includes(
        currentUser.role
      )

    ){

      router.replace(
        "/unauthorized"
      );

    }

  },[
    currentUser,
    loading,
    router,
    allow
  ]);

  if(loading){

    return(

      <main
        style={{
          minHeight:"100vh",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          background:"#f3f6fb",
          flexDirection:"column",
          gap:"18px"
        }}
      >

        <div
          style={{
            width:"70px",
            height:"70px",
            borderRadius:"50%",
            border:
              "6px solid #dbeafe",
            borderTop:
              "6px solid #2563eb",
            animation:
              "spin 1s linear infinite"
          }}
        />

        <h2
          style={{
            fontSize:"22px",
            fontWeight:"bold",
            color:"#111827"
          }}
        >

          جاري التحقق...

        </h2>

        <style jsx>{`

          @keyframes spin {

            0%{
              transform:rotate(0deg);
            }

            100%{
              transform:rotate(360deg);
            }

          }

        `}</style>

      </main>

    );

  }

  if(
    !currentUser ||

    !allow.includes(
      currentUser.role
    )
  ){

    return null;

  }

  return children;

}
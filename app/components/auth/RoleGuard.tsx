"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/app/context/AuthContext";

type Props = {

  children:React.ReactNode;

  allowedRoles:string[];

};

export default function RoleGuard({
  children,
  allowedRoles,
}:Props){

  const router =
    useRouter();

  const {
    role,
    loading,
  } = useAuth();

  useEffect(()=>{

    if(loading){
      return;
    }

    if(
      !allowedRoles.includes(role)
    ){

      router.push(
        "/unauthorized"
      );

    }

  },[
    role,
    loading,
    router,
    allowedRoles,
  ]);

  if(loading){

    return(

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-white
          bg-[#071028]
          text-3xl
          font-black
        "
      >

        جاري التحميل...

      </div>

    );

  }

  if(
    !allowedRoles.includes(role)
  ){
    return null;
  }

  return children;

}
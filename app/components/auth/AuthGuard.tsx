"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "@/lib/firebase";

export default function AuthGuard({
  children
}:{
  children:React.ReactNode;
}){

  const router =
    useRouter();

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    authorized,
    setAuthorized
  ] = useState(false);

  useEffect(()=>{

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user)=>{

          if(user){

            setAuthorized(true);

          }else{

            router.push(
              "/login"
            );

          }

          setLoading(false);

        }
      );

    return ()=>unsubscribe();

  },[
    router
  ]);

  if(loading){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#071028]
          text-white
          text-3xl
          font-black
        "
      >

        جاري التحقق...

      </main>

    );

  }

  if(!authorized){
    return null;
  }

  return children;

}
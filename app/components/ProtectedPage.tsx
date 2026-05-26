"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "../../lib/firebase";

import {
  useUser,
} from "../context/UserContext";

export default function ProtectedPage({
  children,
}:{
  children:React.ReactNode
}){

  const router =
    useRouter();

  const {
    currentUser,
    loading,
  } = useUser();

  const [
    checking,
    setChecking,
  ] = useState(true);

  useEffect(()=>{

    async function checkAccess(){

      try{

        if(loading){
          return;
        }

        if(!currentUser){

          router.push("/login");
          return;

        }

        if(!currentUser?.clinicId){

          setChecking(false);
          return;

        }

        const clinicRef =
          doc(
            db,
            "clinics",
            currentUser.clinicId
          );

        const clinicSnap =
          await getDoc(clinicRef);

        if(!clinicSnap.exists()){

          router.push("/subscription-expired");
          return;

        }

        const clinicData:any =
          clinicSnap.data();

        if(!clinicData?.subscriptionEnd){

          router.push("/subscription-expired");
          return;

        }

        const endDate =
          new Date(
            clinicData.subscriptionEnd
          );

        const today =
          new Date();

        if(endDate < today){

          router.push("/subscription-expired");
          return;

        }

        setChecking(false);

      }catch(error){

        console.error(error);

        router.push("/login");

      }

    }

    checkAccess();

  },[
    currentUser,
    loading,
    router,
  ]);

  if(checking){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
          font-bold
          bg-white
        "
      >

        جاري التحقق...

      </main>

    );

  }

  return children;

}
"use client";

import {
  useEffect,
  useState,
} from "react";

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

export default function SubscriptionGuard({
  children,
}:{
  children:React.ReactNode
}){

  const {
    currentUser,
    loading,
  } = useUser();

  const [
    allowed,
    setAllowed,
  ] = useState(false);

  const [
    checking,
    setChecking,
  ] = useState(true);

  useEffect(()=>{

    async function checkSubscription(){

      try{

        if(loading){
          return;
        }

        if(!currentUser){

          setChecking(false);
          return;

        }

        if(!currentUser?.clinicId){

          setAllowed(true);
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

          setAllowed(true);
          setChecking(false);
          return;

        }

        const clinicData:any =
          clinicSnap.data();

        if(!clinicData?.subscriptionEnd){

          setAllowed(true);
          setChecking(false);
          return;

        }

        const endDate =
          new Date(
            clinicData.subscriptionEnd
          );

        const today =
          new Date();

        if(endDate >= today){

          setAllowed(true);

        }else{

          setAllowed(false);

        }

      }catch(error){

        console.error(error);

        setAllowed(true);

      }finally{

        setChecking(false);

      }

    }

    checkSubscription();

  },[
    currentUser,
    loading,
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

  if(!allowed){

    return(

      <main
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          p-8
          text-center
          bg-red-50
        "
      >

        <div
          className="
            text-7xl
            mb-6
          "
        >

          🚫

        </div>

        <h1
          className="
            text-4xl
            font-bold
            mb-4
            text-red-600
          "
        >

          الاشتراك منتهي

        </h1>

        <p
          className="
            text-xl
            text-gray-700
            leading-10
          "
        >

          يرجى التواصل مع إدارة النظام
          لتجديد الاشتراك

        </p>

      </main>

    );

  }

  return children;

}
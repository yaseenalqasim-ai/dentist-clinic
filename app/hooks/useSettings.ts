"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

export default function useSettings(){

  const [
    settings,
    setSettings
  ] = useState<any>(null);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "settings"
        ),

        (snapshot)=>{

          let data:any = null;

          snapshot.forEach((docItem)=>{

            data = {

              id:docItem.id,

              ...docItem.data()

            };

          });

          setSettings(data);

          setLoading(false);

        },

        (error)=>{

          console.error(
            "Settings Error:",
            error
          );

          setLoading(false);

        }

      );

    return ()=>unsubscribe();

  },[]);

  return {

    settings,

    loading

  };

}
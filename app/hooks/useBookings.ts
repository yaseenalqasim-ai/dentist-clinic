"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import {
  db
} from "@/lib/firebase";

export type Booking = {

  id:string;

  patientName:string;

  doctorName:string;

  treatment:string;

  status:string;

  time:string;

  duration:number;

  day:string;

};

export default function useBookings(){

  const [
    bookings,
    setBookings
  ] = useState<Booking[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    const q = query(

      collection(
        db,
        "bookings"
      ),

      orderBy(
        "time"
      )

    );

    const unsubscribe =
      onSnapshot(

        q,

        (snapshot)=>{

          const data:any = [];

          snapshot.forEach((doc)=>{

            data.push({

              id:doc.id,

              ...doc.data(),

            });

          });

          setBookings(data);

          setLoading(false);

        }

      );

    return ()=>unsubscribe();

  },[]);

  return {

    bookings,
    loading,

  };

}
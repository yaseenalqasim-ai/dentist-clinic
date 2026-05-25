"use client";

import {
  useEffect,
  useState
} from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

export default function useBookings(){

  const [
    bookings,
    setBookings
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    const q =
      query(

        collection(
          db,
          "bookings"
        ),

        orderBy(
          "createdAt",
          "desc"
        )

      );

    const unsubscribe =
      onSnapshot(

        q,

        (snapshot)=>{

          const data:any[] = [];

          snapshot.forEach((docItem)=>{

            data.push({

              id:docItem.id,

              ...docItem.data()

            });

          });

          setBookings(data);

          setLoading(false);

        },

        (error)=>{

          console.error(
            "Bookings Error:",
            error
          );

          setLoading(false);

        }

      );

    return ()=>unsubscribe();

  },[]);

  return {

    bookings,

    loading

  };

}
"use client";

import {
  useEffect,
  useState
} from "react";

import Layout
from "./components/Layout";

import LiveCounter
from "./components/LiveCounter";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import {
  db
} from "../lib/firebase";

export default function HomePage(){

  const [
    totalPatients,
    setTotalPatients
  ] = useState(0);

  const [
    completed,
    setCompleted
  ] = useState(0);

  const [
    cancelled,
    setCancelled
  ] = useState(0);

  useEffect(()=>{

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "bookings"
        ),

        (snapshot)=>{

          const data:any[] = [];

          snapshot.forEach((doc)=>{

            data.push(
              doc.data()
            );

          });

          setTotalPatients(
            data.length
          );

          setCompleted(

            data.filter(
              (item)=>

                item.status ===
                "🟢 تم التنفيذ"

            ).length

          );

          setCancelled(

            data.filter(
              (item)=>

                item.status ===
                "🔴 حجز ملغي"

            ).length

          );

        }

      );

    return ()=>unsubscribe();

  },[]);

  return(

    <Layout
      title="🏠 لوحة التحكم"
    >

      {/* STATS */}

      <div
        style={statsGrid}
      >

        <div style={cardStyle}>

          <h2>
            👥 المرضى
          </h2>

          <h1>

            <LiveCounter
              value={
                totalPatients
              }
            />

          </h1>

        </div>

        <div style={cardStyle}>

          <h2>
            🟢 المكتملة
          </h2>

          <h1>

            <LiveCounter
              value={
                completed
              }
            />

          </h1>

        </div>

        <div style={cardStyle}>

          <h2>
            🔴 الملغية
          </h2>

          <h1>

            <LiveCounter
              value={
                cancelled
              }
            />

          </h1>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        style={actionsGrid}
      >

        <a
          href="/booking"
          style={buttonStyle}
        >

          📅 حجز موعد

        </a>

        <a
          href="/doctor"
          style={buttonStyle}
        >

          👨‍⚕️ لوحة الدكتور

        </a>

        <a
          href="/secretary"
          style={buttonStyle}
        >

          🧾 لوحة السكرتير

        </a>

        <a
          href="/calendar"
          style={buttonStyle}
        >

          📆 التقويم

        </a>

      </div>

    </Layout>

  );

}

const statsGrid:any = {

  display:"grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap:"20px",

  marginBottom:"30px"
};

const actionsGrid:any = {

  display:"grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap:"20px"
};

const cardStyle:any = {

  background:
    "rgba(255,255,255,0.08)",

  padding:"30px",

  borderRadius:"25px",

  backdropFilter:
    "blur(10px)",

  textAlign:"center",

  border:
    "1px solid rgba(255,255,255,0.1)"
};

const buttonStyle:any = {

  background:
    "#2563eb",

  color:"white",

  padding:"24px",

  borderRadius:"22px",

  textDecoration:"none",

  textAlign:"center",

  fontSize:"22px",

  fontWeight:"bold",

  border:
    "1px solid rgba(255,255,255,0.15)"
};
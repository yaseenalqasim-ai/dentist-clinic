"use client";

import {
  useEffect,
  useState
} from "react";

import LiveCounter from "./components/LiveCounter";

import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  onSnapshot
} from "firebase/firestore";

const firebaseConfig = {

  apiKey:
    "AIzaSyCIZdUmSX15w0CACuW4vfz9npsUi-L3lbg",

  authDomain:
    "dentist-clinic-476ac.firebaseapp.com",

  projectId:
    "dentist-clinic-476ac",

  storageBucket:
    "dentist-clinic-476ac.firebasestorage.app",

  messagingSenderId:
    "1013681862841",

  appId:
    "1:1013681862841:web:86643c3f3fa926389a8368",

  measurementId:
    "G-FW5T2FJ29R"
};

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

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

    onSnapshot(
      collection(db,"bookings"),
      (snapshot)=>{

        const data:any[] = [];

        snapshot.forEach((doc)=>{

          data.push(doc.data());

        });

        setTotalPatients(
          data.length
        );

        setCompleted(

          data.filter(
            (p)=>
              p.status ===
              "🟢 تم التنفيذ"
          ).length

        );

        setCancelled(

          data.filter(
            (p)=>
              p.status ===
              "🔴 حجز ملغي"
          ).length

        );

      }
    );

  },[]);

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        color:"white",

        padding:"20px"
      }}
    >

      <div
        style={{
          maxWidth:"1300px",

          margin:"auto"
        }}
      >

        <h1
          style={{
            fontSize:"55px",

            textAlign:"center",

            marginBottom:"15px"
          }}
        >

          🦷 Dentist Clinic

        </h1>

        <p
          style={{
            textAlign:"center",

            fontSize:"24px",

            opacity:0.8,

            marginBottom:"50px"
          }}
        >

          Smart Dental Clinic System

        </p>

        {/* الإحصائيات */}

        <div
          style={{
            display:"grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",

            gap:"20px",

            marginBottom:"40px"
          }}
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

        {/* الأزرار */}

        <div
          style={{
            display:"grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",

            gap:"20px"
          }}
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

            👨‍⚕️ الدكتور

          </a>

          <a
            href="/secretary"

            style={buttonStyle}
          >

            🧾 السكرتير

          </a>

          <a
            href="/calendar"

            style={buttonStyle}
          >

            📆 التقويم

          </a>

          <a
            href="/reports"

            style={buttonStyle}
          >

            📊 التقارير

          </a>

        </div>

      </div>

    </main>

  );

}

const cardStyle:any = {

  background:
    "rgba(255,255,255,0.08)",

  padding:"30px",

  borderRadius:"25px",

  textAlign:"center",

  backdropFilter:
    "blur(10px)"
};

const buttonStyle:any = {

  background:"#2563eb",

  color:"white",

  padding:"30px",

  borderRadius:"25px",

  textDecoration:"none",

  textAlign:"center",

  fontSize:"28px",

  fontWeight:"bold"
};
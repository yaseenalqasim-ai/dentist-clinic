"use client";

import {
  useEffect,
  useState
} from "react";

import Calendar
from "react-calendar";

import "react-calendar/dist/Calendar.css";

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

export default function CalendarPage(){

  const [patients,setPatients] =
    useState<any[]>([]);

  const [date,setDate] =
    useState<any>(
      new Date()
    );

  useEffect(()=>{

    onSnapshot(
      collection(db,"bookings"),
      (snapshot)=>{

        const data:any[] = [];

        snapshot.forEach((docItem)=>{

          data.push({
            id:docItem.id,
            ...docItem.data()
          });

        });

        setPatients(data);

      }
    );

  },[]);

  const selectedDate =
    new Date(date)
      .toISOString()
      .split("T")[0];

  const todayBookings =
    patients.filter((p)=>{

      if(!p.date) return false;

      return p.date.startsWith(
        selectedDate
      );

    });

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(to bottom,#071739,#102542)",

        padding:"20px",

        color:"white"
      }}
    >

      <h1
        style={{
          fontSize:"50px",

          marginBottom:"30px",

          textAlign:"center"
        }}
      >

        📅 تقويم المواعيد

      </h1>

      <div
        style={{
          display:"flex",

          justifyContent:"center",

          marginBottom:"40px"
        }}
      >

        <div
          style={{
            background:"white",

            padding:"20px",

            borderRadius:"25px"
          }}
        >

          <Calendar
            onChange={setDate}
            value={date}
          />

        </div>

      </div>

      <h2
        style={{
          marginBottom:"20px",

          fontSize:"35px"
        }}
      >

        🕘 حجوزات اليوم

      </h2>

      {todayBookings.length === 0 && (

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            padding:"25px",

            borderRadius:"20px"
          }}
        >

          لا توجد حجوزات

        </div>

      )}

      {todayBookings.map((patient)=>(

        <div
          key={patient.id}

          style={{

            background:

              patient.status ===
              "🟢 تم التنفيذ"

                ? "#14532d"

              :

              patient.status ===
              "🔴 حجز ملغي"

                ? "#7f1d1d"

              :

              patient.status ===
              "🟡 حجز مؤجل"

                ? "#713f12"

              :

              "rgba(255,255,255,0.08)",

            padding:"25px",

            borderRadius:"25px",

            marginBottom:"20px"
          }}
        >

          <h2>
            👤 {patient.name}
          </h2>

          <h2>
            📞 {patient.phone}
          </h2>

          <h2>
            🦷 {patient.review}
          </h2>

          <h2>
            🗓️ {patient.date}
          </h2>

          <h2>
            {patient.status}
          </h2>

        </div>

      ))}

    </main>

  );

}
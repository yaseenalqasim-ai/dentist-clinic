"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";

import {
  jsPDF
} from "jspdf";

import html2canvas
from "html2canvas";

import {
  useRef
} from "react";

import {
  db
} from "../../../lib/firebase";

import BottomNav
from "../../components/BottomNav";

import AuthGuard
from "../../components/AuthGuard";

import useBookings
from "../../hooks/useBookings";

export default function PatientProfilePage(){

  const printRef =
    useRef<any>(null);

  const params =
    useParams();

  const patientPhone =
    decodeURIComponent(
      params.id as string
    );

  const {
    bookings,
    loading
  } = useBookings();

  const [
    notes,
    setNotes
  ] = useState<any[]>([]);

  const [
    noteText,
    setNoteText
  ] = useState("");

  const [
    saving,
    setSaving
  ] = useState(false);

  useEffect(()=>{

    const notesQuery =
      query(

        collection(
          db,
          "medical_notes"
        ),

        where(
          "patientPhone",
          "==",
          patientPhone
        ),

        orderBy(
          "createdAt",
          "desc"
        )

      );

    const unsubscribe =
      onSnapshot(

        notesQuery,

        (snapshot)=>{

          const data:any[] = [];

          snapshot.forEach((docItem)=>{

            data.push({

              id:docItem.id,

              ...docItem.data()

            });

          });

          setNotes(data);

        }

      );

    return ()=>unsubscribe();

  },[
    patientPhone
  ]);

  const patientBookings =
    useMemo(()=>{

      return bookings

      .filter(

        (booking:any)=>

          booking.phone ===
          patientPhone

      )

      .sort((a:any,b:any)=>

        (b.date || "")
        .localeCompare(
          a.date || ""
        )

      );

    },[
      bookings,
      patientPhone
    ]);

  const patient =
    patientBookings[0];

  async function generatePDF(){

    if(!printRef.current)
      return;

    const canvas =
      await html2canvas(
        printRef.current
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const width =
      pdf.internal.pageSize.getWidth();

    const height =
      (
        canvas.height *
        width
      ) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save(
      `${patient.patientName}.pdf`
    );

  }

  async function saveNote(){

    if(
      !noteText.trim()
    ){

      return;

    }

    try{

      setSaving(true);

      await addDoc(

        collection(
          db,
          "medical_notes"
        ),

        {

          patientPhone,

          patientName:
            patient?.patientName || "",

          note:
            noteText,

          createdAt:
            Date.now()

        }

      );

      setNoteText("");

    }catch(error){

      console.error(error);

    }finally{

      setSaving(false);

    }

  }

  if(
    loading ||
    !patient
  ){

    return(

      <AuthGuard>

        <main
          style={{
            minHeight:"100vh",
            background:"#f3f6fb",
            padding:"20px"
          }}
        >

          جاري التحميل...

        </main>

      </AuthGuard>

    );

  }

  return(

    <AuthGuard>

      <main
        dir="rtl"

        style={{
          minHeight:"100vh",
          background:"#f3f6fb",
          padding:"14px",
          paddingBottom:"100px"
        }}
      >

        <button
          onClick={
            generatePDF
          }

          style={{
            background:"#111827",
            color:"white",
            border:"none",
            padding:"14px",
            borderRadius:"16px",
            width:"100%",
            marginBottom:"20px",
            fontWeight:"bold"
          }}
        >

          🖨️ طباعة PDF

        </button>

        <div ref={printRef}>

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              borderRadius:"30px",

              padding:"26px",

              color:"white",

              marginBottom:"20px"
            }}
          >

            <h1
              style={{
                fontSize:"32px",
                marginBottom:"10px"
              }}
            >

              👤 {
                patient.patientName
              }

            </h1>

            <p>

              📞 {
                patient.phone
              }

            </p>

          </div>

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"20px",
              marginBottom:"20px"
            }}
          >

            <h2
              style={{
                marginBottom:"16px"
              }}
            >

              📝 الملاحظات الطبية

            </h2>

            {

              notes.length === 0

              ?

              <div
                style={{
                  color:"#6b7280"
                }}
              >

                لا توجد ملاحظات

              </div>

              :

              notes.map(
                (note:any)=>(

                  <div
                    key={note.id}

                    style={{
                      background:"#f9fafb",
                      padding:"14px",
                      borderRadius:"14px",
                      marginBottom:"12px"
                    }}
                  >

                    <div
                      style={{
                        fontSize:"13px",
                        color:"#6b7280",
                        marginBottom:"8px"
                      }}
                    >

                      {

                        new Date(
                          note.createdAt
                        ).toLocaleString()

                      }

                    </div>

                    {
                      note.note
                    }

                  </div>

                )
              )

            }

          </div>

        </div>

        <div
          style={{
            background:"white",
            borderRadius:"24px",
            padding:"20px",
            marginBottom:"20px"
          }}
        >

          <textarea
            placeholder="اكتب ملاحظة طبية"

            value={noteText}

            onChange={(e)=>
              setNoteText(
                e.target.value
              )
            }

            style={{
              width:"100%",
              minHeight:"120px",
              padding:"16px",
              borderRadius:"16px",
              border:"1px solid #d1d5db",
              marginBottom:"14px"
            }}
          />

          <button
            onClick={
              saveNote
            }

            disabled={saving}

            style={{
              background:

                saving

                ?

                "#93c5fd"

                :

                "#2563eb",

              color:"white",

              border:"none",

              padding:"14px",

              borderRadius:"14px",

              width:"100%",

              fontWeight:"bold"
            }}
          >

            {

              saving

              ?

              "جاري الحفظ..."

              :

              "حفظ الملاحظة"

            }

          </button>

        </div>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}
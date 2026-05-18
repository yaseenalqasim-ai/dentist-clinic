"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import Link
from "next/link";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  useParams
} from "next/navigation";

import {
  db
} from "../../../lib/firebase";

import AuthGuard
from "../../components/AuthGuard";

import BottomNav
from "../../components/BottomNav";

import html2canvas
from "html2canvas";

import {
  jsPDF
} from "jspdf";

export default function BookingDetailsPage(){

  const params =
    useParams();

  const bookingId =
    params.id as string;

  const printRef =
    useRef<any>(null);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    booking,
    setBooking
  ] = useState<any>(null);

  useEffect(()=>{

    async function fetchBooking(){

      try{

        const bookingRef =
          doc(
            db,
            "bookings",
            bookingId
          );

        const bookingSnap =
          await getDoc(
            bookingRef
          );

        if(
          bookingSnap.exists()
        ){

          setBooking({

            id:
              bookingSnap.id,

            ...bookingSnap.data()

          });

        }

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    fetchBooking();

  },[
    bookingId
  ]);

  async function printPDF(){

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
      `booking-${booking.id}.pdf`
    );

  }

  if(
    loading
  ){

    return(

      <AuthGuard>

        <main
          style={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:"#f3f6fb"
          }}
        >

          جاري التحميل...

        </main>

      </AuthGuard>

    );

  }

  if(
    !booking
  ){

    return(

      <AuthGuard>

        <main
          style={{
            minHeight:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:"#f3f6fb"
          }}
        >

          الحجز غير موجود

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

        <div
          style={{
            display:"grid",
            gap:"12px",
            marginBottom:"20px"
          }}
        >

          <button
            onClick={printPDF}

            style={{
              background:"#111827",
              color:"white",
              border:"none",
              padding:"16px",
              borderRadius:"16px",
              fontWeight:"bold"
            }}
          >

            🖨️ طباعة PDF

          </button>

          <Link
            href={`/calendar/${booking.id}`}

            style={{
              background:"#2563eb",
              color:"white",
              textDecoration:"none",
              padding:"16px",
              borderRadius:"16px",
              fontWeight:"bold",
              textAlign:"center"
            }}
          >

            ✏️ تعديل الحجز

          </Link>

          <Link
            href={`/patients/${encodeURIComponent(
              booking.phone
            )}`}

            style={{
              background:"#059669",
              color:"white",
              textDecoration:"none",
              padding:"16px",
              borderRadius:"16px",
              fontWeight:"bold",
              textAlign:"center"
            }}
          >

            👤 ملف المريض

          </Link>

        </div>

        <div ref={printRef}>

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              borderRadius:"30px",

              padding:"28px",

              color:"white",

              marginBottom:"20px"
            }}
          >

            <h1
              style={{
                fontSize:"34px",
                marginBottom:"12px"
              }}
            >

              📅 تفاصيل الحجز

            </h1>

            <p
              style={{
                opacity:0.9
              }}
            >

              معلومات الموعد الكاملة

            </p>

          </div>

          <div
            style={{
              background:"white",
              borderRadius:"24px",
              padding:"22px",
              boxShadow:
                "0 4px 14px rgba(0,0,0,0.06)"
            }}
          >

            <InfoRow
              label="اسم المريض"
              value={booking.patientName}
              icon="👤"
            />

            <InfoRow
              label="الهاتف"
              value={booking.phone}
              icon="📞"
            />

            <InfoRow
              label="الطبيب"
              value={booking.doctorName}
              icon="👨‍⚕️"
            />

            <InfoRow
              label="العلاج"
              value={
                booking.treatment ||
                "-"
              }
              icon="🦷"
            />

            <InfoRow
              label="التاريخ"
              value={booking.date}
              icon="📅"
            />

            <InfoRow
              label="الوقت"
              value={booking.time}
              icon="⏰"
            />

            <InfoRow
              label="الحالة"
              value={booking.status}
              icon="📌"
            />

          </div>

        </div>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}

function InfoRow({
  label,
  value,
  icon
}:any){

  return(

    <div
      style={{
        padding:"16px 0",
        borderBottom:
          "1px solid #e5e7eb"
      }}
    >

      <div
        style={{
          color:"#6b7280",
          marginBottom:"8px"
        }}
      >

        {icon} {label}

      </div>

      <div
        style={{
          fontSize:"20px",
          fontWeight:"bold",
          color:"#111827"
        }}
      >

        {value}

      </div>

    </div>

  );

}
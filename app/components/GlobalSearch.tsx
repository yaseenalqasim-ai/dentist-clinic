"use client";

import {
  useMemo,
  useState
} from "react";

import Link
from "next/link";

import useBookings
from "../hooks/useBookings";

export default function GlobalSearch(){

  const {
    bookings
  } = useBookings();

  const [
    search,
    setSearch
  ] = useState("");

  const results =
    useMemo(()=>{

      if(
        !search.trim()
      ){

        return [];

      }

      return bookings

      .filter((booking:any)=>{

        const text =

          `${booking.patientName}
           ${booking.phone}
           ${booking.treatment}
           ${booking.doctorName}`

          .toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      })

      .slice(0,10);

    },[
      bookings,
      search
    ]);

  return(

    <div
      style={{
        position:"relative",
        marginBottom:"20px"
      }}
    >

      <input
        placeholder="بحث سريع..."

        value={search}

        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }

        style={{
          width:"100%",
          padding:"16px",
          borderRadius:"16px",
          border:"1px solid #d1d5db",
          background:"white",
          fontSize:"15px"
        }}
      />

      {

        search &&
        results.length > 0

        &&

        <div
          style={{
            position:"absolute",
            top:"100%",
            right:0,
            left:0,
            background:"white",
            borderRadius:"18px",
            marginTop:"8px",
            overflow:"hidden",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.1)",
            zIndex:9999
          }}
        >

          {

            results.map(
              (booking:any)=>(
                
                <Link
                  key={booking.id}

                  href={`/patients/${encodeURIComponent(
                    booking.phone
                  )}`}

                  style={{
                    display:"block",
                    padding:"16px",
                    borderBottom:
                      "1px solid #f3f4f6",
                    textDecoration:"none",
                    color:"#111827"
                  }}
                >

                  <div
                    style={{
                      fontWeight:"bold",
                      marginBottom:"6px"
                    }}
                  >

                    {
                      booking.patientName
                    }

                  </div>

                  <div
                    style={{
                      fontSize:"14px",
                      color:"#6b7280"
                    }}
                  >

                    📞 {
                      booking.phone
                    }

                  </div>

                  <div
                    style={{
                      fontSize:"14px",
                      color:"#6b7280",
                      marginTop:"4px"
                    }}
                  >

                    👨‍⚕️ {
                      booking.doctorName
                    }

                  </div>

                </Link>

              )
            )

          }

        </div>

      }

    </div>

  );

}
"use client";

export default function Loading(){

  return(

    <main
      style={{
        minHeight:"100vh",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        background:"#f3f6fb"
      }}
    >

      <div
        style={{
          textAlign:"center"
        }}
      >

        <div
          style={{
            width:"70px",

            height:"70px",

            border:
              "6px solid #dbeafe",

            borderTop:
              "6px solid #2563eb",

            borderRadius:"50%",

            margin:"0 auto 20px",

            animation:
              "spin 1s linear infinite"
          }}
        />

        <div
          style={{
            fontSize:"22px",

            fontWeight:"bold",

            color:"#111827"
          }}
        >

          جاري التحميل...

        </div>

      </div>

      <style jsx>{`

        @keyframes spin {

          from {

            transform: rotate(0deg);

          }

          to {

            transform: rotate(360deg);

          }

        }

      `}</style>

    </main>

  );

}
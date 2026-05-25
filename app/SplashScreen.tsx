"use client";

export default function SplashScreen(){

  return(

    <main
      dir="rtl"

      style={{
        position:"fixed",

        inset:0,

        background:
          "linear-gradient(135deg,#2563eb,#1d4ed8)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        flexDirection:"column",

        gap:"24px",

        zIndex:999999
      }}
    >

      <div
        style={{
          fontSize:"90px"
        }}
      >

        🦷

      </div>

      <div
        style={{
          color:"white",

          fontSize:"34px",

          fontWeight:"bold"
        }}
      >

        Dental Clinic

      </div>

      <div
        style={{
          width:"80px",

          height:"80px",

          borderRadius:"50%",

          border:
            "7px solid rgba(255,255,255,0.3)",

          borderTop:
            "7px solid white",

          animation:
            "spin 1s linear infinite"
        }}
      />

      <style jsx>{`

        @keyframes spin {

          0%{
            transform:rotate(0deg);
          }

          100%{
            transform:rotate(360deg);
          }

        }

      `}</style>

    </main>

  );

}
"use client";

export default function ErrorPage({
  error,
  reset
}:{
  error:Error;
  reset:()=>void;
}){

  console.error(error);

  return(

    <main
      dir="rtl"

      style={{
        minHeight:"100vh",

        background:
          "linear-gradient(135deg,#dc2626,#b91c1c)",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        padding:"20px"
      }}
    >

      <div
        style={{
          width:"100%",
          maxWidth:"520px",

          background:"white",

          borderRadius:"30px",

          padding:"40px",

          textAlign:"center",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.2)"
        }}
      >

        <div
          style={{
            fontSize:"90px",
            marginBottom:"20px"
          }}
        >

          ⚠️

        </div>

        <h1
          style={{
            fontSize:"40px",
            marginBottom:"16px",
            color:"#111827"
          }}
        >

          حدث خطأ

        </h1>

        <p
          style={{
            color:"#6b7280",
            lineHeight:"2",
            marginBottom:"30px"
          }}
        >

          حدث خطأ غير متوقع داخل النظام

        </p>

        <button
          onClick={reset}

          style={{
            background:"#dc2626",

            color:"white",

            border:"none",

            padding:"16px 24px",

            borderRadius:"16px",

            fontWeight:"bold",

            fontSize:"16px",

            cursor:"pointer"
          }}
        >

          إعادة المحاولة

        </button>

      </div>

    </main>

  );

}
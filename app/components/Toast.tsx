"use client";

export default function Toast({
  message,
  type="info"
}:{
  message:string;
  type?:"success"|"error"|"info";
}){

  function getBackground(){

    if(type === "success"){

      return "#16a34a";

    }

    if(type === "error"){

      return "#dc2626";

    }

    return "#2563eb";

  }

  function getIcon(){

    if(type === "success"){

      return "✅";

    }

    if(type === "error"){

      return "❌";

    }

    return "ℹ️";

  }

  return(

    <div
      style={{
        position:"fixed",

        top:"20px",

        left:"50%",

        transform:"translateX(-50%)",

        background:getBackground(),

        color:"white",

        padding:"16px 22px",

        borderRadius:"18px",

        display:"flex",

        alignItems:"center",

        gap:"10px",

        zIndex:999999,

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.18)",

        fontWeight:"bold",

        animation:
          "toastIn 0.25s ease"
      }}
    >

      <span
        style={{
          fontSize:"22px"
        }}
      >

        {
          getIcon()
        }

      </span>

      <span>
        {
          message
        }
      </span>

      <style jsx>{`

        @keyframes toastIn {

          from{

            opacity:0;

            transform:
              translateX(-50%)
              translateY(-20px);

          }

          to{

            opacity:1;

            transform:
              translateX(-50%)
              translateY(0);

          }

        }

      `}</style>

    </div>

  );

}
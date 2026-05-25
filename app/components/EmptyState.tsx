"use client";

export default function EmptyState({
  icon="📭",
  title="لا توجد بيانات",
  description="لم يتم العثور على أي عناصر"
}:{
  icon?:string;
  title?:string;
  description?:string;
}){

  return(

    <div
      style={{
        background:"white",

        borderRadius:"28px",

        padding:"40px 24px",

        textAlign:"center",

        boxShadow:
          "0 4px 14px rgba(0,0,0,0.06)"
      }}
    >

      <div
        style={{
          fontSize:"70px",
          marginBottom:"20px"
        }}
      >

        {icon}

      </div>

      <h2
        style={{
          fontSize:"28px",
          marginBottom:"14px",
          color:"#111827"
        }}
      >

        {title}

      </h2>

      <p
        style={{
          color:"#6b7280",
          lineHeight:"1.8",
          fontSize:"16px"
        }}
      >

        {description}

      </p>

    </div>

  );

}
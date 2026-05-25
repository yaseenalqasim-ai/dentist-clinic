"use client";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "../../lib/firebase";

import {
  useUser
} from "../context/UserContext";

export default function SettingsPage(){

  const {
    currentUser
  } = useUser();

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    saving,
    setSaving
  ] = useState(false);

  const [
    clinicName,
    setClinicName
  ] = useState("");

  const [
    whatsapp,
    setWhatsapp
  ] = useState("");

  const [
    address,
    setAddress
  ] = useState("");

  const [
    workStart,
    setWorkStart
  ] = useState("");

  const [
    workEnd,
    setWorkEnd
  ] = useState("");

  useEffect(()=>{

    async function loadClinic(){

      if(
        !currentUser?.clinicId
      ){
        return;
      }

      try{

        const clinicRef =
          doc(
            db,
            "clinics",
            currentUser.clinicId
          );

        const clinicSnap =
          await getDoc(
            clinicRef
          );

        if(
          clinicSnap.exists()
        ){

          const data:any =
            clinicSnap.data();

          setClinicName(
            data.name || ""
          );

          setWhatsapp(
            data.whatsapp || ""
          );

          setAddress(
            data.address || ""
          );

          setWorkStart(
            data.workStart || ""
          );

          setWorkEnd(
            data.workEnd || ""
          );

        }

      }catch(error){

        console.error(error);

      }finally{

        setLoading(false);

      }

    }

    loadClinic();

  },[
    currentUser
  ]);

  async function saveSettings(){

    if(
      !currentUser?.clinicId
    ){
      return;
    }

    try{

      setSaving(true);

      await updateDoc(

        doc(
          db,
          "clinics",
          currentUser.clinicId
        ),

        {

          name:
            clinicName,

          whatsapp,

          address,

          workStart,

          workEnd

        }

      );

      alert(
        "تم حفظ الإعدادات"
      );

    }catch(error){

      console.error(error);

      alert(
        "حدث خطأ"
      );

    }finally{

      setSaving(false);

    }

  }

  if(loading){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
          bg-[#f3f3f3]
        "
      >

        جاري التحميل...

      </main>

    );

  }

  return(

    <main
      className="
        min-h-screen
        bg-[#f3f3f3]
        p-4
        pb-32
      "
    >

      <div
        className="
          bg-[#2146e8]
          text-white
          rounded-[35px]
          p-6
          mb-6
          shadow-2xl
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-right
            mb-3
          "
        >

          ⚙️ الإعدادات

        </h1>

        <p
          className="
            text-right
            text-xl
            text-blue-100
          "
        >

          إعدادات العيادة

        </p>

      </div>

      <div
        className="
          bg-white
          rounded-[35px]
          p-5
          shadow-2xl
          space-y-5
        "
      >

        <InputCard
          label="اسم العيادة"
          value={clinicName}
          setValue={setClinicName}
          placeholder="اسم العيادة"
        />

        <InputCard
          label="رقم الواتساب"
          value={whatsapp}
          setValue={setWhatsapp}
          placeholder="07xxxxxxxxx"
        />

        <InputCard
          label="العنوان"
          value={address}
          setValue={setAddress}
          placeholder="عنوان العيادة"
        />

        <InputCard
          label="بداية الدوام"
          value={workStart}
          setValue={setWorkStart}
          placeholder="09:00"
        />

        <InputCard
          label="نهاية الدوام"
          value={workEnd}
          setValue={setWorkEnd}
          placeholder="06:00"
        />

        <button

          onClick={saveSettings}

          className="
            w-full
            h-16
            bg-[#2146e8]
            text-white
            rounded-3xl
            text-2xl
            font-bold
          "
        >

          {

            saving

            ?

            "جاري الحفظ..."

            :

            "💾 حفظ الإعدادات"

          }

        </button>

      </div>

    </main>

  );

}

function InputCard({
  label,
  value,
  setValue,
  placeholder
}:any){

  return(

    <div>

      <div
        className="
          text-right
          text-lg
          font-bold
          mb-3
        "
      >

        {label}

      </div>

      <input

        value={value}

        onChange={(e)=>
          setValue(
            e.target.value
          )
        }

        placeholder={placeholder}

        className="
          w-full
          h-16
          rounded-2xl
          border
          border-gray-300
          px-4
          text-right
          text-lg
          outline-none
        "
      />

    </div>

  );

}
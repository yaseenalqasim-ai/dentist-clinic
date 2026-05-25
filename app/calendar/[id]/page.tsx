"use client";

import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from "firebase/firestore";

import {
  useParams,
  useRouter
} from "next/navigation";

import {
  db
} from "../../../lib/firebase";

import AuthGuard
from "../../components/AuthGuard";

import BottomNav
from "../../components/BottomNav";

import Toast
from "../../components/Toast";

export default function EditBookingPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const bookingId =
    params.id as string;

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    saving,
    setSaving
  ] = useState(false);

  const [
    doctors,
    setDoctors
  ] = useState<any[]>([]);

  const [
    toast,
    setToast
  ] = useState<any>(null);

  const [
    form,
    setForm
  ] = useState<any>(null);

  useEffect(() => {

    async function fetchData() {

      try {

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

        if (
          bookingSnap.exists()
        ) {

          setForm({

            id:
              bookingSnap.id,

            ...bookingSnap.data()

          });

        }

        const doctorsSnap =
          await getDocs(

            collection(
              db,
              "users"
            )

          );

        const doctorsData: any[] =
          [];

        doctorsSnap.forEach(
          (docItem) => {

            const user: any =
              docItem.data();

            if (
              user.role ===
              "doctor"
            ) {

              doctorsData.push(
                user
              );

            }

          }
        );

        setDoctors(
          doctorsData
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    fetchData();

  }, [
    bookingId
  ]);

  function showToast(
    message: string,
    type: any = "info"
  ) {

    setToast({
      message,
      type
    });

    setTimeout(() => {

      setToast(null);

    }, 3000);

  }

  async function saveBooking() {

    if (
      !form
    ) {

      return;

    }

    if (
      form.date < today
    ) {

      showToast(
        "لا يمكن اختيار تاريخ سابق",
        "error"
      );

      return;

    }

    try {

      setSaving(true);

      await updateDoc(

        doc(
          db,
          "bookings",
          bookingId
        ),

        {

          patientName:
            form.patientName,

          phone:
            form.phone,

          treatment:
            form.treatment,

          doctorId:
            form.doctorId,

          doctorName:
            form.doctorName,

          date:
            form.date,

          time:
            form.time

        }

      );

      showToast(
        "✅ تم تحديث الحجز",
        "success"
      );

      setTimeout(() => {

        router.push(
          "/calendar"
        );

      }, 1200);

    } catch (error) {

      console.error(error);

      showToast(
        "حدث خطأ",
        "error"
      );

    } finally {

      setSaving(false);

    }

  }

  if (
    loading ||
    !form
  ) {

    return (

      <AuthGuard>

        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f3f6fb"
          }}
        >

          جاري التحميل...

        </main>

      </AuthGuard>

    );

  }

  return (

    <AuthGuard>

      <main
        dir="rtl"

        style={{
          minHeight: "100vh",
          background: "#f3f6fb",
          padding: "14px",
          paddingBottom: "100px"
        }}
      >

        {

          toast &&

          <Toast
            message={
              toast.message
            }

            type={
              toast.type
            }
          />

        }

        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",

            borderRadius: "30px",

            padding: "28px",

            color: "white",

            marginBottom: "20px"
          }}
        >

          <h1
            style={{
              fontSize: "34px",
              marginBottom: "12px"
            }}
          >

            ✏️ تعديل الحجز

          </h1>

          <p
            style={{
              opacity: 0.9
            }}
          >

            تحديث بيانات الموعد

          </p>

        </div>

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "20px",
            display: "grid",
            gap: "14px"
          }}
        >

          <input
            placeholder="اسم المريض"

            value={form.patientName}

            onChange={(e) =>

              setForm({

                ...form,

                patientName:
                  e.target.value

              })

            }

            style={inputStyle}
          />

          <input
            placeholder="رقم الهاتف"

            value={form.phone}

            onChange={(e) =>

              setForm({

                ...form,

                phone:
                  e.target.value

              })

            }

            style={inputStyle}
          />

          <input
            placeholder="العلاج"

            value={form.treatment}

            onChange={(e) =>

              setForm({

                ...form,

                treatment:
                  e.target.value

              })

            }

            style={inputStyle}
          />

          <select
            value={form.doctorId}

            onChange={(e) => {

              const doctor =
                doctors.find(
                  (d: any) =>

                    d.doctorId ===
                    e.target.value
                );

              setForm({

                ...form,

                doctorId:
                  e.target.value,

                doctorName:
                  doctor?.name || ""

              });

            }}

            style={inputStyle}
          >

            {

              doctors.map(
                (doctor: any) => (

                  <option
                    key={doctor.doctorId}

                    value={
                      doctor.doctorId
                    }
                  >

                    {
                      doctor.name
                    }

                  </option>

                )
              )

            }

          </select>

          <input
            type="date"

            min={today}

            value={form.date}

            onChange={(e) =>

              setForm({

                ...form,

                date:
                  e.target.value

              })

            }

            style={inputStyle}
          />

          <input
            type="time"

            value={form.time}

            onChange={(e) =>

              setForm({

                ...form,

                time:
                  e.target.value

              })

            }

            style={inputStyle}
          />

          <button
            onClick={
              saveBooking
            }

            disabled={saving}

            style={{
              background:

                saving

                  ?

                  "#93c5fd"

                  :

                  "#2563eb",

              color: "white",

              border: "none",

              padding: "18px",

              borderRadius: "16px",

              fontSize: "18px",

              fontWeight: "bold"
            }}
          >

            {

              saving

                ?

                "جاري الحفظ..."

                :

                "حفظ التعديلات"

            }

          </button>

        </div>

        <BottomNav />

      </main>

    </AuthGuard>

  );

}

const inputStyle: any = {

  width: "100%",

  padding: "16px",

  borderRadius: "14px",

  border: "1px solid #d1d5db",

  fontSize: "16px",

  background: "white"
};
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/app/context/AuthContext";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

export default function HomePage() {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  const [
    checkingSubscription,
    setCheckingSubscription,
  ] = useState(true);

  useEffect(() => {

    async function checkAccess() {

      if (loading) {
        return;
      }

      if (!user) {

        router.push("/login");

        return;
      }

      try {

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const userSnap =
          await getDoc(userRef);

        if (!userSnap.exists()) {

          setCheckingSubscription(false);

          return;
        }

        const userData:any =
          userSnap.data();

        if (!userData?.clinicId) {

          setCheckingSubscription(false);

          return;
        }

        const clinicRef =
          doc(
            db,
            "clinics",
            userData.clinicId
          );

        const clinicSnap =
          await getDoc(clinicRef);

        if (!clinicSnap.exists()) {

          setCheckingSubscription(false);

          return;
        }

        const clinicData:any =
          clinicSnap.data();

        if (
          !clinicData.subscriptionEnd
        ) {

          setCheckingSubscription(false);

          return;
        }

        const endDate =
          new Date(
            clinicData.subscriptionEnd
          );

        const today =
          new Date();

        if (endDate < today) {

          router.push(
            "/subscription-expired"
          );

          return;
        }

        setCheckingSubscription(false);

      } catch (error) {

        console.error(error);

        setCheckingSubscription(false);

      }

    }

    checkAccess();

  }, [
    user,
    loading,
    router,
  ]);

  if (
    loading ||
    checkingSubscription
  ) {

    return (

      <div
        className="
          h-screen
          flex
          items-center
          justify-center
          text-2xl
          font-bold
        "
      >

        جاري التحميل...

      </div>

    );

  }

  return (

    <main
      className="
        min-h-screen
        bg-zinc-100
        p-6
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          space-y-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              mb-4
            "
          >

            نظام المواعيد المطور لأطباء الأسنان 🦷

          </h1>

          <p>

            مرحباً بك

          </p>

        </div>

      </div>

    </main>
  );
}


"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  userData: any;
  role: string;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    userData: null,
    role: "",
    loading: true,
    logout: async () => {},
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [userData, setUserData] =
    useState<any>(null);

  const [role, setRole] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (firebaseUser) => {

          if (!firebaseUser) {

            setUser(null);
            setUserData(null);
            setRole("");
            setLoading(false);

            return;
          }

          setUser(firebaseUser);

          try {

            const userRef =
              doc(
                db,
                "users",
                firebaseUser.uid
              );

            const userSnap =
              await getDoc(userRef);

            if (userSnap.exists()) {

              const data =
                userSnap.data();

              setUserData(data);

              setRole(
                data.role || ""
              );

            }

          } catch (error) {

            console.error(error);

          }

          setLoading(false);

        }

      );

    return () => unsubscribe();

  }, []);

  const logout =
    async () => {

      await signOut(auth);

    };

  return (

    <AuthContext.Provider

      value={{

        user,
        userData,
        role,
        loading,
        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}
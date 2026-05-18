"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  onAuthStateChanged,
  User
} from "firebase/auth";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  auth,
  db
} from "../../lib/firebase";

type AppUser = {

  name?:string;

  email?:string;

  role?:string;

  doctorId?:string;

};

type UserContextType = {

  currentUser:AppUser | null;

  firebaseUser:User | null;

  loading:boolean;

};

const UserContext =
  createContext<UserContextType>({

    currentUser:null,

    firebaseUser:null,

    loading:true

  });

export function UserProvider({
  children
}:{
  children:React.ReactNode
}){

  const [
    currentUser,
    setCurrentUser
  ] = useState<AppUser | null>(
    null
  );

  const [
    firebaseUser,
    setFirebaseUser
  ] = useState<User | null>(
    null
  );

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(()=>{

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async(user)=>{

          try{

            if(!user){

              setFirebaseUser(
                null
              );

              setCurrentUser(
                null
              );

              setLoading(false);

              return;
            }

            setFirebaseUser(
              user
            );

            const snapshot =
              await getDocs(

                collection(
                  db,
                  "users"
                )

              );

            let foundUser:
              AppUser | null = null;

            snapshot.forEach((docItem)=>{

              const data:any =
                docItem.data();

              if(
                data.email ===
                user.email
              ){

                foundUser = {

                  name:
                    data.name || "",

                  email:
                    data.email || "",

                  role:
                    data.role || "secretary",

                  doctorId:
                    data.doctorId || ""

                };

              }

            });

            setCurrentUser(
              foundUser
            );

          }catch(error){

            console.error(
              "UserContext Error:",
              error
            );

            setCurrentUser(
              null
            );

          }finally{

            setLoading(false);

          }

        }

      );

    return ()=>unsubscribe();

  },[]);

  return(

    <UserContext.Provider
      value={{

        currentUser,

        firebaseUser,

        loading

      }}
    >

      {children}

    </UserContext.Provider>

  );

}

export function useUser(){

  return useContext(
    UserContext
  );

}
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqsJEnwlE0fyswrU6_s8_SU1d3zH_GfRE",

  authDomain: "dentist-clinic-2.firebaseapp.com",

  projectId: "dentist-clinic-2",

  storageBucket: "dentist-clinic-2.firebasestorage.app",

  messagingSenderId: "876641399120",

  appId: "1:876641399120:web:78d4295d39ac42be55bc55",

  measurementId: "G-YVBYL0HR87",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
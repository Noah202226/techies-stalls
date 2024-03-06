// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd7cICIBRy767wJbD_gOVgZiU8TOtNsGM",
  authDomain: "techies-stall.firebaseapp.com",
  projectId: "techies-stall",
  storageBucket: "techies-stall.appspot.com",
  messagingSenderId: "497002818555",
  appId: "1:497002818555:web:ad48f42351a3ad8d4bb95e",
  measurementId: "G-07WJWVS1FY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const fs = getFirestore(app);
export const auth = getAuth(app);

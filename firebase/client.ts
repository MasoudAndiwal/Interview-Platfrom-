// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEPt_mS_Kgny7-F0-c1f9w7kpR-GfCMoo",
  authDomain: "interview-platform-d3b79.firebaseapp.com",
  projectId: "interview-platform-d3b79",
  storageBucket: "interview-platform-d3b79.firebasestorage.app",
  messagingSenderId: "92785758305",
  appId: "1:92785758305:web:af08909f73d4a239691a20",
  measurementId: "G-7ZJBJJJESV"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
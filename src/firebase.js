// Documentation: https://firebase.google.com/docs/web/modular-upgrade
// Modular components help with smaller file sizes. :D
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// Initialize Firebase with config information.
initializeApp({
  apiKey: "AIzaSyB1L8sGDtfCIyJdYirmgiOIG2S-y_zvDc4",
  authDomain: "crypto-investment-log.firebaseapp.com",
  projectId: "crypto-investment-log",
  storageBucket: "crypto-investment-log.appspot.com",
  messagingSenderId: "607867618695",
  appId: "1:607867618695:web:7479c05311a574a5503f22",
  measurementId: "G-5BH9QR1XYE",
});

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
export { auth, db, provider, signInWithPopup, GoogleAuthProvider };

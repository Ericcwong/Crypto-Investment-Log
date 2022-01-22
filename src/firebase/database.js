import { firebaseApp } from "./config";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
// User needs to have an account to start saving data to their UID
import store from "@/store/index.js";
const userUID = store.state.user.user.uid;
// Database base
const db = getFirestore(firebaseApp);
// Collection Reference
const colRef = collection(db, "investment");

export const loadInvestments = async (data) => {
  try {
    // DB to investment
    const loadCol = collection(db, "investment");
    // Investment to documents
    const getDoc = await getDocs(loadCol, userUID);
    getDoc.forEach((doc) => {
      console.log(doc);
    });
  } catch (error) {
    console.log(error);
  }
};

export const addInvestment = async (data) => {
  try {
    console.log("Document Data", data.collection);
    const docRef = doc(db, "investment", userUID);
    await setDoc(docRef, { data }, { merge: true });
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
};

loadInvestments();

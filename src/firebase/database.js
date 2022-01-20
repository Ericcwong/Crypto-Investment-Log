import { firebaseApp } from "./config";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
// Database base
const db = getFirestore(firebaseApp);
// Collection Reference
const colRef = collection(db, "investment");

export const addInvestment = async (data) => {
  try {
    // const docRef = await addDoc(colRef, {
    //   data,
    // });
    console.log("Document Data", data);
  } catch (error) {
    console.log("Uh oh, there is an error creating the document.");
  }
};

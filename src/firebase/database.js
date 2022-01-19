import { firebaseApp } from "./config";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

const colRef = collection(db, "investment");

export const addInvestment = (data) => {
  addDoc(colRef, {
    data,
  });
};

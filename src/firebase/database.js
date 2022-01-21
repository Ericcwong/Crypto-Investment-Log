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
import { useAuth } from "./user";
// User needs to have an account to start saving data to their UID
const { user, isLogin, googleSignIn, googleSignOut } = useAuth();
// Database base
const db = getFirestore(firebaseApp);
// Collection Reference
const colRef = collection(db, "investment");
// User's UID

export const loadInvestments = async (data) => {
  try {
    const loadDoc = await getDocs(collection(db, "investment"));
    loadDoc.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
};

export const addInvestment = async (data) => {
  try {
    const userData = user;
    const userUID = await userData._value.uid;
    console.log(user);
    console.log("Document Data", data.collection);

    const docRef = await collection(db, "investment", userUID, data.collection);
    await setDoc(doc(docRef), {
      data,
    });
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
};

loadInvestments();

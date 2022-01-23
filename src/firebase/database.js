import { firebaseApp } from "./config";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
  setDoc,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
// User needs to have an account to start saving data to their UID
import store from "@/store/index.js";
const userUID = await store.state.user.user.uid;
// Database base
const db = getFirestore(firebaseApp);
// Collection Reference
const colRef = collection(db, "investment");

export const loadInvestments = async (data) => {
  try {
    // DB to investment
    const subCol = [];
    const investmentRef = collection(db, "investment");
    const q = query(investmentRef, where("user_id", "==", userUID));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data().crypto_data);
      // subCol.push(doc.data().crypto_data);
      doc.data().crypto_data.forEach((getSubCol) => {
        subCol.push(getSubCol);
      });
      // console.log(subCol);
    });
    subCol.forEach(async (element) => {
      const loadDoc = await getDocs(
        collection(db, "investment", userUID, element)
      );
      console.log(loadDoc);
      loadDoc.forEach((doc) => {
        console.log(doc.data());
      });
    });

    // const loadDoc = await getDocs(collection(db, "investment"));
    // loadDoc.forEach((doc) => {
    //   console.log(doc.data());
    // });

    //   const loadCol = await getDocs(collection(db, "investment"));
    //   loadCol.forEach((doc) => {
    //     console.log(doc.data());
    //   });
  } catch (error) {
    console.log(error);
  }
};

export const addInvestment = async (data) => {
  try {
    // console.log("Document Data", data.collection);
    const dataCollection = data.collection;
    console.log(userUID);
    const docRef = await doc(db, "investment", userUID);
    await updateDoc(docRef, {
      crypto_data: arrayUnion(dataCollection),
    });
    const subColRef = await collection(
      db,
      "investment",
      userUID,
      data.collection
    );
    await setDoc(doc(subColRef), {
      data,
    });
    console.log(docRef);
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
};

loadInvestments();

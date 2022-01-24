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
console.log(store);
const userUID = await store.state.user.user.uid;
// Database base
const db = getFirestore(firebaseApp);
// Collection Reference
const colRef = collection(db, "investment");

export const loadInvestments = async (data) => {
  try {
    const subCol = [];
    // Target top level collection
    const investmentRef = collection(db, "investment");
    // Target investment collection, find document that is user's id
    const q = query(investmentRef, where("user_id", "==", userUID));
    /* Get Documents, documents house save crypto_data.
     * crypto_data is an array that houses all the crypto names the user's have created in new investment.
     */
    const querySnapshot = await getDocs(q);
    // Extracts all the data saved in crypto_data and pushes it to subCol
    querySnapshot.forEach((doc) => {
      doc.data().crypto_data.forEach((getSubCol) => {
        subCol.push(getSubCol);
      });
    });
    // Retrieve all the documents that save into each sub collection.
    subCol.forEach(async (element) => {
      // base object
      let crypto = {};
      // Creates an object with element name and creates an empty array to store document data.
      crypto[element] = new Array();

      const loadDoc = await getDocs(
        collection(db, "investment", userUID, element)
      );

      loadDoc.forEach((doc) => {
        crypto[element].push(doc.data());
      });
      store.dispatch("cryptos/loadUserCryptos", crypto);
    });
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

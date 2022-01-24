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

// Database base
const db = getFirestore(firebaseApp);

// Collection Reference
const investmentRef = collection(db, "investment");

export const loadInvestments = async () => {
  try {
    const userID = await store.state.user.user.uid;
    console.log(userID);
    // Query search document by userID
    const q = query(investmentRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log("Loading investment: ", error);
  }
  // try {
  //   const subCol = [];
  //   // Target top level collection
  //   const investmentRef = collection(db, "investment");
  //   // Target investment collection, find document that is user's id
  //   const q = query(investmentRef, where("user_id", "==", userID));
  //   /* Get Documents, documents house save crypto_data.
  //    * crypto_data is an array that houses all the crypto names the user's have created in new investment.
  //    */
  //   const querySnapshot = await getDocs(q);
  //   // Extracts all the data saved in crypto_data and pushes it to subCol
  //   querySnapshot.forEach((doc) => {
  //     doc.data().crypto_data.forEach((getSubCol) => {
  //       subCol.push(getSubCol);
  //     });
  //   });
  //   // Retrieve all the documents that save into each sub collection.
  //   subCol.forEach(async (element) => {
  //     // base object
  //     let crypto = {};
  //     // Creates an object with element name and creates an empty array to store document data.
  //     crypto[element] = new Array();
  //     const loadDoc = await getDocs(
  //       collection(db, "investment", userID, element)
  //     );
  //     loadDoc.forEach((doc) => {
  //       crypto[element].push(doc.data());
  //     });
  //     store.dispatch("cryptos/loadUserCryptos", crypto);
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

export const addInvestment = async (data) => {
  try {
    const userID = await store.state.user.user.uid;

    // Crypto's name
    const cryptoName = data.collection;

    // Create a document in investment collection. Data read would be using userID that is saved into the document.
    const docRef = await collection(db, "investment");
    await setDoc(doc(docRef), {
      userID: userID,
      ...data,
    });
    // Save crypto's name to user's account. Later organizing data in the client.
    addNewUser();

    console.log("Document created: ", docRef);
  } catch (error) {
    console.log("Add Investment: ", error);
  }
  // try {
  //   // console.log("Document Data", data.collection);
  //   const dataCollection = data.collection;
  //   // docRef writes to the document of the user. Saving which coin they added to the database
  //   const docRef = await doc(db, "investment", userID);
  //   await updateDoc(docRef, {
  //     crypto_data: arrayUnion(dataCollection),
  //   });
  //   // Saves data to sub collections
  //   const subinvestmentRef = await collection(
  //     db,
  //     "investment",
  //     userID,
  //     data.collection
  //   );
  //   await setDoc(doc(subinvestmentRef), {
  //     data,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
const addNewUser = async () => {
  const userID = await store.state.user.user.uid;
  const username = await store.state.user.user.displayName;
  const userRef = doc(db, "user", userID);
  await setDoc(doc(userRef), {
    username: username,
  });
};

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
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
// User needs to have an account to start saving data to their UID
import store from "@/store/index.js";

// Database base
const db = getFirestore(firebaseApp);

// Collection Reference
const investmentRef = collection(db, "investment");

export const loadInvestments = async () => {
  try {
    const userState = store.state.user.user;
    // Checks if there is a user, if so pull their data.
    if (userState !== null) {
      const userID = await store.state.user.user.uid;
      // Query search document by userID
      const q = query(investmentRef, where("userID", "==", userID));
      // When unsubscribe is called, it will stop listening to updates to the database.
      // Currently it is always listening to changes to investment collection where a document's userID is signed in user's id.
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cryptos = [];
        querySnapshot.forEach((doc) => {
          cryptos.push(doc.data());
        });
        store.dispatch("cryptos/loadUserCryptos", cryptos);
      });
    } else {
      return;
    }
  } catch (error) {
    console.log("Loading investment: ", error);
  }
};

export const addInvestment = async (data) => {
  try {
    const userID = await store.state.user.user.uid;

    // Crypto's name
    const cryptoName = data.collection;

    // Create a document in investment collection. Data read would be using userID that is saved into the document.
    // const docRef = collection(db, "investment");
    const docRef = await setDoc(collection(db, "investment"), {
      userID: userID,
      arrayUnion(...data)
    });

    console.log("Document id: ", docRef.id);
    addNewUser(docRef.id);
    // Save crypto's name to user's account. Later organizing data in the client.

    console.log("Document created: ", docRef);
  } catch (error) {
    console.log("Add Investment: ", error);
  }
};
const addNewUser = async (data) => {
  const userID = await store.state.user.user.uid;

  const username = await store.state.user.user.displayName;
  const userRef = doc(db, "user", userID);
  await setDoc(
    userRef,
    {
      username: username,
      cryptos: arrayUnion(data),
    },
    { merge: true }
  );
};

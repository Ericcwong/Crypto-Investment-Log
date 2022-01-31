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
        const docID = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          docID.push({ collection: doc.data().collection, docID: doc.id });
          cryptos.push(doc.data());
        });
        store.commit("cryptos/loadUserCryptosID", docID);
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
    const docIDS = await store.state.cryptos.userCryptosID;
    const docID = "";

    // Crypto's name
    const cryptoName = data.collection;
    // Checks if user has a crypto under their account, if so save it under that crypto. If not create a new document.
    const result = docIDS.find((id) => {
      if (id.collection === cryptoName) {
        return true;
      }
    });
    if (result) {
      const transactionData = data.transaction_data;
      console.log(transactionData);

      const docRef = doc(db, "investment", result.docID);
      await setDoc(
        docRef,
        {
          data: transactionData,
        },
        { merge: true }
      );
      console.log("Document id: ", docRef.id);

      // addNewUser(docRef.id);
    } else {
      // const docRef = await addDoc(collection(db, "investment"), {
      // userID: userID,
      // ...data,
      // });
      console.log(data);
    }
    // Create a document in investment collection. Data read would be using userID that is saved into the document.

    console.log(result);
    // Save crypto's name to user's account. Later organizing data in the client.

    // console.log("Document created: ", docRef);
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

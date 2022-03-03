import { firebaseApp } from "./config";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  setDoc,
  arrayUnion,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
// User needs to have an account to start saving data to their UID
import store from "@/store/index.js";
import { useCryptoStore } from "../stores/cryptos";
import { useUserStore } from "../stores/user";
// Database base
const db = getFirestore(firebaseApp);

// Collection Reference
const investmentRef = collection(db, "investment");

export const loadInvestments = async () => {
  try {
    const cryptoStore = useCryptoStore();
    const userStore = useUserStore();
    const userState = userStore.user;
    // Checks if there is a user, if so pull their data.
    if (userState !== null) {
      const userID = userStore.user.uid;
      const q = query(investmentRef, where("userID", "==", userID));
      // When unsubscribe is called, it will stop listening to updates to the database.
      // Currently it is always listening to changes to investment collection where a document's userID is signed in user's id.
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cryptos = [];
        // Gets Document ID's and Their collection name, later to be used if user wants to add more to that specific crypto.
        const docID = [];
        querySnapshot.forEach((doc) => {
          cryptos.push(doc.data());
          docID.push({ collection: doc.data().collection, docID: doc.id });
        });
        // store.dispatch("cryptos/loadUserCryptos", cryptos);
        cryptoStore.loadUserCryptos(cryptos);
        // store.commit("cryptos/loadUserCryptosID", docID);
        cryptoStore.loadUserCryptosID(docID);
      });
    } else {
      console.log("Error loading investments");
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
      const docRef = doc(db, "investment", result.docID);
      await setDoc(
        docRef,
        {
          // ArrayUnion appends data into the array
          data: arrayUnion({ ...data.transaction_data }),
        },
        { merge: true }
      );
    } else {
      // If document doesn't exist create a new one.
      const docRef = await addDoc(collection(db, "investment"), {
        userID: userID,
        collection: data.collection,
        symbol: data.symbol,
        data: arrayUnion(data.transaction_data),
        goal: data.goal,
        icon: data.icon,
      });
      addNewUser(docRef.id);
    }
  } catch (error) {
    console.log("Add Investment: ", error);
  }
};
const addNewUser = async (data) => {
  console.log;
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
// Deletes the WHOLE document in user's investment
export const deleteInvestment = async (documentID) => {
  await deleteDoc(doc(db, "investment", documentID));
};
export const deleteTransaction = async (documentID, data) => {
  const documentRef = doc(db, "investment", documentID);
  console.log(data);
  await updateDoc(documentRef, {
    data: data,
  });
};

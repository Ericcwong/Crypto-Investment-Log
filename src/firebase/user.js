// Firebase Import
import { firebaseApp } from "./config";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// Store Import
import store from "@/store/index.js";
// Vue functions
import { computed, onMounted, ref } from "vue";
import { loadInvestments } from "./database";
// Calling auth function from firebase and using the configuration.
const auth = getAuth(firebaseApp);
let authFlag = true;

// Listens to any authentication changes, when the user does refresh the page.
// User's sign in data is still there until they sign out.
export const useAuth = () => {
  const user = ref(null);
  const error = {
    code: null,
    message: null,
  };
  // isLogin helps reactive components check authentication state.
  const isLogin = ref(false);
  onMounted(() => {
    onAuthStateChanged(auth, (data) => {
      if (data && authFlag) {
        authFlag = false;
        isLogin.value = true;
        console.log("User Firebase", isLogin.value);
        store.commit("user/getUserData", data);
        loadInvestments();
        user.value = data;
      } else {
        isLogin.value = false;
      }
    });
  });

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      // Handle Errors here.
      error.code = err.code;
      error.message = err.message;
      // The email of the user's account used.
      const email = err.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(err);
    }
  };

  const googleSignOut = () => {
    // Clear store states
    store.commit("user/clearUser");
    store.commit("cryptos/clearState");
    store.commit("cryptos/clearUserCrypto");
    signOut(auth).then(() => {
      console.log("User Signed out");
    });
  };
  // monitorAuthState();
  return { user, isLogin, googleSignIn, googleSignOut };
};

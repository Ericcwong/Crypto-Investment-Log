// Firebase Import
import { firebaseApp } from "./config";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// Store Import
import store from "@/store/index.js";
// Vue functions
import { computed, onUnmounted, ref } from "vue";
import { loadInvestments } from "./database";
// Calling auth function from firebase and using the configuration.
const auth = getAuth(firebaseApp);

// Listens to any authentication changes, when the user does refresh the page.
// User's sign in data is still there until they sign out.
export const useAuth = () => {
  const user = ref(null);
  const error = {
    code: null,
    message: null,
  };
  const unsubscribe = auth.onAuthStateChanged((userData) => {
    loadInvestments(userData.uid);
    user.value = userData;
  });
  onUnmounted(unsubscribe);
  // isLogin helps reactive components check authentication state.
  const isLogin = computed(() => user.value !== null);
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
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
    store.commit("user/clearUser");
    auth.signOut();
  };
  return { user, isLogin, googleSignIn, googleSignOut };
};

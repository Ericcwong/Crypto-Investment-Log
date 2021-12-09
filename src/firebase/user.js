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
import { computed, onMounted, onUnmounted, ref } from "vue";

// Calling auth function from firebase and using the configuration.
const auth = getAuth(firebaseApp);

// Listens to any authentication changes, when the user does refresh the page.
// User's sign in data is still there until they sign out.
export const useAuth = () => {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged(
    (userData) => (user.value = userData)
  );
  onUnmounted(unsubscribe);
  // isLogin helps reactive components check authentication state.
  const isLogin = computed(() => user.value !== null);
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Pass user information to state
        store.commit("user/getUserData", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Pass error information to state
        // store.commit("user/loginErrorCode", { errorCode, errorMessage });
      });
  };

  const googleSignOut = () => {
    store.commit("user/clearUser");
    auth.signOut();
  };
  return { user, isLogin, googleSignIn, googleSignOut };
};

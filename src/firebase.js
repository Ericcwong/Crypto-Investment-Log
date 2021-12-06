// Documentation: https://firebase.google.com/docs/web/modular-upgrade
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ref, onMounted, computed } from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyB1L8sGDtfCIyJdYirmgiOIG2S-y_zvDc4",
  authDomain: "crypto-investment-log.firebaseapp.com",
  projectId: "crypto-investment-log",
  storageBucket: "crypto-investment-log.appspot.com",
  messagingSenderId: "607867618695",
  appId: "1:607867618695:web:7479c05311a574a5503f22",
  measurementId: "G-5BH9QR1XYE",
});
const db = firebase.firestore();
const auth = firebase.auth();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onMounted(() => {
    unsubscribe;
  });
  const isLogin = computed(() => user.value !== null);
  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
  };
  const signOut = () => auth.signOut();
  return { user, isLogin, signIn, signOut };
}

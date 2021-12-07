// Documentation: https://firebase.google.com/docs/web/modular-upgrade
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { reactive, onMounted, computed } from "vue";
import { store } from "./store/index";
// const store = useStore();
console.log(store.state.user.user);
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
  const user = reactive({
    data: null,
  });
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.data = _user));
  onMounted(() => {
    unsubscribe;
  });
  const isLogin = computed(() => user.data !== null);
  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
    store.commit("user/getUserData", user.data);
  };
  const signOut = () => {
    store.commit("user/clearUser");
    auth.signOut();
  };
  return { user, isLogin, signIn, signOut };
}

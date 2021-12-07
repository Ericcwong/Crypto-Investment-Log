import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/firebase.js";

const state = {
  user: null,
};

const mutations = {
  getUserData(state, payload) {
    console.log("Called mutation");
    console.log(payload);
    state.user = payload;
    console.log(state.user);
  },
  clearUser(state) {
    state.user = null;
    console.log(state.user);
  },
};

const actions = {
  signIn() {
    signInWithPopup(auth, provider)
      .then((results) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

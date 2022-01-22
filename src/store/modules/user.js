const state = {
  user: null,
  userErrorCode: "",
  userErrorMessage: "",
};

const mutations = {
  getUserData(state, payload) {
    // console.log(payload);
    state.user = payload;
  },
  loginErrorCode(state, { errorCode, errorMessage }) {
    state.userErrorCode = errorCode;
    state.userErrorMessage = errorMessage;
  },
  clearUser(state) {
    state.user = null;
    state.userErrorCode = "";
    state.userErrorMessage = "";
  },
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

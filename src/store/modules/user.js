const state = () => ({
  user: null,
});

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

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

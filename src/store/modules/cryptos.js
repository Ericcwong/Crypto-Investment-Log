import axios from "axios";

const state = () => ({
  cryptos: [],
  userCryptos: [],
});
const mutations = {
  loadCryptos(state, payload) {
    // console.log(payload);
    payload.forEach((element) => {
      state.cryptos.push(element);
    });
  },
  loadUserCrypto(state, payload) {
    state.userCryptos.push(payload);
  },
  clearState(state) {
    state.userCryptos = [];
    state.cryptos = [];
  },
};
const actions = {
  //   Pull cryptos for autocomplete from Coingecko
  async loadCryptos(context) {
    try {
      context.commit("clearState");
      // Looping through 1-15 because Coingecko's API only allows 250 per page. Calling in 15 pages
      for (let i = 1; i < 2; i++) {
        let response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
        );
        console.log(response);
        let cryptos = response.data;
        context.commit("loadCryptos", cryptos);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async loadUserCryptos(context, payload) {
    try {
      console.log(payload);
      // context.commit("clearState");
      // context.commit("loadUserCrypto", payload.data);
    } catch (error) {
      console.log("Loading user's crypto", error);
    }
  },
};
const getters = {
  getCryptoByName: (state) => (name) => {
    let data = state.cryptos.filter((crypto) => {
      let regex = new RegExp(`(^${name})`, "gim");
      return crypto.name.match(regex) || crypto.symbol.match(regex);
    });
    console.log(data);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

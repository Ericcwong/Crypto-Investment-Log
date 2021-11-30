import { createStore } from "vuex";
import axios from "axios";
export const store = createStore({
  state: {
    cryptos: [],
  },
  mutations: {
    loadCryptos(state, payload) {
      // console.log(payload);
      payload.forEach((element) => {
        state.cryptos.push(element);
      });
    },
  },
  actions: {
    //   Pull cryptos for autocomplete from Coingecko
    async loadCryptos(context) {
      try {
        let response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
        );
        let cryptos = response.data;
        context.commit("loadCryptos", cryptos);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getCryptoByName: (state) => (name) => {
      // console.log(state.cryptos);
      console.log(name);
      return state.cryptos.filter(
        (crypto) => crypto.name === name || crypto.symbol === name
      );
    },
  },
});

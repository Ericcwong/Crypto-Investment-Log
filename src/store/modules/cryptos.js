import axios from "axios";

const state = () => ({
  cryptos: [],
  userCryptos: [],
  userCryptosID: [],
});
const mutations = {
  loadCryptos(state, payload) {
    payload.forEach((element) => {
      state.cryptos.push(element);
    });
  },
  loadUserCrypto(state, payload) {
    console.log(payload);
    payload.forEach((element) => {
      state.userCryptos.push(element);
    });
  },
  loadUserCryptosID(state, payload) {
    state.userCryptosID = payload;
  },
  clearState(state) {
    state.cryptos = [];
  },
  clearUserCrypto(state) {
    state.userCryptos = [];
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
  async loadUserCryptos({ commit, dispatch }, payload) {
    try {
      let data = await dispatch("calculateUserCrypto", payload);
      console.log(data);
      commit("clearUserCrypto");
      commit("loadUserCrypto", data); // Need to pass calculated total afterwards
    } catch (error) {
      console.log("Loading user's crypto", error);
    }
  },
  async calculateUserCrypto({ dispatch }, payload) {
    payload.forEach(async (doc) => {
      let totalPrice = doc.data.reduce((previous, current) => {
        return previous + current.price * current.quantity;
      }, 0);
      let totalQuantity = doc.data.reduce((previous, current) => {
        return previous + current.quantity;
      }, 0);
      let price = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${doc.collection}&vs_currencies=usd`
      );
      let currentPrice = price.data[doc.collection].usd;

      doc.data.push({ total_price: totalPrice });
      // // Creates a new property within data array!
      // doc.data.currentPrice = currentPrice;
      // doc.data.totalPrice = totalPrice;
      // doc.data.totalQuantity = totalQuantity;
      // doc.data.averagePrice = (totalPrice / totalQuantity).toFixed(2);
      // doc.data.profit_loss = currentPrice * totalQuantity - totalPrice;
      console.log(doc);
    });
    return payload;
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
  getState(state) {
    return state.userCryptos;
  },
  getCrypto: (state) => async (name) => {
    let data = state.userCryptos.filter((crypto) => {
      crypto.collection = name;
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

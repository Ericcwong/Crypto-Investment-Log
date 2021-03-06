import { defineStore } from "pinia";
import axios from "axios";
export const useCryptoStore = defineStore("crypto", {
  state: () => {
    return {
      cryptos: [],
      userCryptos: [],
      userCryptosID: [],
      fromCrypto: null,
      toCrypto: null,
    };
  },
  actions: {
    loadUserCryptosID(payload) {
      this.userCryptosID = payload;
    },
    clearState() {
      this.cryptos = [];
    },
    clearUserCrypto() {
      this.userCryptos = [];
    },
    async loadCryptos() {
      try {
        this.cryptos = [];

        // Looping through 1-15 because Coingecko's API only allows 250 per page. Calling in 15 pages
        for (let i = 1; i <= 2; i++) {
          let response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
          );
          let cryptos = response.data;
          cryptos.forEach((element) => {
            this.cryptos.push(element);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadUserCryptos(payload) {
      try {
        const data = await this.calculateUserCrypto(payload);
        console.log(data);
        this.userCryptos = data;
        this.loadSwapCrypto();
      } catch (error) {
        console.log("Loading user's crypto", error);
      }
    },
    async calculateUserCrypto(payload) {
      const calculatedPayload = Promise.all(
        payload.map(async (doc) => {
          let totalPrice = doc.data.reduce((previous, current) => {
            if (current.transaction_type === "Buy") {
              console.log(current);
              return previous + current.price * current.quantity;
            } else {
              return previous - current.price * current.quantity;
            }
          }, 0);
          let totalQuantity = doc.data.reduce((previous, current) => {
            if (current.transaction_type === "Buy") {
              return previous + current.quantity;
            } else {
              return previous - current.quantity;
            }
          }, 0);
          let getPrice = this.cryptos.find((apiCrypto) => {
            // doc.collection = name.id;
            if (apiCrypto.id === doc.collection) {
              return apiCrypto.current_price;
            }
          });
          let currentPrice = await getPrice.current_price;
          // // Creates a new property within data array!
          doc.current_value = currentPrice * totalQuantity;
          doc.current_price = currentPrice;
          doc.total_price = totalPrice;
          doc.total_quantity = totalQuantity;
          if (totalQuantity > 0) {
            doc.average_price = (totalPrice / totalQuantity).toFixed(2);
          }
          doc.profit_loss = (currentPrice * totalQuantity - totalPrice).toFixed(
            2
          );
          // console.log(doc);
          return doc;
        })
      );
      return calculatedPayload;
    },
    // When home page mounts, this displays uses's highest and second highest valued cryptos to swap.
    async loadSwapCrypto() {
      // Sorts and orders cryptos by highest total asset price.
      let data = this.userCryptos.sort((a, b) => {
        return b.total_price - a.total_price;
      });
      this.fromCrypto = data[0];
      this.fromCrypto.tradeQuantity = null;
      this.toCrypto = data[1];
      this.toCrypto.tradeQuantity = null;
    },
    calculateSwap() {
      let fromCryptoAmount =
        this.fromCrypto.current_price * this.fromCrypto.tradeQuantity;
      let swapReturn = fromCryptoAmount / this.toCrypto.current_price;
      this.toCrypto.swapReturn = swapReturn;
    },
    //Swap from crypto one position to two and vice-versa.
    swapCrypto() {
      this.fromCrypto.tradeQuantity = null;
      this.toCrypto.tradeQuantity = null;

      [this.fromCrypto, this.toCrypto] = [this.toCrypto, this.fromCrypto];
    },
    //Swap crypto one value to crypto two.
    swapAssets() {
      let from = this.fromCrypto;
      let to = this.toCrypto;
    },
  },
  getters: {
    getCryptoByName: (state) => (name) => {
      let data = state.cryptos.filter((crypto) => {
        let regex = new RegExp(`(^${name})`, "gim");
        return crypto.name.match(regex) || crypto.symbol.match(regex);
      });
      console.log(data);
      return data;
    },
    getState: (state) => state.userCryptos,

    // Filter array of duplicates and returns only one of each crypto
    getUserCrypto(state) {
      console.log(state.userCryptos);
      let data = state.userCryptos.sort((a, b) => {
        // Sorts and orders cryptos by highest total asset price.
        return b.total_price - a.total_price;
      });
      console.log("getUserCrypto Data", data);
      return data;
    },
    getCrypto: (state) => async (name) => {
      let data = state.userCryptos.filter((crypto) => {
        crypto.collection = name;
      });
      console.log(data);
      return data;
    },
  },
});

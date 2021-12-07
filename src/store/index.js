import { createStore, createLogger } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import cryptos from "./modules/cryptos.js";
import user from "./modules/user";
const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
  modules: {
    cryptos,
    user,
  },
  plugins: [createPersistedState()],
});

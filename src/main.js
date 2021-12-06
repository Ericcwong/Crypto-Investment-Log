import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/cryptos.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./styles/style.css";

library.add(faSearch);
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .mount("#app");

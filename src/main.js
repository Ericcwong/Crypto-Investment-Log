import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./styles/style.css";

library.add(faSearch, faTimes, faTimesCircle);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");

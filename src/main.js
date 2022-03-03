import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
import { createPinia } from "pinia";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faTimesCircle,
  faPlus,
  faCaretDown,
  faUserCircle,
  faArrowAltCircleRight,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PrimeVue from "primevue/config";
import "./style.css";

library.add(
  faSearch,
  faTimes,
  faTimesCircle,
  faGoogle,
  faPlus,
  faCaretDown,
  faUserCircle,
  faArrowAltCircleRight,
  faRocket
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(PrimeVue)
  .use(createPinia())
  .use(router)
  .use(store)
  .mount("#app");

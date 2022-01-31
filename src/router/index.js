import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import CryptoDetail from "@/pages/user/CryptoDetail.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user/:id",
    name: "CryptoDetail",
    component: CryptoDetail,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

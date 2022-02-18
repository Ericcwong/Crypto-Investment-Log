import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import CryptoDetail from "@/pages/user/CryptoDetail.vue";
import Portfolio from "@/pages/portfolio/Portfolio.vue";
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
  {
    path: "/portfolio/:id",
    name: "Portfolio",
    component: Portfolio,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

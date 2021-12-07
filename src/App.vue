<template>
  <Navbar />
  <div class="page-container">
    <section class="h-16">
      <h1 class="pt-8" v-if="isLogin">
        Welcome {{ user.data.displayName.split(" ")[0] }}, Portfolio is at
        (price) (up or down percentage)
      </h1>
    </section>
    <section id="current-investment" class="">
      <UserInvestment />
    </section>
    <section>
      Market data
      <MarketData />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./components/UI/Navbar.vue";
import UserInvestment from "./components/UserInvestment/index.vue";
import MarketData from "./components/MarketData/index.vue";
import { useStore } from "vuex";

const store = useStore();
</script>

<style>
#app {
  background-color: #1f2033;
  color: white;
  height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
}
.page-container {
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
}
</style>

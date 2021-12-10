<template>
  <div class="page-container">
    <Navbar class="navbar" />

    <section class="welcome-banner h-16">
      <h1 class="pt-8 text-center" v-if="isLogin">
        Welcome {{ user.displayName.split(" ")[0] }}, Portfolio is at (price)
        (up or down percentage)
      </h1>
    </section>
    <section id="current-investment" class="investment-body">
      <UserInvestment />
    </section>
    <section class="market-data">
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
import { useAuth } from "./firebase/user";

const { isLogin, user } = useAuth();
</script>

<style>
#app {
  /* background-color: #1f2033; */
  color: black;
  height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
}

.page-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 15% 85%;
  grid-template-areas:
    "navbar welcomeBanner"
    "investmentBody investmentBody"
    "marketData marketData";
  height: 100vh;
}

.navbar {
  grid-area: navbar;
}
.welcome-banner {
  grid-area: welcomeBanner;
}
.investment-body {
  grid-area: investmentBody;
}
.market-data {
  grid-area: marketData;
}
</style>

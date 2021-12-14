<template>
  <Navbar />
  <router-view></router-view>
</template>

<script setup>
import Navbar from "./components/UI/Navigation/Navbar.vue";
import UserInvestment from "./components/UserInvestment/index.vue";
import MarketData from "./components/MarketData/index.vue";
import WelcomeBanner from "./components/WelcomeBanner.vue";
</script>

<style>
#app {
  /* background-color: #1f2033; */
  color: black;
  height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>

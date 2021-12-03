<template>
  <div class="container">
    <section class="">
      <h1 class="pt-8">
        Welcome (user), Portfolio is at (price) (up or down percentage)
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
import UserInvestment from "./components/UserInvestment/index.vue";
import MarketData from "./components/MarketData/index.vue";
</script>

<style>
#app {
  background-color: #1f2033;
  color: white;
  height: 100vh;
}
.container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}
</style>

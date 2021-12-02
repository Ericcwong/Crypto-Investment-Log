<template>
  <div class="container">
    <section class="options">
      <button @click.prevent="NewInvestment = !NewInvestment">
        New Investment
      </button>
    </section>
    <section class="user-data">
      <h1>Welcome (user), Portfolio is at (price) (up or down percentage)</h1>
    </section>
  </div>
</template>

<script setup>
import NewInvestment from "./components/NewInvestment/index.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1f2033;
  color: white;
  height: 100vh;
}
</style>

<template>
  <div class="bg-white text-black dark:bg-gray-900 dark:text-white pr-20 pl-20">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "./components/UI/Navigation/Navbar.vue";
</script>

<style scoped>
#app {
  /* background-color: #1f2033; */
  color: black;
  height: 100vh;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>

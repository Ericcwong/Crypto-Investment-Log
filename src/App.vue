<template>
  <div class="grid sm:grid-cols-4 lg:grid-cols-7 h-screen">
    <Navbar class="sm:col-span-1 lg:col-span-1 border-r-4 border-gray-500" />
    <div class="sm:col-span-3 lg:col-span-6 bg-main-bg text-white">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/UI/Navigation/Navbar.vue";
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

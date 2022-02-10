<template>
  <div class="grid grid-cols-7 h-screen">
    <Navbar class="col-span-1 border-r-4 border-gray-500" />
    <div class="col-span-6">
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

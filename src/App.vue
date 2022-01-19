<template>
  <div class="flex flex-row h-screen">
    <Navbar class="" />
    <router-view class="flex-grow"></router-view>
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

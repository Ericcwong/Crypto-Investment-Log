<template>
  <section id="current-investment" class="bg-gray-900 h-screen">
    <HomeContent v-if="!isLogin" class="flex justify-center items-center" />
    <!-- If user is logged in -->
    <Dashboard v-if="isLogin" />
  </section>
</template>

<script setup>
import { onMounted, ref, provide } from "vue";
import HomeContent from "@/components/UI/HomePage/index.vue";
import Dashboard from "./Dashboard.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const isLogin = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
    }
  });
  provide("isLogin", isLogin);
});
</script>

<style scoped></style>

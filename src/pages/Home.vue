<template>
  <div>
    <section id="current-investment" class="investment-body"></section>
  </div>
</template>

<script setup>
import WelcomeBanner from "@/components/UI/HomePage/WelcomeBanner.vue";
import MarketData from "@/components/MarketData/index.vue";
import { useAuth } from "@/firebase/user";
const { isLogin, user } = useAuth();
</script>

<style scoped></style>

<template>
  <section id="current-investment" class="investment-body">
    <LoadInvestment />
  </section>
</template>

<script setup>
import WelcomeBanner from "@/components/UI/HomePage/WelcomeBanner.vue";
import MarketData from "@/components/MarketData/index.vue";
import { useAuth } from "@/firebase/user";
import LoadInvestment from "../components/LoadInvestment/index.vue";
</script>

<style scoped></style>

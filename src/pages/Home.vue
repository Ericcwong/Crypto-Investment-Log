<template>
  <section id="current-investment" class="grid grid-cols-2">
    <LoadInvestment />

    <div class="">
      <h1>Market Data</h1>
    </div>
  </section>
</template>

<script setup>
import MarketData from "@/components/MarketData/index.vue";
import LoadInvestment from "../components/LoadInvestment/index.vue";
</script>

<style scoped>
.header {
  display: flex;
}
</style>

<template>
  <section
    id="current-investment"
    class="grid grid-flow-col grid-cols-2 grid-rows-6 h-screen"
  >
    <div class="flex justify-center items-center col-span-2 row-span-4">
      <Swap />
    </div>

    <div class="col-span-2 row-span-2 bg-nav-bg"><LoadInvestment /></div>
  </section>
</template>

<script setup>
import MarketData from "@/components/MarketData/index.vue";
import LoadInvestment from "../components/LoadInvestment/index.vue";
import Swap from "@/components/Swap/index.vue";
</script>

<style scoped>
.header {
  display: flex;
}
</style>

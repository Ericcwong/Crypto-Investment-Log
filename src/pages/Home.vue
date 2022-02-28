<template>
  <section
    id="current-investment"
    class="grid grid-flow-col grid-cols-2 grid-rows-6 h-screen"
  >
    <HomeContent
      v-if="!isLogin"
      class="flex justify-center items-center col-span-2 row-span-6"
    />
    <!-- If user is logged in -->
    <div
      v-if="isLogin"
      class="flex justify-center items-center col-span-2 row-span-4"
    >
      <Swap />
    </div>

    <div v-if="isLogin" class="col-span-2 row-span-2 bg-nav-bg">
      <LoadInvestment />
    </div>
  </section>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useAuth } from "@/firebase/user";
import HomeContent from "@/components/UI/HomePage/index.vue";
import MarketData from "@/components/MarketData/index.vue";
import LoadInvestment from "../components/LoadInvestment/index.vue";
import Swap from "@/components/Swap/index.vue";

const { isLogin, user } = useAuth();
</script>

<style scoped></style>

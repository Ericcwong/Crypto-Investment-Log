<template>
  <div class="min-h-full h-full">
    <div class="flex justify-center items-center py-10">
      <Swap />
    </div>

    <LoadInvestment />
  </div>
</template>

<script setup>
import { useCryptoStore } from "../stores/cryptos";
import { onMounted } from "vue";
import LoadInvestment from "../components/LoadInvestment/index.vue";
import Swap from "../components/Swap/index.vue";

const cryptoStore = useCryptoStore();
onMounted(() => {
  cryptoStore.loadCryptos();
});
</script>

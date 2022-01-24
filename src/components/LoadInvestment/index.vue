<template>
  <div class="grid gap-8">
    <div class="" v-for="(cryptos, index) in state.userCrypto" :key="index">
      <div class="" v-for="(crypto, name) in cryptos" :key="name">
        <div class="capitalize">{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted, computed } from "vue";
import { loadInvestments } from "@/firebase/database.js";
onMounted(() => {
  loadInvestments();
});
const store = useStore();

console.log(store.state);
const state = reactive({
  userCrypto: store.state.cryptos.userCryptos,
});

const filterData = async () => {
  let name = investment.cryptoName;
  investment.crypto = null;
  let getCrypto = await store.getters["cryptos/getCryptoByName"](name);
  // Clear Matches after search
  if (name === "") {
    investment.matches = [];
  } else {
    console.log(getCrypto);
    investment.matches = getCrypto;
  }
};
</script>

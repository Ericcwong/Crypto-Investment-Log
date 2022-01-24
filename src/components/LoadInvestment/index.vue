<template>
  <!-- <div class="" v-for="crypto in state.userCrypto" :key="crypto.id">
    <div class="">{{ crypto.collection }}</div>
  </div> -->
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
import { loadInvestments } from "@/firebase/database.js";
onMounted(() => {
  loadInvestments();
});
const store = useStore();

// const state = reactive({
//   userCrypto: store.state.cryptos.userCryptos,
// });
</script>

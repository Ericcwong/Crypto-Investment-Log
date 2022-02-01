<template>
  <div class="" v-if="state.data !== null">
    <div class="header flex items-center">
      <h1 class="text-3xl capitalize">{{ state.name }}</h1>
      <img class="w-20" :src="state.data.icon" alt="" />
    </div>
    <div class="" v-for="(transaction, index) in state.data.data" :key="index">
      {{ transaction }}
    </div>
  </div>
  <!-- {{ state.data }} -->
</template>

<script setup>
import { useRoute } from "vue-router";
import { reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const state = reactive({
  name: "",
  data: null,
});
onMounted(() => {
  state.name = "";
  state.data = null;
  const route = useRoute();
  state.name = route.params.id;
  getCrypto();
});
watch(
  () => store.state.cryptos.userCryptos,
  (first, second) => {
    // console.log("First", second);
    state.userCryptos = first;
    getCrypto();
  }
);
const getCrypto = async () => {
  const storeState = await store.state.cryptos.userCryptos;
  let data = storeState.find((crypto) => crypto.collection === state.name);
  state.data = { ...data };
};
</script>

<style scoped></style>

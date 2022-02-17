<!-- 
  Displays user's available assets to swap.
 -->

<template>
  <div class="text-black h-full">
    <div class="grid gap-4">
      <div
        class="flex justify-between items-center hover:bg-slate-300 hover:cursor-pointer"
        v-for="userCrypto in userCryptos"
      >
        <img
          class="w-14"
          :src="userCrypto.icon"
          :alt="`${userCrypto.collection} icon`"
        />
        <span class="flex justify-center capitalize">{{
          userCrypto.collection
        }}</span>

        <span class="flex justify-end">{{ userCrypto.total_quantity }}</span>
      </div>
    </div>
    <!-- <Button>Add another crypto</Button> -->
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, onMounted } from "vue";
import SearchResults from "@/components/NewInvestment/SearchResults.vue";
const store = useStore();
const investment = reactive({
  cryptoName: "",
  crypto: null,
  shareAmount: null,
  total: 0,
  matches: null,
});
onMounted(() => {
  retrieveData();
});

const retrieveData = async () => {
  store.dispatch("cryptos/loadCryptos");
};
let userCryptos = computed(() => store.getters["cryptos/getUserCrypto"]);
const filterData = async () => {
  // User inputs will filter through Vuex state to find the crypto by ID or Symbol
  // Stores data retrieved into matches
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
const getCurrentPrice = (data) => {
  investment.crypto = data;
  investment.cryptoName = "";
  investment.matches = [];
};
</script>

<style scoped></style>

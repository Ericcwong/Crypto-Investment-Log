<template>
  <!-- Wait for User to input a crypto the want -->
  <form
    class="flex justify-between items-center border-zinc-700 border-2 mb-4 rounded-md"
  >
    <span class="z-10 absolute">
      <font-awesome-icon class="icon ml-1" icon="search" />
    </span>
    <input
      type="text"
      placeholder="Start search"
      v-model="investment.cryptoName"
      @input="filterData"
      class="w-full outline-none pl-6 relative rounded-md"
    />
  </form>
  <SearchResults
    @getPrice="getCurrentPrice"
    :matches="investment.matches"
    v-if="investment.crypto === null"
  />
  <CreateTransaction
    v-if="investment.crypto !== null"
    :crypto="investment.crypto"
  />
</template>

<script setup>
import SearchResults from "@/components/NewInvestment/SearchResults.vue";
import CreateTransaction from "@/components/NewInvestment/CreateTransaction.vue";
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { mapGetters } from "vuex";

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

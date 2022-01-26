<template>
  <div class="">
    <h2>Your investments</h2>
    <div class="">
      <div class="grid gap-4">
        <div :class="crypto.collection" v-for="crypto in state.userCryptos">
          <div class="header flex items-center justify-between">
            <div class="flex items-center">
              <img
                class="w-12"
                :src="crypto.icon"
                :alt="`${crypto.collection} icon`"
              />
              <h4 class="capitalize">{{ crypto.collection }}</h4>
            </div>

            <div class="">
              <p>Current Price: {{ crypto.currentPrice }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted, computed } from "vue";
import { loadInvestments } from "@/firebase/database.js";
import axios from "axios";
const store = useStore();

const state = reactive({
  userCryptos: store.state.cryptos.userCryptos,
});

// Gets current market price
const getCryptoPrice = () => {
  state.userCryptos.forEach(async (crypto) => {
    const name = crypto.collection;
    let price = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`
    );
    crypto.currentPrice = price.data[name].usd;
  });
};
// Group duplicate documents together

onMounted(() => {
  getCryptoPrice();
});
</script>

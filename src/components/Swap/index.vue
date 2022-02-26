<!-- 
-- Swap between different assets
-->

<template>
  <div class="border h-5/6 w-1/3 bg-slate-600 rounded-lg text-white">
    <div class="grid gap-12 p-5">
      <h2>Swap Assets</h2>
      <!-- From input -->
      <FromInput
        :userCrypto="userCrypto"
        :selectedCryptoOne="selectedCryptoOne"
        @updateCrypto="changeCryptoOne"
      />

      <!-- Switch from, to. -->
      <div class="flex justify-center items-center">
        <img src="https://img.icons8.com/ios-glyphs/30/000000/change--v1.png" />
      </div>

      <!-- To input -->
      <ToInput
        :userCrypto="userCrypto"
        :selectedCryptoTwo="selectedCryptoTwo"
        @updateCrypto="changeCryptoTwo"
      />
      <div class="border text-right">{{ swapPrice }}</div>
      <Button name="Swap" />
    </div>
  </div>
</template>

<script setup>
/**
 * Swap displays the highest fiat priced investment followed by the second
 * Modal opens when user chooses to change assets.
 **/
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";

import Button from "@/components/UI/Button.vue";
import FromInput from "./FromInput.vue";
import ToInput from "./ToInput.vue";
const selectedCryptoOne = reactive({
  index: 0,
  symbol: null,
  current_price: null,
});
const selectedCryptoTwo = reactive({
  index: 1,
  symbol: null,
  current_price: null,
});
const swapPrice = ref(null);
const store = useStore();
const userCrypto = store.getters["cryptos/getUserCrypto"];
onMounted(() => {
  updateValue();
  calculatePrice();
});
/* When page loads, gets current price from store getters and puts in reactive data. Cannot call data before reactive was initalized.
 * Also retrieves the name
 */
const updateValue = () => {
  selectedCryptoOne.current_price = userCrypto[0].current_price;
  selectedCryptoOne.symbol = userCrypto[0].symbol;
  selectedCryptoTwo.current_price = userCrypto[1].current_price;
  selectedCryptoTwo.symbol = userCrypto[1].symbol;
};
const calculatePrice = async () => {
  const priceOne = await selectedCryptoOne.current_price;
  const priceTwo = await selectedCryptoTwo.current_price;
  const symbolOne = await selectedCryptoOne.symbol;
  const symbolTwo = await selectedCryptoTwo.symbol;

  console.log(priceOne, priceTwo);
  // if (priceOne >= priceTwo) {
  let swapReturn = priceOne / priceTwo;
  console.log(swapReturn);
  swapPrice.value = `One ${symbolOne.toUpperCase()} = ${swapReturn} ${symbolTwo.toUpperCase()}`;
  // }
};
const changeCryptoOne = (data) => {
  selectedCryptoOne.index = data.index;
  selectedCryptoOne.current_price = data.current_price;
  selectedCryptoOne.symbol = data.symbol;
  calculatePrice();
};
const changeCryptoTwo = (data) => {
  selectedCryptoTwo.index = data.index;
  selectedCryptoTwo.current_price = data.current_price;
  selectedCryptoTwo.symbol = data.symbol;
  calculatePrice();
};
</script>

<style></style>

<!-- 
-- Swap between different assets
-->

<template>
  <div class="border w-1/3 bg-slate-600 rounded-lg text-white">
    <div class="grid gap-12 p-5">
      <h2>Swap Assets</h2>
      <!-- From input -->
      <FromInput
        :userCrypto="userCrypto"
        :selectedCryptoOne="selectedCryptoOne"
        @updateTradeQuantity="tradeQuantity"
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
      <div class="flex flex-col border text-right">
        <div>{{ price.swapPrice }}</div>
        <div v-if="price.tradeQuantity !== ''" class="">
          <div>{{ price.tradePrice }}</div>
          <div>USD amount: ${{ price.usdAmount }}</div>
        </div>
      </div>
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
  quantity: null,
});
const selectedCryptoTwo = reactive({
  index: 1,
  symbol: null,
  current_price: null,
  quantity: null,
});
const price = reactive({
  usdAmount: null,
  swapPrice: null,
  tradePrice: null,
  quantity: null,
  tradeQuantity: null,
});
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
  selectedCryptoOne.quantity = userCrypto[0].total_quantity;
  selectedCryptoTwo.current_price = userCrypto[1].current_price;
  selectedCryptoTwo.symbol = userCrypto[1].symbol;
  selectedCryptoTwo.quantity = userCrypto[1].total_quantity;
};
const calculatePrice = async () => {
  const priceOne = await selectedCryptoOne.current_price;
  const priceTwo = await selectedCryptoTwo.current_price;
  const symbolOne = await selectedCryptoOne.symbol;
  const symbolTwo = await selectedCryptoTwo.symbol;
  let swapReturn = priceOne / priceTwo;
  price.swapPrice = `One ${symbolOne.toUpperCase()} = ${swapReturn} ${symbolTwo.toUpperCase()}`;
};
const changeCryptoOne = (data) => {
  console.log(data);
  selectedCryptoOne.index = data.index;
  selectedCryptoOne.current_price = data.current_price;
  selectedCryptoOne.symbol = data.symbol;
  selectedCryptoOne.quantity = data.quantity;
  calculatePrice();
};
const changeCryptoTwo = (data) => {
  selectedCryptoTwo.index = data.index;
  selectedCryptoTwo.current_price = data.current_price;
  selectedCryptoTwo.symbol = data.symbol;
  selectedCryptoTwo.quantity = data.total_quantity;

  calculatePrice();
};
const tradeQuantity = async (data) => {
  price.tradeQuantity = data.value;
  const priceOne = await selectedCryptoOne.current_price;
  const priceTwo = await selectedCryptoTwo.current_price;
  const symbolOne = await selectedCryptoOne.symbol;
  const symbolTwo = await selectedCryptoTwo.symbol;

  let tradeReturn = (priceOne * data.value) / priceTwo;
  price.tradePrice = `${price.tradeQuantity} 
    ${symbolOne.toUpperCase()} = ${tradeReturn} ${symbolTwo.toUpperCase()}`;
  price.usdAmount = priceOne * data.value;
};
</script>

<style></style>

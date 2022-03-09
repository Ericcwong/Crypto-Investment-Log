<template>
  <div
    class="swap-container w-full md:w-1/2 lg:w-1/3 border bg-gray-800 text-white rounded grid gap-12 p-5"
  >
    <h2>Swap</h2>
    <!-- From Input -->
    <FromInput @amountPass="checkAmount" />
    <!-- Switch from, to. -->
    <div class="flex justify-center items-center">
      <img
        @click.prevent="swapCrypto"
        src="https://img.icons8.com/ios-glyphs/30/000000/change--v1.png"
      />
    </div>

    <!-- To Input -->
    <ToInput />
    <div>
      <Button
        class="w-full"
        :class="
          overAmount
            ? ' text-decoration: line-through background: bg-red-500'
            : 'text-white'
        "
        name="Submit"
        @click.prevent="swapAsset"
      />
      <span v-if="overAmount" class="text-red-500"
        >Cannot submit, From amount is over amount available.</span
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import { useCryptoStore } from "../../stores/cryptos";
import FromInput from "./FromInput.vue";
import ToInput from "./ToInput.vue";
import Button from "@/components/UI/Button.vue";
const cryptoStore = useCryptoStore();
const overAmount = ref(false);
const checkAmount = (data) => {
  overAmount.value = data.overQuantity;
};
// Runs function from store
const swapCrypto = () => cryptoStore.swapCrypto();
const swapAsset = () => {
  if (!overAmount.value) {
    cryptoStore.swapAssets();
  } else {
    overAmount.active = true;
  }
};
</script>

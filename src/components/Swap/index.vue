<template>
  <div
    class="swap-container w-full md:w-1/2 lg:w-1/4 border bg-gray-800 text-white rounded grid gap-12 p-5"
  >
    <h2>Swap</h2>
    <!-- From Input -->
    <FromInput />
    <!-- Switch from, to. -->
    <div class="flex justify-center items-center">
      <img src="https://img.icons8.com/ios-glyphs/30/000000/change--v1.png" />
    </div>

    <!-- To Input -->
    <ToInput />
    <Button name="Submit" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watchEffect } from "vue";
import { useCryptoStore } from "../../stores/cryptos";
import FromInput from "./FromInput.vue";
import ToInput from "./ToInput.vue";
import Button from "@/components/UI/Button.vue";

const cryptoStore = useCryptoStore();
const userCrypto = computed(() => {
  return cryptoStore.userCryptos;
});
console.log(userCrypto.value);
</script>

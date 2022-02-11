<!-- 
  Displays user's available assets to swap.
 -->

<template>
  <div class="text-black">
    <div
      class="grid grid-cols-3 items-center"
      v-for="userCrypto in userCryptos"
    >
      <!-- <div class="flex items-center"> -->
      <img
        class="w-14"
        :src="userCrypto.icon"
        :alt="`${userCrypto.collection} icon`"
      />
      <span class="flex justify-center capitalize">{{
        userCrypto.collection
      }}</span>
      <!-- </div> -->

      <span class="flex justify-end">{{ userCrypto.total_quantity }}</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

let userCryptos = computed(() => store.getters["cryptos/getUserCrypto"]);
</script>

<style scoped></style>

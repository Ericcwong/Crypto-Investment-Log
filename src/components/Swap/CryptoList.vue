<!-- 
  Displays user's available assets to swap.
 -->

<template>
  <div class="text-black h-full">
    <div class="grid gap-4">
      <div
        class="flex justify-between items-center hover:bg-slate-300 hover:cursor-pointer"
        v-for="(userCrypto, index) in userCryptos"
        :key="index"
        @click="
          chooseCrypto({
            index: index,
            current_price: userCrypto.current_price,
            symbol: userCrypto.symbol,
          })
        "
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
import { computed, onMounted } from "vue";
const emit = defineEmits(["changeCrypto"]);
const store = useStore();

let userCryptos = computed(() => store.getters["cryptos/getUserCrypto"]);
const chooseCrypto = (data) => {
  emit("changeCrypto", data);
};
</script>

<style scoped></style>
